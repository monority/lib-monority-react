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
        yOffset: -22,
    },
    {
        id: 'ts',
        label: 'TypeScript',
        subLabel: 'Strict types',
        angle: (Math.PI * 1) / 3,
        speed: 0.005,
        radius: 200,
        yOffset: 25,
    },
    {
        id: 'layer',
        label: 'CSS @layer',
        subLabel: 'Isolation',
        angle: (Math.PI * 2) / 3,
        speed: 0.005,
        radius: 190,
        yOffset: -30,
    },
    {
        id: 'oklch',
        label: 'OKLCH',
        subLabel: 'Runtime theme',
        angle: Math.PI,
        speed: 0.005,
        radius: 195,
        yOffset: 18,
    },
    {
        id: 'next',
        label: 'Next.js',
        subLabel: 'App Router',
        angle: (Math.PI * 4) / 3,
        speed: 0.005,
        radius: 205,
        yOffset: -18,
    },
    {
        id: 'vite',
        label: 'Vite',
        subLabel: 'Instant HMR',
        angle: (Math.PI * 5) / 3,
        speed: 0.005,
        radius: 190,
        yOffset: 28,
    },
]

interface ProjectedNode {
    id: string
    label: string
    subLabel: string
    x: number
    y: number
    scale: number
    opacity: number
    zIndex: number
}

// Mappage instantané des teintes d'accentuation standard de Monority
const ACCENT_HEX_MAP: Record<string, number> = {
    '290': 0x8b5cf6, // Violet
    '215': 0x06b6d4, // Cyan
    '70': 0xf59e0b, // Amber
    '155': 0x10b981, // Emerald
}

let helperCanvas: HTMLCanvasElement | null = null
let helperCtx: CanvasRenderingContext2D | null = null

function resolveCssColor(cssColor: string, defaultHex = 0x8b5cf6): number {
    if (!cssColor) return defaultHex
    const trimmed = cssColor.trim()

    // 1. Détection rapide hexadécimale
    if (trimmed.startsWith('#')) {
        const parsed = Number.parseInt(trimmed.slice(1), 16)
        if (!Number.isNaN(parsed)) return parsed
    }

    // 2. Détection rapide des teintes OKLCH de Monority
    for (const [hue, hex] of Object.entries(ACCENT_HEX_MAP)) {
        if (trimmed.includes(hue)) return hex
    }

    // 3. Résolution Canvas 2D sans altération du DOM
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
                if (data[3] !== 0) {
                    return ((data[0] ?? 0) << 16) | ((data[1] ?? 0) << 8) | (data[2] ?? 0)
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
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
    } catch {
        return false
    }
}

export function Home3DMatrix() {
    const messages = useMessages()
    const containerRef = useRef<HTMLElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [projectedNodes, setProjectedNodes] = useState<ProjectedNode[]>([])
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas || !isWebGLSupported()) {
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
        camera.position.set(0, 30, 440)
        camera.lookAt(0, 0, 0)

        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            })
            renderer.setClearColor(0x000000, 0)
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.toneMappingExposure = 1.2
        } catch {
            return
        }

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
        let currentAccentHex = resolveCssColor(initialAccentStr, 0x8b5cf6)
        let lastAccentStr = initialAccentStr

        // Lumières Three.js
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85)
        scene.add(ambientLight)

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
        keyLight.position.set(160, 240, 200)
        scene.add(keyLight)

        const rimLight = new THREE.DirectionalLight(currentAccentHex, 2.2)
        rimLight.position.set(-180, -120, -180)
        scene.add(rimLight)

        const coreLight = new THREE.PointLight(currentAccentHex, 3.8, 350, 1.2)
        coreLight.position.set(0, 0, 0)
        rootGroup.add(coreLight)

        // 1. Cœur central : Hypercube translucide (PBR avec double face)
        const outerBoxGeo = new THREE.BoxGeometry(82, 82, 82)
        const outerGlassMat = new THREE.MeshStandardMaterial({
            color: currentAccentHex,
            roughness: 0.15,
            metalness: 0.25,
            transparent: true,
            opacity: 0.28,
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
        const octaGeo = new THREE.OctahedronGeometry(42, 0)
        const octaMat = new THREE.MeshStandardMaterial({
            color: currentAccentHex,
            roughness: 0.2,
            metalness: 0.8,
            emissive: currentAccentHex,
            emissiveIntensity: 0.8,
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

        const satelliteGeo = new THREE.IcosahedronGeometry(8, 1)

        NODES_CONFIG.forEach((config) => {
            const satMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: currentAccentHex,
                emissiveIntensity: 1.1,
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
                opacity: 0.65,
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
        const particleCount = 50
        const particlePositions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 650
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 480
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 450
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
        const particleMat = new THREE.PointsMaterial({
            color: currentAccentHex,
            size: 3,
            transparent: true,
            opacity: 0.45,
        })
        const particles = new THREE.Points(particleGeo, particleMat)
        rootGroup.add(particles)

        // État de cinématique et d'interaction
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const startTime = performance.now()
        let targetRotX = 0.2
        let targetRotY = -0.3
        let curRotX = 0.2
        let curRotY = -0.3
        let dragLastX = 0
        let dragLastY = 0
        let dragging = false
        let pointerTargetX = 0
        let pointerTargetY = 0

        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            dragging = true
            setIsDragging(true)
            const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
            const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
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

        const tempV = new THREE.Vector3()

        // Boucle d'animation principale
        const animate = (time: number) => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            // Vérification de sécurité de taille si initialisation tardive
            if (canvas.width === 0 || canvas.height === 0) {
                resizeRenderer()
            }

            const elapsed = time - startTime
            const introDuration = 1400
            const introRaw = prefersReducedMotion ? 1 : Math.min(1, elapsed / introDuration)
            const introEased = 1 - Math.pow(1 - introRaw, 3)

            // Détection du changement de couleur d'accentuation en temps réel (0ms)
            const currentAccent = computedStyle.getPropertyValue('--mr-accent-solid').trim()
            if (currentAccent && currentAccent !== lastAccentStr) {
                lastAccentStr = currentAccent
                currentAccentHex = resolveCssColor(currentAccent)
                rimLight.color.setHex(currentAccentHex)
                coreLight.color.setHex(currentAccentHex)
                edgesMat.color.setHex(currentAccentHex)
                outerGlassMat.color.setHex(currentAccentHex)
                octaMat.color.setHex(currentAccentHex)
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
            coreLight.intensity = (3.2 + 0.8 * Math.sin(time * 0.004)) * introEased

            // Calcul de la projection 2D des nœuds satellites
            const rect = container.getBoundingClientRect()
            const width = rect.width || 700
            const height = rect.height || 440
            const nextProjected: ProjectedNode[] = []

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

                // Projection de la coordonnée 3D vers l'écran 2D
                mesh.getWorldPosition(tempV)
                tempV.project(camera)

                const screenX = (tempV.x * 0.5 + 0.5) * width
                const screenY = (-tempV.y * 0.5 + 0.5) * height
                const isBehind = tempV.z > 0.8
                const depthScale = Math.max(0.75, Math.min(1.15, 1 - (tempV.z - 0.5) * 0.6))
                const opacity = isBehind ? 0.45 : 0.95

                nextProjected.push({
                    id: config.id,
                    label: config.label,
                    subLabel: config.subLabel,
                    x: screenX,
                    y: screenY,
                    scale: depthScale,
                    opacity: opacity * Math.max(0.5, introEased),
                    zIndex: Math.round((1 - tempV.z) * 100),
                })
            })

            setProjectedNodes(nextProjected)

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

            renderer.dispose()
            renderer.forceContextLoss()
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
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            />

            {/* Badges HTML projetés en 3D avec typographie nette et netteté Retina */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                {projectedNodes.map((node) => {
                    const isNodeHovered = hoveredNodeId === node.id
                    return (
                        <div
                            key={node.id}
                            style={{
                                position: 'absolute',
                                left: `${node.x}px`,
                                top: `${node.y}px`,
                                transform: `translate(-50%, -50%) scale(${node.scale * (isNodeHovered ? 1.15 : 1)})`,
                                opacity: node.opacity,
                                zIndex: node.zIndex,
                                pointerEvents: 'auto',
                                cursor: 'pointer',
                                transition:
                                    'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease',
                            }}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px',
                                    borderRadius: 'var(--mr-radius-full)',
                                    backgroundColor:
                                        'color-mix(in oklch, var(--mr-bg-surface), black 25%)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: isNodeHovered
                                        ? '1px solid var(--mr-accent-solid)'
                                        : '1px solid var(--mr-border-subtle)',
                                    boxShadow: isNodeHovered
                                        ? '0 0 16px var(--mr-accent-subtle)'
                                        : '0 4px 12px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                <span
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--mr-accent-solid)',
                                        boxShadow: '0 0 8px var(--mr-accent-solid)',
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: 'var(--mr-font-size-xs)',
                                        fontWeight: 600,
                                        color: 'var(--mr-text-primary)',
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    {node.label}
                                </span>
                                <span
                                    style={{
                                        fontSize: '10px',
                                        color: 'var(--mr-text-muted)',
                                        fontWeight: 400,
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

            <figcaption className="sr-only">
                Interactive 3D vector matrix demonstrating the Monority UI component core connected
                to React 19, TypeScript, CSS @layer, OKLCH runtime theming, Next.js, and Vite.
            </figcaption>
        </figure>
    )
}
