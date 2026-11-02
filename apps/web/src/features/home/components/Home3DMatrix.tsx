import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useMessages } from '@/shared/i18n'

interface OrbitalNodeConfig {
    id: string
    label: string
    subLabel: string
    angle: number
    speed: number
    radius: number
    yOffset: number
}

const NODES_CONFIG: OrbitalNodeConfig[] = [
    {
        id: 'react',
        label: 'React 19',
        subLabel: 'Native ref',
        angle: 0,
        speed: 0.005,
        radius: 195,
        yOffset: -18,
    },
    {
        id: 'ts',
        label: 'TypeScript',
        subLabel: 'Strict types',
        angle: (Math.PI * 1) / 3,
        speed: 0.005,
        radius: 200,
        yOffset: 22,
    },
    {
        id: 'layer',
        label: 'CSS @layer',
        subLabel: 'Isolation',
        angle: (Math.PI * 2) / 3,
        speed: 0.005,
        radius: 190,
        yOffset: -26,
    },
    {
        id: 'oklch',
        label: 'OKLCH',
        subLabel: 'Runtime theme',
        angle: Math.PI,
        speed: 0.005,
        radius: 195,
        yOffset: 16,
    },
    {
        id: 'next',
        label: 'Next.js',
        subLabel: 'App Router',
        angle: (Math.PI * 4) / 3,
        speed: 0.005,
        radius: 205,
        yOffset: -16,
    },
    {
        id: 'vite',
        label: 'Vite',
        subLabel: 'Instant HMR',
        angle: (Math.PI * 5) / 3,
        speed: 0.005,
        radius: 190,
        yOffset: 24,
    },
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

                // Si la couleur est achromatique (gris/blanc neutre) ou quasi noire, préserver le violet signature
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

export function Home3DMatrix() {
    const messages = useMessages()
    const containerRef = useRef<HTMLElement | null>(null)
    const mountRef = useRef<HTMLDivElement | null>(null)

    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
    const [webglAvailable, setWebglAvailable] = useState<boolean>(true)

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

        // Configuration Three.js de base
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1500)
        camera.position.set(0, 22, 500)
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
            renderer.toneMappingExposure = 1.25
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

        // Groupe racine
        const rootGroup = new THREE.Group()
        scene.add(rootGroup)

        // Récupération de la couleur d'accentuation initiale
        const computedStyle = getComputedStyle(container)
        const initialAccentStr = computedStyle.getPropertyValue('--mr-accent-solid').trim()
        let currentAccentHex = resolveCssColor(initialAccentStr, SIGNATURE_VIOLET)
        let lastAccentStr = initialAccentStr

        // Lumières Three.js
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
        scene.add(ambientLight)

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
        keyLight.position.set(160, 240, 220)
        scene.add(keyLight)

        // Lumière rasante cyan contrastée
        const rimLight = new THREE.DirectionalLight(ELECTRIC_CYAN, 2.6)
        rimLight.position.set(-200, -140, -180)
        scene.add(rimLight)

        const coreLight = new THREE.PointLight(currentAccentHex, 4.5, 400, 1.2)
        coreLight.position.set(0, 0, 0)
        rootGroup.add(coreLight)

        // 1. Cœur central : Hypercube translucide (PBR avec double face)
        const outerBoxGeo = new THREE.BoxGeometry(86, 86, 86)
        const outerGlassMat = new THREE.MeshStandardMaterial({
            color: currentAccentHex,
            roughness: 0.12,
            metalness: 0.25,
            transparent: true,
            opacity: 0.35,
            side: THREE.DoubleSide,
            depthWrite: false,
        })
        const outerCube = new THREE.Mesh(outerBoxGeo, outerGlassMat)
        rootGroup.add(outerCube)

        // Arêtes néon lumineuses de l'hypercube
        const edgesGeo = new THREE.EdgesGeometry(outerBoxGeo)
        const edgesMat = new THREE.LineBasicMaterial({
            color: currentAccentHex,
            transparent: true,
            opacity: 0.95,
        })
        const outerEdges = new THREE.LineSegments(edgesGeo, edgesMat)
        rootGroup.add(outerEdges)

        // 2. Gyroscope intérieur : Octaèdre métallique pulsant
        const octaGeo = new THREE.OctahedronGeometry(44, 0)
        const octaMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.18,
            metalness: 0.85,
            emissive: currentAccentHex,
            emissiveIntensity: 0.95,
        })
        const innerOcta = new THREE.Mesh(octaGeo, octaMat)
        rootGroup.add(innerOcta)

        const octaEdgesGeo = new THREE.EdgesGeometry(octaGeo)
        const octaEdgesMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.95,
        })
        const innerOctaEdges = new THREE.LineSegments(octaEdgesGeo, octaEdgesMat)
        innerOcta.add(innerOctaEdges)

        // 3. Nœuds satellites orbitaux & faisceaux laser
        const satelliteMeshes: {
            config: OrbitalNodeConfig
            mesh: THREE.Mesh
            mat: THREE.MeshStandardMaterial
            line: THREE.Line
            lineGeo: THREE.BufferGeometry
            lineMat: THREE.LineBasicMaterial
            currentAngle: number
        }[] = []

        const satelliteGeo = new THREE.IcosahedronGeometry(9, 1)

        NODES_CONFIG.forEach((config) => {
            const satMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: currentAccentHex,
                emissiveIntensity: 1.2,
                roughness: 0.15,
                metalness: 0.6,
            })
            const satMesh = new THREE.Mesh(satelliteGeo, satMat)
            rootGroup.add(satMesh)

            // Faisceau reliant le noyau au satellite
            const linePositions = new Float32Array([0, 0, 0, 0, 0, 0])
            const lineGeo = new THREE.BufferGeometry()
            lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
            const lineMat = new THREE.LineBasicMaterial({
                color: currentAccentHex,
                transparent: true,
                opacity: 0.75,
            })
            const line = new THREE.Line(lineGeo, lineMat)
            rootGroup.add(line)

            satelliteMeshes.push({
                config,
                mesh: satMesh,
                mat: satMat,
                line,
                lineGeo,
                lineMat,
                currentAngle: config.angle,
            })
        })

        // 4. Poussière d'étoiles / particules d'ambiance
        const particleCount = 60
        const particlePositions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 680
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 480
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 480
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
        const particleMat = new THREE.PointsMaterial({
            color: currentAccentHex,
            size: 3,
            transparent: true,
            opacity: 0.5,
        })
        const particles = new THREE.Points(particleGeo, particleMat)
        rootGroup.add(particles)

        // État de cinématique et d'interaction
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const startTime = performance.now()
        let targetRotX = 0.22
        let targetRotY = -0.32
        let curRotX = 0.22
        let curRotY = -0.32
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
                targetRotY += deltaX * 0.008
                targetRotX += deltaY * 0.008
            } else {
                const rect = container.getBoundingClientRect()
                if (rect.width > 0 && rect.height > 0) {
                    const relX = (clientX - rect.left) / rect.width - 0.5
                    const relY = (clientY - rect.top) / rect.height - 0.5
                    pointerTargetX = relY * 0.35
                    pointerTargetY = relX * 0.45
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

        // Cache des éléments DOM des badges pour éviter toute réconciliation React à 60fps
        const badgeEls = new Map<string, HTMLElement>()
        container.querySelectorAll<HTMLElement>('[data-node-badge]').forEach((el) => {
            const id = el.getAttribute('data-node-badge')
            if (id) badgeEls.set(id, el)
        })

        const tempV = new THREE.Vector3()

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
            const introDuration = 1400
            const introRaw = prefersReducedMotion ? 1 : Math.min(1, elapsed / introDuration)
            const introEased = 1 - (1 - introRaw) ** 3

            // Détection du changement de couleur d'accentuation en temps réel
            const currentAccent = computedStyle.getPropertyValue('--mr-accent-solid').trim()
            if (currentAccent && currentAccent !== lastAccentStr) {
                lastAccentStr = currentAccent
                currentAccentHex = resolveCssColor(currentAccent, SIGNATURE_VIOLET)
                coreLight.color.setHex(currentAccentHex)
                edgesMat.color.setHex(currentAccentHex)
                outerGlassMat.color.setHex(currentAccentHex)
                octaMat.emissive.setHex(currentAccentHex)
                particleMat.color.setHex(currentAccentHex)

                satelliteMeshes.forEach(({ mat, lineMat }) => {
                    mat.emissive.setHex(currentAccentHex)
                    lineMat.color.setHex(currentAccentHex)
                })
            }

            // Rotation douce et amortissement LERP
            if (!dragging && !prefersReducedMotion) {
                targetRotY += 0.003
            }
            curRotX += (targetRotX + pointerTargetX - curRotX) * 0.06
            curRotY += (targetRotY + pointerTargetY - curRotY) * 0.06
            rootGroup.rotation.x = curRotX
            rootGroup.rotation.y = curRotY

            // Échelle du cœur (animation d'intro)
            const coreScale = prefersReducedMotion ? 1 : 0.2 + 0.8 * introEased
            outerCube.scale.set(coreScale, coreScale, coreScale)
            outerEdges.scale.set(coreScale, coreScale, coreScale)

            // Contre-rotation du gyroscope interne
            innerOcta.rotation.y -= 0.008
            innerOcta.rotation.x += 0.004
            const octaScale = coreScale * (1 + 0.04 * Math.sin(time * 0.003))
            innerOcta.scale.set(octaScale, octaScale, octaScale)

            // Pulsation du cœur lumineux
            coreLight.intensity = (4.0 + 1.0 * Math.sin(time * 0.004)) * introEased

            // Calcul de la projection 2D des nœuds satellites directement sur le DOM
            const rect = container.getBoundingClientRect()
            const width = rect.width || 700
            const height = rect.height || 440

            // Récupération tardive des badges si le montage DOM n'était pas achevé
            if (badgeEls.size === 0) {
                container.querySelectorAll<HTMLElement>('[data-node-badge]').forEach((el) => {
                    const id = el.getAttribute('data-node-badge')
                    if (id) badgeEls.set(id, el)
                })
            }

            satelliteMeshes.forEach((satItem, idx) => {
                const { config, mesh, lineGeo } = satItem
                if (!prefersReducedMotion) {
                    satItem.currentAngle += config.speed
                }
                const currentAngle = satItem.currentAngle

                // Dispersion spatiale durant l'assemblage
                const dispersion = prefersReducedMotion ? 1 : 2.5 - 1.5 * introEased
                const currentRadius = config.radius * dispersion

                const x = Math.cos(currentAngle) * currentRadius
                const z = Math.sin(currentAngle) * currentRadius
                const y = config.yOffset + Math.sin(time * 0.002 + idx) * 8

                mesh.position.set(x, y, z)

                // Faisceau reliant le centre au satellite
                const posAttr = lineGeo.attributes.position as THREE.BufferAttribute
                const arr = posAttr.array as Float32Array
                arr[0] = 0
                arr[1] = 0
                arr[2] = 0
                arr[3] = x
                arr[4] = y
                arr[5] = z
                posAttr.needsUpdate = true

                // Projection exacte de la coordonnée 3D
                mesh.getWorldPosition(tempV)
                // Profondeur spatiale absolue dans le monde
                const worldZ = tempV.z
                const normalizedDepth = Math.max(-1, Math.min(1, worldZ / config.radius))

                // Projection caméra 2D
                tempV.project(camera)
                const screenX = (tempV.x * 0.5 + 0.5) * width
                const screenY = (-tempV.y * 0.5 + 0.5) * height

                // Échelle et opacité basées sur la profondeur réelle
                const isBehind = normalizedDepth < -0.15
                const depthScale = 1.0 + normalizedDepth * 0.15
                const opacity = (isBehind ? 0.65 : 1.0) * Math.max(0.4, introEased)
                const zIndex = Math.round(50 + normalizedDepth * 40)

                const badgeEl = badgeEls.get(config.id)
                if (badgeEl) {
                    badgeEl.style.transform = `translate(-50%, -50%) translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(1)}px, 0) scale(${depthScale.toFixed(3)})`
                    badgeEl.style.opacity = `${opacity.toFixed(2)}`
                    badgeEl.style.zIndex = `${zIndex}`
                }
            })

            // Rotation lente de l'atmosphère stellaire
            particles.rotation.y += 0.0006

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

            outerBoxGeo.dispose()
            outerGlassMat.dispose()
            edgesGeo.dispose()
            edgesMat.dispose()
            octaGeo.dispose()
            octaMat.dispose()
            octaEdgesGeo.dispose()
            octaEdgesMat.dispose()
            satelliteGeo.dispose()
            particleGeo.dispose()
            particleMat.dispose()

            satelliteMeshes.forEach(({ lineGeo, lineMat, mat }) => {
                lineGeo.dispose()
                lineMat.dispose()
                mat.dispose()
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

            {/* Rendu de secours SVG élégant si WebGL n'est pas disponible */}
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
                        width="320"
                        height="320"
                        viewBox="0 0 320 320"
                        fill="none"
                        style={{ opacity: 0.8 }}
                    >
                        <circle
                            cx="160"
                            cy="160"
                            r="110"
                            stroke="var(--mr-accent-solid)"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            opacity="0.4"
                        />
                        <polygon
                            points="160,80 230,125 230,205 160,250 90,205 90,125"
                            stroke="var(--mr-accent-solid)"
                            strokeWidth="2"
                            fill="color-mix(in oklch, var(--mr-accent-solid) 12%, transparent)"
                        />
                        <polygon
                            points="160,110 205,138 205,188 160,215 115,188 115,138"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            opacity="0.9"
                            fill="none"
                        />
                    </svg>
                </div>
            )}

            {/* Badges HTML projetés en 3D avec typographie nette et netteté Retina */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                {NODES_CONFIG.map((node) => {
                    const isNodeHovered = hoveredNodeId === node.id
                    return (
                        <div
                            key={node.id}
                            data-node-badge={node.id}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                transform:
                                    'translate(-50%, -50%) translate3d(384px, 220px, 0) scale(0)',
                                opacity: 0,
                                pointerEvents: 'auto',
                                cursor: 'pointer',
                                transition:
                                    'box-shadow 150ms ease, border-color 150ms ease, scale 150ms ease',
                                willChange: 'transform, opacity',
                            }}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '7px',
                                    padding: '5px 12px',
                                    borderRadius: 'var(--mr-radius-full)',
                                    backgroundColor:
                                        'color-mix(in oklch, var(--mr-bg-surface), black 30%)',
                                    backdropFilter: 'blur(14px)',
                                    WebkitBackdropFilter: 'blur(14px)',
                                    border: isNodeHovered
                                        ? '1px solid var(--mr-accent-solid)'
                                        : '1px solid color-mix(in oklch, var(--mr-border-default), transparent 30%)',
                                    boxShadow: isNodeHovered
                                        ? '0 0 18px color-mix(in oklch, var(--mr-accent-solid) 40%, transparent)'
                                        : '0 4px 16px rgba(0, 0, 0, 0.35)',
                                    transform: isNodeHovered ? 'scale(1.12)' : 'scale(1)',
                                    transition:
                                        'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms ease, border-color 150ms ease',
                                }}
                            >
                                <span
                                    style={{
                                        width: '7px',
                                        height: '7px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--mr-accent-solid)',
                                        boxShadow: '0 0 10px var(--mr-accent-solid)',
                                        flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: 'var(--mr-font-size-xs)',
                                        fontWeight: 600,
                                        color: 'var(--mr-text-primary)',
                                        letterSpacing: '-0.01em',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {node.label}
                                </span>
                                <span
                                    style={{
                                        fontSize: '10px',
                                        color: 'var(--mr-text-muted)',
                                        fontWeight: 400,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {node.subLabel}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Légende discrète d'interaction */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '1rem',
                    fontSize: '0.75rem',
                    color: 'var(--mr-text-muted)',
                    pointerEvents: 'none',
                    opacity: isHovered ? 0.9 : 0.4,
                    transition: 'opacity var(--mr-duration-state) ease',
                    fontFamily: 'var(--mr-font-family-mono)',
                }}
            >
                Drag to orbit 3D
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
