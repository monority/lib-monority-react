import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useMessages } from '@/shared/i18n'

interface LayerSpec {
    id: string
    label: string
    role: string
    index: number // 0 (bottom) to 5 (top)
}

const LAYERS_SPEC: LayerSpec[] = [
    { id: 'utilities', label: 'mr.utilities', role: 'Overrides', index: 5 },
    { id: 'components', label: 'mr.components', role: '83 Primitives', index: 4 },
    { id: 'themes', label: 'mr.themes', role: 'Runtime OKLCH', index: 3 },
    { id: 'tokens', label: 'mr.tokens', role: 'Design Tokens', index: 2 },
    { id: 'base', label: 'mr.base', role: 'Typography & Layout', index: 1 },
    { id: 'reset', label: 'mr.reset', role: 'CSS Clean Slate', index: 0 },
]

// Mappage instantané des teintes d'accentuation standard de Monority
const ACCENT_HEX_MAP: Record<string, number> = {
    '290': 0x8b5cf6, // Violet / Iris
    '215': 0x06b6d4, // Cyan
    '70': 0xf59e0b, // Amber
    '155': 0x10b981, // Emerald
}

const SIGNATURE_VIOLET = 0x8b5cf6
const ELECTRIC_CYAN = 0x06b6d4

let helperCanvas: HTMLCanvasElement | null = null
let helperCtx: CanvasRenderingContext2D | null = null

function resolveCssColor(cssColor: string, defaultHex = SIGNATURE_VIOLET): number {
    if (!cssColor) return defaultHex
    const trimmed = cssColor.trim()

    // 1. Détection hexadécimale directe
    if (trimmed.startsWith('#')) {
        const parsed = Number.parseInt(trimmed.slice(1), 16)
        if (!Number.isNaN(parsed)) return parsed
    }

    // 2. Détection rapide des teintes OKLCH standard de Monority
    for (const [hue, hex] of Object.entries(ACCENT_HEX_MAP)) {
        if (trimmed.includes(hue)) return hex
    }

    // 3. Résolution Canvas 2D
    if (typeof document !== 'undefined') {
        try {
            if (!helperCanvas) {
                helperCanvas = document.createElement('canvas')
                helperCanvas.width = 1
                helperCanvas.height = 1
                helperCtx = helperCanvas.getContext('2d', { willReadFrequently: true })
            }
            if (helperCtx) {
                helperCtx.clearRect(0, 0, 1, 1)
                helperCtx.fillStyle = '#000000'
                helperCtx.fillStyle = trimmed
                helperCtx.fillRect(0, 0, 1, 1)
                const data = helperCtx.getImageData(0, 0, 1, 1).data
                const r = data[0] ?? 0
                const g = data[1] ?? 0
                const b = data[2] ?? 0
                const a = data[3] ?? 0

                const isNearNeutral = Math.abs(r - g) < 15 && Math.abs(g - b) < 15
                if (a !== 0 && !isNearNeutral && (r > 30 || g > 30 || b > 30)) {
                    return (r << 16) | (g << 8) | b
                }
            }
        } catch {
            /* noop */
        }
    }

    return defaultHex
}

function isWebGLSupported(): boolean {
    if (typeof window === 'undefined') return false
    try {
        const canvas = document.createElement('canvas')
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl2') ||
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl'))
        )
    } catch {
        return false
    }
}

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
    const shape = new THREE.Shape()
    const x = -width / 2
    const y = -height / 2
    shape.moveTo(x + radius, y)
    shape.lineTo(x + width - radius, y)
    shape.quadraticCurveTo(x + width, y, x + width, y + radius)
    shape.lineTo(x + width, y + height - radius)
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    shape.lineTo(x + radius, y + height)
    shape.quadraticCurveTo(x, y + height, x, y + height - radius)
    shape.lineTo(x, y + radius)
    shape.quadraticCurveTo(x, y, x + radius, y)
    return shape
}

export function Home3DMatrix() {
    const messages = useMessages()
    const containerRef = useRef<HTMLElement | null>(null)
    const mountRef = useRef<HTMLDivElement | null>(null)

    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [activeLayerId, setActiveLayerId] = useState<string | null>(null)
    const [webglAvailable, setWebglAvailable] = useState<boolean>(true)

    // Synchronisation du calque actif pour la boucle d'animation
    const activeLayerIdRef = useRef<string | null>(null)
    activeLayerIdRef.current = activeLayerId

    const isHoveredRef = useRef(false)
    isHoveredRef.current = isHovered

    useEffect(() => {
        const container = containerRef.current
        const mount = mountRef.current
        if (!container || !mount) return

        if (!isWebGLSupported()) {
            setWebglAvailable(false)
            return
        }

        let animationFrameId: number
        let isVisible = true
        let intersectionObs: IntersectionObserver | null = null
        let resizeObs: ResizeObserver | null = null

        if (typeof IntersectionObserver !== 'undefined') {
            intersectionObs = new IntersectionObserver(
                ([entry]) => {
                    isVisible = entry?.isIntersecting ?? true
                },
                { threshold: 0.05 }
            )
            intersectionObs.observe(container)
        }

        // Configuration de la scène
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1500)
        camera.position.set(0, 85, 460)
        camera.lookAt(0, 0, 0)

        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            })
            renderer.setClearColor(0x000000, 0)
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.toneMappingExposure = 1.3
        } catch {
            setWebglAvailable(false)
            return
        }

        const canvasEl = renderer.domElement
        canvasEl.style.display = 'block'
        canvasEl.style.width = '100%'
        canvasEl.style.height = '100%'
        mount.appendChild(canvasEl)

        const resizeRenderer = () => {
            const rect = container.getBoundingClientRect()
            const w = rect.width || container.clientWidth || 700
            const h = rect.height || container.clientHeight || 440
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            renderer.setPixelRatio(dpr)
            renderer.setSize(w, h, false)
            camera.aspect = w / h
            camera.updateProjectionMatrix()
        }
        resizeRenderer()

        if (typeof ResizeObserver !== 'undefined') {
            resizeObs = new ResizeObserver(() => {
                resizeRenderer()
            })
            resizeObs.observe(container)
        }
        window.addEventListener('resize', resizeRenderer)

        // Groupe racine pivotant (légèrement décalé pour centrage visuel avec le HUD)
        const rootGroup = new THREE.Group()
        rootGroup.position.x = 42
        scene.add(rootGroup)

        // Récupération de la couleur d'accentuation initiale
        const computedStyle = getComputedStyle(container)
        const initialAccentStr = computedStyle.getPropertyValue('--mr-accent-solid').trim()
        let currentAccentHex = resolveCssColor(initialAccentStr, SIGNATURE_VIOLET)
        let lastAccentStr = initialAccentStr

        // Éclairage studio architectural
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
        scene.add(ambientLight)

        // Key light principale (mise en valeur des biseaux et du chanfrein de verre)
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.5)
        keyLight.position.set(160, 260, 200)
        scene.add(keyLight)

        // Lumière zénithale directe pour faire briller la surface des dalles
        const topLight = new THREE.DirectionalLight(0xffffff, 2.8)
        topLight.position.set(0, 340, 100)
        scene.add(topLight)

        // Rim light rasante électrique (contraste cyan)
        const rimLight = new THREE.DirectionalLight(ELECTRIC_CYAN, 2.6)
        rimLight.position.set(-200, -140, -180)
        scene.add(rimLight)

        // Lumière interne diffuse placée au cœur de l'empilement (irradie entre les couches)
        const coreLight = new THREE.PointLight(currentAccentHex, 6.0, 420, 1.0)
        coreLight.position.set(0, 0, 0)
        rootGroup.add(coreLight)

        // Prisme central intérieur (émetteur optique entre mr.tokens et mr.themes)
        const prismGeo = new THREE.OctahedronGeometry(18, 0)
        const prismMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.1,
            metalness: 0.9,
            emissive: currentAccentHex,
            emissiveIntensity: 1.2,
        })
        const prismMesh = new THREE.Mesh(prismGeo, prismMat)
        prismMesh.position.set(0, 0, 0)
        rootGroup.add(prismMesh)

        const prismEdgesGeo = new THREE.EdgesGeometry(prismGeo)
        const prismEdgesMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
        })
        prismMesh.add(new THREE.LineSegments(prismEdgesGeo, prismEdgesMat))

        // Création de la géométrie de plaque de verre biseautée chanfreinée
        const slabWidth = 224
        const slabDepth = 138
        const slabRadius = 8
        const slabShape = createRoundedRectShape(slabWidth, slabDepth, slabRadius)
        const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
            depth: 4.5,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: 1.8,
            bevelThickness: 1.4,
        })
        // Poser la plaque à plat sur le plan XZ
        slabGeo.rotateX(Math.PI / 2)
        slabGeo.center()

        // Arêtes néon chanfreinées (détection de l'angle seuil de biseau)
        const slabEdgesGeo = new THREE.EdgesGeometry(slabGeo, 24)

        // Création d'un fil intérieur gravé
        const innerShape = createRoundedRectShape(slabWidth - 28, slabDepth - 28, slabRadius - 2)
        const innerPoints = innerShape.getPoints(32)
        const innerLinePositions = new Float32Array((innerPoints.length + 1) * 3)
        innerPoints.forEach((pt, i) => {
            innerLinePositions[i * 3] = pt.x
            innerLinePositions[i * 3 + 1] = 0.5
            innerLinePositions[i * 3 + 2] = -pt.y
        })
        // Fermer le tracé
        const firstPt = innerPoints[0]
        if (firstPt) {
            const lastIdx = innerPoints.length
            innerLinePositions[lastIdx * 3] = firstPt.x
            innerLinePositions[lastIdx * 3 + 1] = 0.5
            innerLinePositions[lastIdx * 3 + 2] = -firstPt.y
        }
        const innerLineGeo = new THREE.BufferGeometry()
        innerLineGeo.setAttribute('position', new THREE.BufferAttribute(innerLinePositions, 3))

        // Création des 6 plaques d'empilement
        interface PlateRuntime {
            spec: LayerSpec
            group: THREE.Group
            mesh: THREE.Mesh
            mat: THREE.MeshPhysicalMaterial
            edgesMat: THREE.LineBasicMaterial
            innerLineMat: THREE.LineBasicMaterial
            baseRelIndex: number
        }

        const plates: PlateRuntime[] = []

        LAYERS_SPEC.forEach((spec) => {
            const plateGroup = new THREE.Group()
            rootGroup.add(plateGroup)

            // Verre physique architectural translucide
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0x22273a,
                roughness: 0.1,
                metalness: 0.22,
                transmission: 0.72,
                ior: 1.5,
                thickness: 4.5,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05,
                transparent: true,
                opacity: 0.82,
                depthWrite: false,
                attenuationColor: new THREE.Color(currentAccentHex),
                attenuationDistance: 32,
            })

            const mesh = new THREE.Mesh(slabGeo, glassMat)
            plateGroup.add(mesh)

            // Bords chanfreinés lumineux
            const edgesMat = new THREE.LineBasicMaterial({
                color: currentAccentHex,
                transparent: true,
                opacity: 0.85,
            })
            const edgesLine = new THREE.LineSegments(slabEdgesGeo, edgesMat)
            plateGroup.add(edgesLine)

            // Filigrane architectural gravé en creux
            const innerLineMat = new THREE.LineBasicMaterial({
                color: currentAccentHex,
                transparent: true,
                opacity: 0.4,
            })
            const innerLine = new THREE.Line(innerLineGeo, innerLineMat)
            plateGroup.add(innerLine)

            // Relatif au centre de l'empilement (spec.index varie de 0 à 5, centre à 2.5)
            const baseRelIndex = spec.index - 2.5

            plates.push({
                spec,
                group: plateGroup,
                mesh,
                mat: glassMat,
                edgesMat,
                innerLineMat,
                baseRelIndex,
            })
        })

        // Particules d'ambiance stellaire discrètes
        const particleCount = 45
        const particlePositions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 650
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 350
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 450
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
        const particleMat = new THREE.PointsMaterial({
            color: currentAccentHex,
            size: 2.5,
            transparent: true,
            opacity: 0.35,
        })
        const particles = new THREE.Points(particleGeo, particleMat)
        rootGroup.add(particles)

        // État de cinématique et d'interaction
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const startTime = performance.now()

        // Angles isométriques nobles par défaut (inclinaison accentuée pour voir la surface du verre)
        const defaultRotX = 0.62
        const defaultRotY = -0.42
        let targetRotX = defaultRotX
        let targetRotY = defaultRotY
        let curRotX = defaultRotX
        let curRotY = defaultRotY
        let currentGap = 13
        let dragLastX = 0
        let dragLastY = 0
        let dragging = false
        let pointerTargetX = 0
        let pointerTargetY = 0

        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
            const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
            dragging = true
            setIsDragging(true)
            dragLastX = clientX
            dragLastY = clientY
        }

        const onPointerMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
            const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY

            if (dragging) {
                const deltaX = clientX - dragLastX
                const deltaY = clientY - dragLastY
                dragLastX = clientX
                dragLastY = clientY
                targetRotY += deltaX * 0.007
                targetRotX += deltaY * 0.007
            } else {
                const rect = container.getBoundingClientRect()
                if (rect.width > 0 && rect.height > 0) {
                    const relX = (clientX - rect.left) / rect.width - 0.5
                    const relY = (clientY - rect.top) / rect.height - 0.5
                    pointerTargetX = relY * 0.25
                    pointerTargetY = relX * 0.32
                }
            }
        }

        const onPointerUp = () => {
            dragging = false
            setIsDragging(false)
        }

        container.addEventListener('mousedown', onPointerDown)
        window.addEventListener('mousemove', onPointerMove)
        window.addEventListener('mouseup', onPointerUp)
        container.addEventListener('touchstart', onPointerDown, { passive: true })
        window.addEventListener('touchmove', onPointerMove, { passive: true })
        window.addEventListener('touchend', onPointerUp)

        // Boucle d'animation principale
        const animate = (time: number) => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            if (canvasEl.width === 0 || canvasEl.height === 0) {
                resizeRenderer()
            }

            const elapsed = time - startTime
            const introDuration = 1200
            const introRaw = prefersReducedMotion ? 1 : Math.min(1, elapsed / introDuration)
            const introEased = 1 - (1 - introRaw) ** 3

            // Synchronisation de la couleur d'accentuation en temps réel
            const currentAccent = computedStyle.getPropertyValue('--mr-accent-solid').trim()
            if (currentAccent && currentAccent !== lastAccentStr) {
                lastAccentStr = currentAccent
                currentAccentHex = resolveCssColor(currentAccent, SIGNATURE_VIOLET)
                coreLight.color.setHex(currentAccentHex)
                prismMat.emissive.setHex(currentAccentHex)
                particleMat.color.setHex(currentAccentHex)

                plates.forEach(({ mat, edgesMat }) => {
                    mat.attenuationColor.setHex(currentAccentHex)
                    edgesMat.color.setHex(currentAccentHex)
                })
            }

            // Rotation douce et amortissement
            if (!dragging && !prefersReducedMotion) {
                targetRotY += 0.0018
            }
            curRotX += (targetRotX + pointerTargetX - curRotX) * 0.06
            curRotY += (targetRotY + pointerTargetY - curRotY) * 0.06
            rootGroup.rotation.x = curRotX
            rootGroup.rotation.y = curRotY
            rootGroup.rotation.z = 0.06

            // Respiration verticale douce du monolithe
            const breathe = Math.sin(time * 0.0018) * 3

            // Espacement des couches : 14px au repos, 34px en vue éclatée au survol
            const activeId = activeLayerIdRef.current
            const isExploded = isHoveredRef.current || dragging || activeId !== null
            const targetGap = isExploded ? 34 : 14
            currentGap += (targetGap * introEased - currentGap) * 0.08

            // Prisme optique central tournoyant
            prismMesh.rotation.y += 0.012
            prismMesh.rotation.x += 0.006
            const prismScale = 0.8 + 0.2 * Math.sin(time * 0.003)
            prismMesh.scale.set(prismScale, prismScale, prismScale)
            coreLight.intensity = (4.2 + 1.2 * Math.sin(time * 0.004)) * introEased

            // Positionnement physique de chaque plaque
            plates.forEach((plate) => {
                const isSelected = activeId === plate.spec.id
                const targetY = plate.baseRelIndex * currentGap + breathe + (isSelected ? 6 : 0)

                plate.group.position.y += (targetY - plate.group.position.y) * 0.12

                // Mise en exergue du calque actif ou survolé
                plate.edgesMat.opacity = isSelected ? 0.95 : isExploded ? 0.65 : 0.45
                plate.innerLineMat.opacity = isSelected ? 0.45 : 0.18
                plate.mat.roughness = isSelected ? 0.08 : 0.14
            })

            // Mouvement très lent de l'atmosphère stellaire
            particles.rotation.y += 0.0004

            renderer.render(scene, camera)
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeRenderer)
            container.removeEventListener('mousedown', onPointerDown)
            window.removeEventListener('mousemove', onPointerMove)
            window.removeEventListener('mouseup', onPointerUp)
            container.removeEventListener('touchstart', onPointerDown)
            window.removeEventListener('touchmove', onPointerMove)
            window.removeEventListener('touchend', onPointerUp)
            if (intersectionObs) intersectionObs.disconnect()
            if (resizeObs) resizeObs.disconnect()

            slabGeo.dispose()
            slabEdgesGeo.dispose()
            innerLineGeo.dispose()
            prismGeo.dispose()
            prismMat.dispose()
            prismEdgesGeo.dispose()
            prismEdgesMat.dispose()
            particleGeo.dispose()
            particleMat.dispose()

            plates.forEach(({ mat, edgesMat, innerLineMat }) => {
                mat.dispose()
                edgesMat.dispose()
                innerLineMat.dispose()
            })

            if (mount.contains(canvasEl)) {
                mount.removeChild(canvasEl)
            }
            renderer.dispose()
        }
    }, [])

    return (
        <figure
            ref={containerRef}
            role="figure"
            aria-label={messages.home.hero.matrixAriaLabel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
                setIsDragging(false)
                setActiveLayerId(null)
            }}
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '48rem',
                height: '440px',
                marginInline: 'auto',
                marginBlock: 'var(--mr-space-2) var(--mr-space-4)',
                borderRadius: 'var(--mr-radius-xl, 1rem)',
                overflow: 'hidden',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                touchAction: 'none',
                backgroundColor: 'transparent',
            }}
        >
            {/* Conteneur d'injection dynamique du canvas WebGL */}
            <div
                ref={mountRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Rendu de secours SVG si WebGL est désactivé */}
            {!webglAvailable && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <svg
                        width="300"
                        height="260"
                        viewBox="0 0 300 260"
                        fill="none"
                        style={{ opacity: 0.85 }}
                    >
                        {[0, 1, 2, 3, 4, 5].map((idx) => {
                            const y = 50 + idx * 28
                            return (
                                <g key={idx}>
                                    <polygon
                                        points={`150,${y} 250,${y + 40} 150,${y + 80} 50,${y + 40}`}
                                        stroke="var(--mr-accent-solid)"
                                        strokeWidth="1.5"
                                        fill="color-mix(in oklch, var(--mr-bg-surface), transparent 50%)"
                                        opacity={0.4 + idx * 0.1}
                                    />
                                </g>
                            )
                        })}
                    </svg>
                </div>
            )}

            {/* Sélecteur architectural discret de strates (HUD élégant en haut à gauche) */}
            <div
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    pointerEvents: 'auto',
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--mr-text-muted)',
                        fontFamily: 'var(--mr-font-family-mono)',
                        marginBottom: '4px',
                    }}
                >
                    CSS @layer Architecture
                </div>
                {LAYERS_SPEC.map((layer) => {
                    const isActive = activeLayerId === layer.id
                    return (
                        <button
                            key={layer.id}
                            type="button"
                            onMouseEnter={() => setActiveLayerId(layer.id)}
                            onMouseLeave={() => setActiveLayerId(null)}
                            onClick={() =>
                                setActiveLayerId((prev) => (prev === layer.id ? null : layer.id))
                            }
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '3px 8px',
                                borderRadius: 'var(--mr-radius-sm, 4px)',
                                border: isActive
                                    ? '1px solid var(--mr-accent-solid)'
                                    : '1px solid transparent',
                                backgroundColor: isActive
                                    ? 'color-mix(in oklch, var(--mr-accent-solid) 16%, transparent)'
                                    : 'transparent',
                                color: isActive
                                    ? 'var(--mr-text-primary)'
                                    : 'var(--mr-text-secondary)',
                                fontFamily: 'var(--mr-font-family-mono)',
                                fontSize: '11px',
                                cursor: 'pointer',
                                transition:
                                    'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
                                textAlign: 'left',
                            }}
                        >
                            <span
                                style={{
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: '50%',
                                    backgroundColor: isActive
                                        ? 'var(--mr-accent-solid)'
                                        : 'var(--mr-border-default)',
                                    boxShadow: isActive ? '0 0 8px var(--mr-accent-solid)' : 'none',
                                    transition:
                                        'background-color 150ms ease, box-shadow 150ms ease',
                                }}
                            />
                            <span style={{ fontWeight: isActive ? 600 : 400 }}>{layer.label}</span>
                            <span
                                style={{
                                    fontSize: '9px',
                                    color: 'var(--mr-text-muted)',
                                    opacity: 0.8,
                                }}
                            >
                                {layer.role}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Légende discrète d'interaction en bas à droite */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    right: '1.25rem',
                    fontSize: '0.75rem',
                    color: 'var(--mr-text-muted)',
                    pointerEvents: 'none',
                    opacity: isHovered ? 0.9 : 0.45,
                    transition: 'opacity var(--mr-duration-state) ease',
                    fontFamily: 'var(--mr-font-family-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}
            >
                <span>Hover to expand •</span>
                <span>Drag to orbit 3D</span>
            </div>

            {/* Texte accessible réservé aux lecteurs d'écran (masqué visuellement sans dépendance CSS) */}
            <figcaption
                style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                }}
            >
                Interactive 3D vector matrix demonstrating the Monority UI component core connected
                to React 19, TypeScript, CSS @layer, OKLCH runtime theming, Next.js, and Vite.
            </figcaption>
        </figure>
    )
}
