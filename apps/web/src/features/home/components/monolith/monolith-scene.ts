import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import type { MonolithThemeTokens, SrgbTuple } from './monolith-tokens'

export interface MonolithSceneCallbacks {
    onReady?: () => void
    onDragChange?: (dragging: boolean) => void
}

export interface MonolithSceneController {
    setTokens: (tokens: MonolithThemeTokens) => void
    setPointerNormalized: (nx: number, ny: number) => void
    clearPointer: () => void
    setViewportVisible: (visible: boolean) => void
    resize: () => void
    getRenderedFrameCount: () => number
    dispose: () => void
}

const BASE_ROT_X = 0.21
const BASE_ROT_Y = -0.46
const BASE_ROT_Z = 0.11

const BODY_WIDTH = 1.58
const BODY_HEIGHT = 2.12
const BODY_DEPTH = 0.44
const SEAM_GAP = 0.034
const BEVEL_RADIUS = 0.066
const BEVEL_SEGMENTS = 6

function mixSrgb(a: SrgbTuple, b: SrgbTuple, t: number): SrgbTuple {
    return {
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
    }
}

function setThreeColorFromSrgb(target: THREE.Color, c: SrgbTuple): THREE.Color {
    return target.setRGB(c.r, c.g, c.b, THREE.SRGBColorSpace)
}

/**
 * Construit un studio IBL 100 % achromatique à panneaux softbox nets,
 * préfiltré une seule fois via PMREMGenerator (0 octet téléchargé, 0 dominante jaune/bleue).
 */
function buildStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
    const studio = new THREE.Scene()
    studio.background = new THREE.Color().setRGB(0.14, 0.14, 0.14, THREE.SRGBColorSpace)

    const disposables: { geo: THREE.BufferGeometry; mat: THREE.Material }[] = []

    const addPanel = (w: number, h: number, pos: [number, number, number], intensity: number) => {
        const geo = new THREE.PlaneGeometry(w, h)
        const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(intensity, intensity, intensity),
            side: THREE.DoubleSide,
            toneMapped: false,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(pos[0], pos[1], pos[2])
        mesh.lookAt(0, 0, 0)
        studio.add(mesh)
        disposables.push({ geo, mat })
    }

    // Softbox clé avant-gauche haute (crée un dégradé diagonal soyeux sur la face principale)
    addPanel(6.2, 6.0, [-3.2, 4.2, 5.2], 3.8)
    // Strip-light rasante droite (cisèle le chant droit et les chanfreins)
    addPanel(1.8, 8.2, [4.5, 1.6, -1.6], 4.6)
    // Bandeau zénithal (souligne le biseau supérieur et le relief)
    addPanel(6.8, 2.4, [0, 5.6, 1.4], 3.2)
    // Rebond inférieur doux (empêche tout écrasement noir sous le volume)
    addPanel(8.5, 8.5, [0, -5.0, 2.6], 1.15)
    // Remplissage doux face caméra
    addPanel(5.2, 4.2, [1.8, -0.4, 5.8], 1.65)

    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envRT = pmrem.fromScene(studio, 0.026)

    for (const item of disposables) {
        item.geo.dispose()
        item.mat.dispose()
    }
    pmrem.dispose()

    return envRT.texture
}

/**
 * Construit le bas-relief usiné à 3 plans (emblème Monority) en un seul BufferGeometry fusionné.
 */
function buildBrandReliefGeometry(): THREE.BufferGeometry {
    const extrudeOpts: THREE.ExtrudeGeometryOptions = {
        depth: 0.012,
        bevelEnabled: true,
        bevelThickness: 0.0035,
        bevelSize: 0.0035,
        bevelSegments: 2,
        steps: 1,
    }

    // Plan supérieur : losange évidé
    const diamond = new THREE.Shape()
    diamond.moveTo(0, 0.21)
    diamond.lineTo(-0.27, 0.075)
    diamond.lineTo(0, -0.06)
    diamond.lineTo(0.27, 0.075)
    diamond.closePath()

    const hole = new THREE.Path()
    hole.moveTo(0, 0.155)
    hole.lineTo(0.16, 0.075)
    hole.lineTo(0, -0.005)
    hole.lineTo(-0.16, 0.075)
    hole.closePath()
    diamond.holes.push(hole)

    const makeChevronShape = (yOffset: number): THREE.Shape => {
        const s = new THREE.Shape()
        s.moveTo(-0.27, 0.005 + yOffset)
        s.lineTo(0, -0.13 + yOffset)
        s.lineTo(0.27, 0.005 + yOffset)
        s.lineTo(0.232, 0.044 + yOffset)
        s.lineTo(0, -0.072 + yOffset)
        s.lineTo(-0.232, 0.044 + yOffset)
        s.closePath()
        return s
    }

    const g1 = new THREE.ExtrudeGeometry(diamond, extrudeOpts)
    const g2 = new THREE.ExtrudeGeometry(makeChevronShape(-0.03), extrudeOpts)
    const g3 = new THREE.ExtrudeGeometry(makeChevronShape(-0.135), extrudeOpts)

    const merged = BufferGeometryUtils.mergeGeometries([g1, g2, g3], false)
    g1.dispose()
    g2.dispose()
    g3.dispose()

    merged.computeVertexNormals()
    return merged
}

function buildContactShadowTexture(): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const grad = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.46)')
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.16)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
}

export function createMonolithScene(
    container: HTMLElement,
    initialTokens: MonolithThemeTokens,
    callbacks: MonolithSceneCallbacks = {}
): MonolithSceneController | null {
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
        return null
    }

    let renderer: THREE.WebGLRenderer
    try {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        })
    } catch {
        return null
    }

    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.08
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const width = Math.max(container.clientWidth, 1)
    const height = Math.max(container.clientHeight, 1)
    renderer.setSize(width, height, false)

    const canvas = renderer.domElement
    canvas.className = 'mr-monolith__canvas'
    canvas.setAttribute('aria-hidden', 'true')
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const envTexture = buildStudioEnvironment(renderer)
    scene.environment = envTexture
    scene.environmentIntensity = 0.9

    const camera = new THREE.PerspectiveCamera(31, width / height, 0.1, 40)
    camera.position.set(0, 0.04, 5.55)
    camera.lookAt(0, 0, 0)

    // Éclairage analytique 3 points ciselant les arêtes et le bas-relief
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.35)
    keyLight.position.set(-2.6, 4.4, 4.8)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.95)
    fillLight.position.set(2.8, -1.4, 4.4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.95)
    rimLight.position.set(3.8, 2.6, -3.4)
    scene.add(rimLight)

    // Groupe racine du Monolithe
    const monolithGroup = new THREE.Group()
    monolithGroup.rotation.set(BASE_ROT_X, BASE_ROT_Y, BASE_ROT_Z)
    scene.add(monolithGroup)

    const halfHeight = (BODY_HEIGHT - SEAM_GAP) / 2
    const shellGeo = new RoundedBoxGeometry(
        BODY_WIDTH,
        halfHeight,
        BODY_DEPTH,
        BEVEL_SEGMENTS,
        BEVEL_RADIUS
    )
    // Rail équatorial en retrait franc derrière le rayon de chanfrein pour un joint usiné net
    const coreInset = BEVEL_RADIUS * 1.75
    const coreRailGeo = new RoundedBoxGeometry(
        BODY_WIDTH - coreInset,
        SEAM_GAP * 0.46,
        BODY_DEPTH - coreInset,
        4,
        0.007
    )
    const collarInset = BEVEL_RADIUS * 2.2
    const collarGeo = new THREE.BoxGeometry(
        BODY_WIDTH - collarInset,
        SEAM_GAP * 1.5,
        BODY_DEPTH - collarInset
    )
    const reliefGeo = buildBrandReliefGeometry()

    const bodyMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.27,
        metalness: 0.58,
        clearcoat: 0.4,
        clearcoatRoughness: 0.18,
    })

    const reliefMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.18,
        metalness: 0.68,
        clearcoat: 0.5,
        clearcoatRoughness: 0.14,
    })

    const collarMat = new THREE.MeshStandardMaterial({
        roughness: 0.5,
        metalness: 0.3,
    })

    const coreRailMat = new THREE.MeshStandardMaterial({
        roughness: 0.22,
        metalness: 0.18,
        emissiveIntensity: 0.55,
    })

    const upperShell = new THREE.Mesh(shellGeo, bodyMat)
    upperShell.position.y = halfHeight / 2 + SEAM_GAP / 2

    const lowerShell = new THREE.Mesh(shellGeo, bodyMat)
    lowerShell.position.y = -(halfHeight / 2 + SEAM_GAP / 2)

    const collarMesh = new THREE.Mesh(collarGeo, collarMat)
    const coreRailMesh = new THREE.Mesh(coreRailGeo, coreRailMat)

    const frontRelief = new THREE.Mesh(reliefGeo, reliefMat)
    frontRelief.position.set(0, halfHeight * 0.48, BODY_DEPTH / 2 - 0.003)

    const backRelief = new THREE.Mesh(reliefGeo, reliefMat)
    backRelief.rotation.y = Math.PI
    backRelief.position.set(0, halfHeight * 0.48, -(BODY_DEPTH / 2 - 0.003))

    monolithGroup.add(upperShell, lowerShell, collarMesh, coreRailMesh, frontRelief, backRelief)

    // Ombre de contact douce ancrant le volume
    const shadowTex = buildContactShadowTexture()
    const shadowGeo = new THREE.PlaneGeometry(2.35, 0.92)
    const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
    })
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -1.38
    scene.add(shadowPlane)

    // État d'animation et d'interaction sans allocation par frame
    let tokens = initialTokens
    let disposed = false
    let readyFired = false
    let viewportVisible = true
    let renderedFrames = 0
    let needsSingleRender = true

    let pointerNx = 0
    let pointerNy = 0

    let isDragging = false
    let activePointerId: number | null = null
    let lastClientX = 0
    let lastClientY = 0
    let dragOffsetX = 0
    let dragOffsetY = 0
    let dragVelX = 0
    let dragVelY = 0
    let idleSinceDrag = 10

    let currentRotX = BASE_ROT_X
    let currentRotY = BASE_ROT_Y
    let currentPosY = 0

    const tmpColor = new THREE.Color()

    const applyTokens = (next: MonolithThemeTokens) => {
        tokens = next

        if (next.isLight) {
            // Céramique architecturale satinée claire
            const ceramicSrgb = mixSrgb(next.bgSurface, { r: 0.8, g: 0.82, b: 0.85 }, 0.62)
            setThreeColorFromSrgb(bodyMat.color, ceramicSrgb)
            bodyMat.metalness = 0.2
            bodyMat.roughness = 0.24
            bodyMat.clearcoat = 0.44

            const reliefSrgb = mixSrgb(ceramicSrgb, next.borderDefault, 0.45)
            setThreeColorFromSrgb(reliefMat.color, reliefSrgb)
            reliefMat.metalness = 0.28
            reliefMat.roughness = 0.18

            setThreeColorFromSrgb(
                collarMat.color,
                mixSrgb(next.borderDefault, next.textPrimary, 0.35)
            )

            setThreeColorFromSrgb(coreRailMat.color, next.accentSolid)
            setThreeColorFromSrgb(coreRailMat.emissive, next.accentSolid)
            coreRailMat.emissiveIntensity = next.isHighContrast ? 0.1 : 0.24

            scene.environmentIntensity = 0.96
            keyLight.intensity = 2.15
            fillLight.intensity = 0.95
            rimLight.intensity = 1.65
            setThreeColorFromSrgb(
                rimLight.color,
                mixSrgb({ r: 1, g: 1, b: 1 }, next.accentSolid, 0.18)
            )

            shadowMat.opacity = next.isHighContrast ? 0 : 0.18
            shadowPlane.visible = !next.isHighContrast
        } else {
            // Graphite anodisé neutre : plancher sRGB calibré [0.38..0.46]
            // pour des reflets métalliques nets et zéro écrasement noir (y compris en OLED).
            const gunmetalBase = mixSrgb(next.bgRaised, { r: 0.43, g: 0.43, b: 0.44 }, 0.68)
            setThreeColorFromSrgb(bodyMat.color, gunmetalBase)
            bodyMat.metalness = 0.54
            bodyMat.roughness = 0.25
            bodyMat.clearcoat = 0.45

            const reliefSrgb = mixSrgb(gunmetalBase, { r: 0.68, g: 0.68, b: 0.7 }, 0.46)
            setThreeColorFromSrgb(reliefMat.color, reliefSrgb)
            reliefMat.metalness = 0.64
            reliefMat.roughness = 0.16

            setThreeColorFromSrgb(collarMat.color, mixSrgb(next.bgCanvas, gunmetalBase, 0.28))

            setThreeColorFromSrgb(coreRailMat.color, next.accentSolid)
            setThreeColorFromSrgb(coreRailMat.emissive, next.accentSolid)
            coreRailMat.emissiveIntensity = 0.68

            scene.environmentIntensity = 0.98
            keyLight.intensity = 2.4
            fillLight.intensity = 0.95
            rimLight.intensity = 2.15
            setThreeColorFromSrgb(tmpColor, mixSrgb({ r: 1, g: 1, b: 1 }, next.accentSolid, 0.32))
            rimLight.color.copy(tmpColor)

            shadowMat.opacity = 0.3
            shadowPlane.visible = true
        }

        needsSingleRender = true
    }

    applyTokens(initialTokens)

    // Gestionnaires Pointer Events pour rotation libre au glisser
    const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return
        isDragging = true
        activePointerId = e.pointerId
        lastClientX = e.clientX
        lastClientY = e.clientY
        dragVelX = 0
        dragVelY = 0
        idleSinceDrag = 0
        try {
            canvas.setPointerCapture(e.pointerId)
        } catch {
            /* noop */
        }
        callbacks.onDragChange?.(true)
    }

    const onPointerMove = (e: PointerEvent) => {
        if (!isDragging || e.pointerId !== activePointerId) return
        const dx = e.clientX - lastClientX
        const dy = e.clientY - lastClientY
        lastClientX = e.clientX
        lastClientY = e.clientY

        const rotStepY = dx * 0.0075
        const rotStepX = dy * 0.0055

        dragOffsetY += rotStepY
        dragOffsetX = Math.max(-0.75, Math.min(0.75, dragOffsetX + rotStepX))
        dragVelY = rotStepY
        dragVelX = rotStepX
        idleSinceDrag = 0
        needsSingleRender = true
    }

    const endDrag = (e: PointerEvent) => {
        if (!isDragging || (activePointerId !== null && e.pointerId !== activePointerId)) return
        isDragging = false
        if (activePointerId !== null) {
            try {
                canvas.releasePointerCapture(activePointerId)
            } catch {
                /* noop */
            }
        }
        activePointerId = null
        idleSinceDrag = 0
        callbacks.onDragChange?.(false)
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', endDrag)
    canvas.addEventListener('pointercancel', endDrag)

    const timer = new THREE.Timer()
    if (typeof document !== 'undefined') {
        timer.connect(document)
    }

    const renderFrame = () => {
        if (disposed || !viewportVisible) return

        timer.update()
        const rawDt = timer.getDelta()
        const dt = Math.min(Math.max(rawDt, 0.001), 0.05)
        const elapsed = timer.getElapsed()

        const motionReduced = tokens.reducedMotion

        if (!isDragging) {
            idleSinceDrag += dt
            const inertiaDecay = Math.exp(-7.5 * dt)
            dragVelX *= inertiaDecay
            dragVelY *= inertiaDecay
            dragOffsetX = Math.max(-0.75, Math.min(0.75, dragOffsetX + dragVelX))
            dragOffsetY += dragVelY

            // Retour calme sur-amorti vers la pose signature après 1.2s de repos
            if (idleSinceDrag > 1.2 && !motionReduced) {
                const returnFactor = 1 - Math.exp(-2.2 * dt)
                dragOffsetX += (0 - dragOffsetX) * returnFactor
                // Normalise dragOffsetY dans [-PI, PI] avant le retour pour éviter les tours superflus
                dragOffsetY = Math.atan2(Math.sin(dragOffsetY), Math.cos(dragOffsetY))
                dragOffsetY += (0 - dragOffsetY) * returnFactor
            }
        }

        const idlePitch = motionReduced ? 0 : Math.sin(elapsed * 0.85) * 0.024
        const idleYaw = motionReduced ? 0 : Math.cos(elapsed * 0.62) * 0.036
        const idleLift = motionReduced ? 0 : Math.sin(elapsed * 0.92) * 0.042

        const parallaxX = motionReduced ? 0 : pointerNy * 0.13
        const parallaxY = motionReduced ? 0 : pointerNx * 0.16

        const targetRotX = BASE_ROT_X + idlePitch + parallaxX + dragOffsetX
        const targetRotY = BASE_ROT_Y + idleYaw + parallaxY + dragOffsetY

        const smooth =
            isDragging || motionReduced ? 1 - Math.exp(-18 * dt) : 1 - Math.exp(-6.5 * dt)
        currentRotX += (targetRotX - currentRotX) * smooth
        currentRotY += (targetRotY - currentRotY) * smooth
        currentPosY += (idleLift - currentPosY) * smooth

        const stillSettling =
            Math.abs(targetRotX - currentRotX) > 0.0004 ||
            Math.abs(targetRotY - currentRotY) > 0.0004 ||
            Math.abs(dragVelX) > 0.0002 ||
            Math.abs(dragVelY) > 0.0002

        if (motionReduced && !isDragging && !stillSettling && !needsSingleRender) {
            return
        }

        monolithGroup.rotation.set(currentRotX, currentRotY, BASE_ROT_Z)
        monolithGroup.position.y = currentPosY

        const shadowScale = 1 - currentPosY * 0.65
        shadowPlane.scale.set(shadowScale, shadowScale, 1)

        renderer.render(scene, camera)
        renderedFrames += 1
        needsSingleRender = false

        if (!readyFired) {
            readyFired = true
            callbacks.onReady?.()
        }
    }

    const startLoop = async () => {
        try {
            await renderer.compileAsync(scene, camera)
        } catch {
            /* Repli synchrone si compileAsync n'est pas supporté par le pilote */
        }
        if (disposed) return
        renderer.setAnimationLoop(renderFrame)
    }

    void startLoop()

    const resize = () => {
        if (disposed) return
        const nextW = Math.max(container.clientWidth, 1)
        const nextH = Math.max(container.clientHeight, 1)
        camera.aspect = nextW / nextH
        camera.updateProjectionMatrix()
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(nextW, nextH, false)
        needsSingleRender = true
        if (tokens.reducedMotion && readyFired) {
            renderer.render(scene, camera)
            renderedFrames += 1
            needsSingleRender = false
        }
    }

    const dispose = () => {
        if (disposed) return
        disposed = true
        renderer.setAnimationLoop(null)
        timer.dispose()

        canvas.removeEventListener('pointerdown', onPointerDown)
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('pointerup', endDrag)
        canvas.removeEventListener('pointercancel', endDrag)

        shellGeo.dispose()
        coreRailGeo.dispose()
        collarGeo.dispose()
        reliefGeo.dispose()
        shadowGeo.dispose()

        bodyMat.dispose()
        reliefMat.dispose()
        collarMat.dispose()
        coreRailMat.dispose()
        shadowMat.dispose()

        shadowTex?.dispose()
        envTexture.dispose()

        renderer.dispose()
        canvas.remove()
    }

    return {
        setTokens: (next) => {
            applyTokens(next)
            if (next.reducedMotion && readyFired && viewportVisible) {
                renderer.render(scene, camera)
                renderedFrames += 1
                needsSingleRender = false
            }
        },
        setPointerNormalized: (nx, ny) => {
            pointerNx = Math.max(-1, Math.min(1, nx))
            pointerNy = Math.max(-1, Math.min(1, ny))
        },
        clearPointer: () => {
            pointerNx = 0
            pointerNy = 0
        },
        setViewportVisible: (visible) => {
            viewportVisible = visible
            if (visible) {
                needsSingleRender = true
            }
        },
        resize,
        getRenderedFrameCount: () => renderedFrames,
        dispose,
    }
}
