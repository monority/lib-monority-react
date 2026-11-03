import { MARK_PATH } from '@monority/ui'
import * as THREE from 'three'
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

const BASE_ROT_X = 0.13
const BASE_ROT_Y = -0.34
const BASE_ROT_Z = 0
const CRUISE_YAW_SPEED = 0.42

const LOGO_WIDTH = 1.96
const LOGO_DEPTH = 0.24
const BEVEL_THICKNESS = 0.025
const BEVEL_SIZE = 0.013
const BEVEL_SEGMENTS = 5

function mixSrgb(a: SrgbTuple, b: SrgbTuple, t: number): SrgbTuple {
    return {
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
    }
}

function relativeLuminance(c: SrgbTuple): number {
    return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b
}

function setThreeColorFromSrgb(target: THREE.Color, c: SrgbTuple): THREE.Color {
    return target.setRGB(c.r, c.g, c.b, THREE.SRGBColorSpace)
}

/**
 * Construit un studio IBL 360° achromatique à panneaux softbox nets,
 * préfiltré une seule fois via PMREMGenerator (0 octet téléchargé, 0 angle mort en rotation).
 */
function buildStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
    const studio = new THREE.Scene()
    studio.background = new THREE.Color().setRGB(0.18, 0.18, 0.19, THREE.SRGBColorSpace)

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

    // Softbox clé avant-gauche haute (dégradé spéculaire soyeux sur les faces planes)
    addPanel(6.6, 6.2, [-3.2, 4.0, 5.2], 3.8)
    // Remplissage doux avant-droit
    addPanel(5.4, 4.6, [2.8, -0.3, 5.4], 2.05)
    // Strip-lights rasantes droite et gauche (cisèlent les biseaux sur 360°)
    addPanel(2.2, 8.6, [5.0, 1.3, 1.2], 4.5)
    addPanel(2.2, 8.6, [-5.0, 1.0, 1.2], 3.9)
    // Contre-jours arrière pour les angles rasants (±65°..±115° en rotation continue)
    addPanel(3.4, 7.2, [3.6, 2.2, -4.4], 3.2)
    addPanel(3.4, 7.2, [-3.6, 2.0, -4.4], 2.9)
    // Bandeau zénithal et rebond inférieur doux
    addPanel(7.2, 2.8, [0, 5.8, 0.8], 3.3)
    addPanel(9.0, 9.0, [0, -5.2, 1.8], 1.5)

    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envRT = pmrem.fromScene(studio, 0.038)

    for (const item of disposables) {
        item.geo.dispose()
        item.mat.dispose()
    }
    pmrem.dispose()

    return envRT.texture
}

/**
 * Construit le modèle 3D plein usiné du logo Monority (MARK_PATH, généré depuis
 * monority-foundation/logo/svg/monority-mark--on-dark.svg), centré sur son origine 3D,
 * avec 3 groupes matériaux distincts :
 * - 0 : faces avant/arrière planes satinées (normales ±Z pures, zéro strie Earcut)
 * - 1 : biseaux diamantés polis à 5 segments captant les reflets et l'accent du thème
 * - 2 : flancs d'extrusion architecturaux sculptant la profondeur 3D en rotation
 */
function buildSculptedLogoGeometry(): THREE.BufferGeometry {
    const tokens = MARK_PATH.match(/[MLC]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []
    const rawRings: { x: number; y: number }[][] = []
    let current: { x: number; y: number }[] | null = null
    let cmd = ''
    let idx = 0
    const nextNum = (): number => Number(tokens[idx++] ?? 0)
    const flushRing = () => {
        if (current && current.length > 2) {
            rawRings.push(current)
        }
        current = null
    }

    while (idx < tokens.length) {
        const token = tokens[idx]
        if (token && /^[MLC]$/i.test(token)) {
            cmd = token.toUpperCase()
            idx++
        }
        if (cmd === 'M') {
            flushRing()
            current = [{ x: nextNum(), y: nextNum() }]
            cmd = 'L'
        } else if (cmd === 'L') {
            current?.push({ x: nextNum(), y: nextNum() })
        } else if (cmd === 'C') {
            const p0 = current?.[current.length - 1]
            const c1 = { x: nextNum(), y: nextNum() }
            const c2 = { x: nextNum(), y: nextNum() }
            const p1 = { x: nextNum(), y: nextNum() }
            if (p0 && current) {
                const chord =
                    Math.hypot(c1.x - p0.x, c1.y - p0.y) +
                    Math.hypot(c2.x - c1.x, c2.y - c1.y) +
                    Math.hypot(p1.x - c2.x, p1.y - c2.y)
                const steps = Math.min(32, Math.max(4, Math.ceil(chord / 10)))
                for (let s = 1; s <= steps; s++) {
                    const u = s / steps
                    const v = 1 - u
                    current.push({
                        x:
                            v * v * v * p0.x +
                            3 * v * v * u * c1.x +
                            3 * v * u * u * c2.x +
                            u * u * u * p1.x,
                        y:
                            v * v * v * p0.y +
                            3 * v * v * u * c1.y +
                            3 * v * u * u * c2.y +
                            u * u * u * p1.y,
                    })
                }
            }
        } else {
            break
        }
    }
    flushRing()

    let minX = Number.POSITIVE_INFINITY
    let maxX = Number.NEGATIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY
    for (const ring of rawRings) {
        for (const p of ring) {
            if (p.x < minX) minX = p.x
            if (p.x > maxX) maxX = p.x
            if (p.y < minY) minY = p.y
            if (p.y > maxY) maxY = p.y
        }
    }

    const spanX = Math.max(maxX - minX, 1)
    const cx = (minX + maxX) / 2
    const cy = (minY + maxY) / 2
    const scale = LOGO_WIDTH / spanX
    const minVertexGap = 0.005

    const shapes: THREE.Shape[] = []
    for (const ring of rawRings) {
        const pts: THREE.Vector2[] = []
        for (const p of ring) {
            const nx = (p.x - cx) * scale
            const ny = -(p.y - cy) * scale
            const prev = pts[pts.length - 1]
            if (!prev || Math.hypot(nx - prev.x, ny - prev.y) >= minVertexGap) {
                pts.push(new THREE.Vector2(nx, ny))
            }
        }
        const first = pts[0]
        const last = pts[pts.length - 1]
        if (pts.length > 2 && first && last && first.distanceTo(last) < minVertexGap) {
            pts.pop()
        }
        if (pts.length >= 3) {
            shapes.push(new THREE.Shape(pts))
        }
    }

    if (shapes.length === 0) {
        return new THREE.BoxGeometry(1, 1, 0.2)
    }

    const rawExtruded = new THREE.ExtrudeGeometry(shapes, {
        depth: LOGO_DEPTH,
        bevelEnabled: true,
        bevelThickness: BEVEL_THICKNESS,
        bevelSize: BEVEL_SIZE,
        bevelSegments: BEVEL_SEGMENTS,
        steps: 1,
    })

    // Centre parfaitement le volume sur Z = 0 et ajuste légèrement le centre optique vertical
    rawExtruded.translate(0, -0.02, -LOGO_DEPTH / 2)

    // Sépare strictement les faces avant/arrière planes (groupe 0) des biseaux/chants (groupe 1)
    // afin que le maillage Earcut des faces planes reste 100 % optique-plat (normales ±Z pures)
    // sans jamais perturber le lissage spéculaire continu des biseaux et rubans courbes.
    const posAttr = rawExtruded.getAttribute('position')
    const capPositions: number[] = []
    const capNormals: number[] = []
    const rimPositions: number[] = []

    for (const grp of rawExtruded.groups) {
        const end = grp.start + grp.count
        if (grp.materialIndex === 0) {
            for (let v = grp.start; v < end; v++) {
                const x = posAttr.getX(v)
                const y = posAttr.getY(v)
                const z = posAttr.getZ(v)
                capPositions.push(x, y, z)
                capNormals.push(0, 0, z >= 0 ? 1 : -1)
            }
        } else {
            for (let v = grp.start; v < end; v++) {
                rimPositions.push(posAttr.getX(v), posAttr.getY(v), posAttr.getZ(v))
            }
        }
    }
    rawExtruded.dispose()

    const capGeo = new THREE.BufferGeometry()
    capGeo.setAttribute('position', new THREE.Float32BufferAttribute(capPositions, 3))
    capGeo.setAttribute('normal', new THREE.Float32BufferAttribute(capNormals, 3))

    const rawRimGeo = new THREE.BufferGeometry()
    rawRimGeo.setAttribute('position', new THREE.Float32BufferAttribute(rimPositions, 3))
    rawRimGeo.computeVertexNormals()
    const smoothRimGeo = BufferGeometryUtils.toCreasedNormals(
        rawRimGeo,
        THREE.MathUtils.degToRad(38)
    )
    rawRimGeo.dispose()

    // Partitionne les biseaux diamantés (|z| > LOGO_DEPTH / 2) et les flancs purs
    // APRÈS toCreasedNormals afin de conserver des normales de jonction identiques au bit près.
    const rimPos = smoothRimGeo.getAttribute('position')
    const rimNorm = smoothRimGeo.getAttribute('normal')
    const halfDepthLimit = LOGO_DEPTH / 2 + 1e-4
    const capJoinLimit = LOGO_DEPTH / 2 + BEVEL_THICKNESS - 1e-4

    const bevelPositions: number[] = []
    const bevelNormals: number[] = []
    const sidePositions: number[] = []
    const sideNormals: number[] = []

    for (let t = 0; t + 2 < rimPos.count; t += 3) {
        const z0 = rimPos.getZ(t)
        const z1 = rimPos.getZ(t + 1)
        const z2 = rimPos.getZ(t + 2)
        const isBevel =
            Math.abs(z0) > halfDepthLimit ||
            Math.abs(z1) > halfDepthLimit ||
            Math.abs(z2) > halfDepthLimit

        const targetPos = isBevel ? bevelPositions : sidePositions
        const targetNorm = isBevel ? bevelNormals : sideNormals

        for (let k = 0; k < 3; k++) {
            const vi = t + k
            const vx = rimPos.getX(vi)
            const vy = rimPos.getY(vi)
            const vz = rimPos.getZ(vi)
            targetPos.push(vx, vy, vz)
            if (isBevel && Math.abs(vz) >= capJoinLimit) {
                targetNorm.push(0, 0, vz >= 0 ? 1 : -1)
            } else {
                targetNorm.push(rimNorm.getX(vi), rimNorm.getY(vi), rimNorm.getZ(vi))
            }
        }
    }
    smoothRimGeo.dispose()

    const parts: THREE.BufferGeometry[] = [capGeo]

    if (bevelPositions.length > 0) {
        const bevelGeo = new THREE.BufferGeometry()
        bevelGeo.setAttribute('position', new THREE.Float32BufferAttribute(bevelPositions, 3))
        bevelGeo.setAttribute('normal', new THREE.Float32BufferAttribute(bevelNormals, 3))
        parts.push(bevelGeo)
    }

    if (sidePositions.length > 0) {
        const sideGeo = new THREE.BufferGeometry()
        sideGeo.setAttribute('position', new THREE.Float32BufferAttribute(sidePositions, 3))
        sideGeo.setAttribute('normal', new THREE.Float32BufferAttribute(sideNormals, 3))
        parts.push(sideGeo)
    }

    const merged = BufferGeometryUtils.mergeGeometries(parts, true)
    for (const part of parts) {
        part.dispose()
    }

    return merged ?? new THREE.BoxGeometry(1, 1, 0.2)
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
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.42)')
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.14)')
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
    renderer.toneMappingExposure = 1.1
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
    scene.environmentIntensity = 0.96

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 40)
    camera.position.set(0, -0.02, 5.15)
    camera.lookAt(0, -0.02, 0)

    // Éclairage studio 360° ciselant les biseaux et créant un dégradé soyeux à tout angle de rotation
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.55)
    keyLight.position.set(-2.8, 4.4, 4.8)
    scene.add(keyLight)

    const studioSheenLight = new THREE.PointLight(0xffffff, 13.5, 11, 1.35)
    studioSheenLight.position.set(-2.0, 2.3, 3.4)
    scene.add(studioSheenLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.05)
    fillLight.position.set(3.4, -0.8, 4.4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.2)
    rimLight.position.set(4.0, 2.4, -3.2)
    scene.add(rimLight)

    const backKickLight = new THREE.DirectionalLight(0xffffff, 1.45)
    backKickLight.position.set(-3.8, 1.8, -3.2)
    scene.add(backKickLight)

    // Groupe racine du Logo 3D
    const logoGroup = new THREE.Group()
    logoGroup.rotation.set(BASE_ROT_X, BASE_ROT_Y, BASE_ROT_Z)
    scene.add(logoGroup)

    const logoGeo = buildSculptedLogoGeometry()

    // Matériau 0 : faces avant et arrière satinées (platine anodisé en sombre, céramique en clair)
    const faceMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.22,
        metalness: 0.34,
        clearcoat: 0.54,
        clearcoatRoughness: 0.15,
    })

    // Matériau 1 : biseaux diamantés polis captant les reflets spéculaires et l'accent du thème
    const bevelMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.11,
        metalness: 0.84,
        clearcoat: 0.78,
        clearcoatRoughness: 0.08,
    })

    // Matériau 2 : flancs d'extrusion architecturaux sculptant la profondeur 3D
    const sideMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.22,
        metalness: 0.54,
        clearcoat: 0.54,
        clearcoatRoughness: 0.14,
    })

    const logoMesh = new THREE.Mesh(logoGeo, [faceMat, bevelMat, sideMat])
    logoGroup.add(logoMesh)

    // Ombre de contact douce ancrant le logo en lévitation et suivant sa largeur projetée
    const shadowTex = buildContactShadowTexture()
    const shadowGeo = new THREE.PlaneGeometry(2.15, 0.68)
    const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
    })
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -1.14
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
    let turntableYaw = 0
    let spinDir = 1
    let dragVelX = 0
    let dragVelY = 0
    let idleSinceDrag = 10

    let currentRotX = BASE_ROT_X
    let currentRotY = BASE_ROT_Y
    let currentPosY = 0

    const tmpColor = new THREE.Color()

    const applyTokens = (next: MonolithThemeTokens) => {
        tokens = next

        const accentChroma =
            Math.max(next.accentSolid.r, next.accentSolid.g, next.accentSolid.b) -
            Math.min(next.accentSolid.r, next.accentSolid.g, next.accentSolid.b)

        if (next.isHighContrast) {
            // Haut contraste WCAG AAA sur blanc pur : aluminium obsidienne anodisé et biseaux argent vif
            setThreeColorFromSrgb(faceMat.color, { r: 0.16, g: 0.165, b: 0.18 })
            faceMat.metalness = 0.44
            faceMat.roughness = 0.25
            faceMat.clearcoat = 0.48
            faceMat.emissiveIntensity = 0

            setThreeColorFromSrgb(bevelMat.color, { r: 0.9, g: 0.91, b: 0.94 })
            bevelMat.metalness = 0.72
            bevelMat.roughness = 0.12
            bevelMat.clearcoat = 0.72
            bevelMat.emissiveIntensity = 0

            setThreeColorFromSrgb(sideMat.color, { r: 0.08, g: 0.085, b: 0.095 })
            sideMat.metalness = 0.52
            sideMat.roughness = 0.24
            sideMat.clearcoat = 0.45
            sideMat.emissiveIntensity = 0

            scene.environmentIntensity = 0.96
            keyLight.intensity = 1.65
            studioSheenLight.intensity = 12
            fillLight.intensity = 1.0
            rimLight.intensity = 1.9
            backKickLight.intensity = 1.3
            rimLight.color.setHex(0xffffff)
            backKickLight.color.setHex(0xffffff)

            shadowMat.opacity = 0
            shadowPlane.visible = false
        } else if (next.isLight) {
            // Mode clair : céramique argentée satinée lumineuse, biseau poli et flancs ardoise doux
            const ceramicSrgb = mixSrgb(next.bgSurface, { r: 0.73, g: 0.745, b: 0.775 }, 0.66)
            setThreeColorFromSrgb(faceMat.color, ceramicSrgb)
            faceMat.metalness = 0.22
            faceMat.roughness = 0.25
            faceMat.clearcoat = 0.44
            faceMat.emissiveIntensity = 0

            const lightBevel =
                accentChroma > 0.08
                    ? mixSrgb({ r: 0.9, g: 0.91, b: 0.94 }, next.accentSolid, 0.36)
                    : { r: 0.92, g: 0.93, b: 0.95 }
            setThreeColorFromSrgb(bevelMat.color, lightBevel)
            bevelMat.metalness = 0.52
            bevelMat.roughness = 0.13
            bevelMat.clearcoat = 0.68
            setThreeColorFromSrgb(bevelMat.emissive, next.accentSolid)
            bevelMat.emissiveIntensity = accentChroma > 0.08 ? 0.06 : 0

            const baseFlank = mixSrgb({ r: 0.46, g: 0.48, b: 0.52 }, next.borderDefault, 0.42)
            const lightFlank =
                accentChroma > 0.08 ? mixSrgb(baseFlank, next.accentSolid, 0.3) : baseFlank
            setThreeColorFromSrgb(sideMat.color, lightFlank)
            sideMat.metalness = 0.38
            sideMat.roughness = 0.2
            sideMat.clearcoat = 0.52
            sideMat.emissiveIntensity = 0

            scene.environmentIntensity = 0.95
            keyLight.intensity = 1.45
            studioSheenLight.intensity = 11.5
            fillLight.intensity = 0.95
            rimLight.intensity = 1.65
            backKickLight.intensity = 1.2
            setThreeColorFromSrgb(
                rimLight.color,
                mixSrgb({ r: 1, g: 1, b: 1 }, next.accentSolid, 0.2)
            )
            backKickLight.color.copy(rimLight.color)

            shadowMat.opacity = 0.18
            shadowPlane.visible = true
        } else {
            // Thèmes sombres (dark, oled, slate, ocean, night) :
            // Même hiérarchie optique lumineuse qu'en clair : face platine/argent satiné harmonisée
            // au thème, biseau diamanté spéculaire vif, et flancs anodisés profonds sculptant le volume.
            const isOled = relativeLuminance(next.bgCanvas) < 0.008
            const basePlatinum = mixSrgb(next.bgRaised, next.textPrimary, isOled ? 0.68 : 0.62)
            const tintedPlatinum =
                accentChroma > 0.08 ? mixSrgb(basePlatinum, next.accentSolid, 0.22) : basePlatinum

            setThreeColorFromSrgb(faceMat.color, tintedPlatinum)
            faceMat.metalness = 0.34
            faceMat.roughness = 0.22
            faceMat.clearcoat = 0.56
            setThreeColorFromSrgb(faceMat.emissive, next.accentSolid)
            faceMat.emissiveIntensity = accentChroma > 0.08 ? 0.025 : 0.01

            const chromeBase: SrgbTuple = { r: 0.95, g: 0.96, b: 0.99 }
            const bevelColor =
                accentChroma > 0.08 ? mixSrgb(chromeBase, next.accentSolid, 0.54) : chromeBase
            setThreeColorFromSrgb(bevelMat.color, bevelColor)
            bevelMat.metalness = 0.82
            bevelMat.roughness = 0.14
            bevelMat.clearcoat = 0.78
            setThreeColorFromSrgb(bevelMat.emissive, next.accentSolid)
            bevelMat.emissiveIntensity = accentChroma > 0.08 ? 0.22 : 0.05

            const neutralFlank = mixSrgb(
                next.bgRaised,
                isOled ? { r: 0.24, g: 0.25, b: 0.28 } : { r: 0.28, g: 0.295, b: 0.33 },
                0.56
            )
            const flankColor =
                accentChroma > 0.08 ? mixSrgb(neutralFlank, next.accentSolid, 0.32) : neutralFlank
            setThreeColorFromSrgb(sideMat.color, flankColor)
            sideMat.metalness = 0.56
            sideMat.roughness = 0.22
            sideMat.clearcoat = 0.56
            setThreeColorFromSrgb(sideMat.emissive, next.accentSolid)
            sideMat.emissiveIntensity = accentChroma > 0.08 ? 0.05 : 0

            scene.environmentIntensity = isOled ? 1.04 : 1.0
            keyLight.intensity = 1.38
            studioSheenLight.intensity = 11.5
            fillLight.intensity = 1.0
            rimLight.intensity = 2.35
            backKickLight.intensity = 1.55
            setThreeColorFromSrgb(tmpColor, mixSrgb({ r: 1, g: 1, b: 1 }, next.accentSolid, 0.38))
            rimLight.color.copy(tmpColor)
            backKickLight.color.copy(tmpColor)

            shadowMat.opacity = isOled ? 0.22 : 0.3
            shadowPlane.visible = true
        }

        needsSingleRender = true
    }

    applyTokens(initialTokens)

    // Gestionnaires Pointer Events pour rotation libre au glisser avec inertie continue
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

        const rotStepY = dx * 0.008
        const rotStepX = dy * 0.0055

        turntableYaw += rotStepY
        dragOffsetX = Math.max(-0.7, Math.min(0.7, dragOffsetX + rotStepX))
        dragVelY = rotStepY
        dragVelX = rotStepX
        if (Math.abs(rotStepY) > 0.001) {
            spinDir = rotStepY >= 0 ? 1 : -1
        }
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
            const inertiaDecay = Math.exp(-6.5 * dt)
            dragVelX *= inertiaDecay
            dragVelY *= inertiaDecay
            dragOffsetX = Math.max(-0.7, Math.min(0.7, dragOffsetX + dragVelX))
            turntableYaw += dragVelY

            if (!motionReduced) {
                // Rotation 3D continue fluide autour de Y + retour doux de l'inclinaison X
                turntableYaw += spinDir * CRUISE_YAW_SPEED * dt
                if (idleSinceDrag > 0.8) {
                    const returnFactor = 1 - Math.exp(-2.4 * dt)
                    dragOffsetX += (0 - dragOffsetX) * returnFactor
                }
            }
        }

        const idlePitch = motionReduced ? 0 : Math.sin(elapsed * 0.72) * 0.042
        const idleRoll = motionReduced ? 0 : Math.cos(elapsed * 0.54) * 0.022
        const idleLift = motionReduced ? 0 : Math.sin(elapsed * 0.88) * 0.035

        const parallaxX = motionReduced ? 0 : pointerNy * 0.14
        const parallaxY = motionReduced ? 0 : pointerNx * 0.2

        const targetRotX = BASE_ROT_X + idlePitch + parallaxX + dragOffsetX
        const targetRotY = BASE_ROT_Y + turntableYaw + parallaxY

        const smooth =
            isDragging || motionReduced ? 1 - Math.exp(-18 * dt) : 1 - Math.exp(-8.5 * dt)
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

        logoGroup.rotation.set(currentRotX, currentRotY, BASE_ROT_Z + idleRoll)
        logoGroup.position.y = currentPosY

        const liftScale = 1 - currentPosY * 0.65
        const projectedWidth = 0.34 + 0.66 * Math.abs(Math.cos(currentRotY))
        shadowPlane.scale.set(liftScale * projectedWidth, liftScale, 1)

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

        logoGeo.dispose()
        shadowGeo.dispose()

        faceMat.dispose()
        bevelMat.dispose()
        sideMat.dispose()
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
