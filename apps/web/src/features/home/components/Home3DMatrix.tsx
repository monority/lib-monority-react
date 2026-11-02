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

function resolveCssColor(cssColor: string, defaultHex = 0x8b5cf6): number {
    if (typeof document === 'undefined') return defaultHex
    try {
        const dummy = document.createElement('div')
        dummy.style.color = cssColor
        document.body.appendChild(dummy)
        const computed = getComputedStyle(dummy).color
        document.body.removeChild(dummy)
        const match = computed.match(/\d+/g)
        if (match && match.length >= 3) {
            return (Number(match[0]) << 16) | (Number(match[1]) << 8) | Number(match[2])
        }
    } catch {
        /* fallback */
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
        let observer: IntersectionObserver | null = null

        if (typeof IntersectionObserver !== 'undefined') {
            observer = new IntersectionObserver(
                ([entry]) => {
                    isVisible = entry?.isIntersecting ?? true
                },
                { threshold: 0.05 }
            )
            observer.observe(container)
        }

        // Configuration Three.js
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1500)
        camera.position.set(0, 30, 480)

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
            renderer.toneMappingExposure = 1.15
        } catch {
            return
        }

        const resizeRenderer = () => {
            const rect = container.getBoundingClientRect()
            if (rect.width === 0 || rect.height === 0) return
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            renderer.setPixelRatio(dpr)
            renderer.setSize(rect.width, rect.height, false)
            camera.aspect = rect.width / rect.height
            camera.updateProjectionMatrix()
        }
        resizeRenderer()
        window.addEventListener('resize', resizeRenderer)

        // Groupe racine
        const rootGroup = new THREE.Group()
        scene.add(rootGroup)

        // Récupération dynamique de la couleur d'accentuation
        const computedStyle = getComputedStyle(container)
        const initialAccentHex = resolveCssColor(
            computedStyle.getPropertyValue('--mr-accent-solid').trim() || '#8b5cf6'
        )

        // Lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
        keyLight.position.set(160, 240, 200)
        scene.add(keyLight)

        const rimLight = new THREE.DirectionalLight(initialAccentHex, 2.0)
        rimLight.position.set(-180, -120, -180)
        scene.add(rimLight)

        const coreLight = new THREE.PointLight(initialAccentHex, 3.2, 320, 1.4)
        coreLight.position.set(0, 0, 0)
        rootGroup.add(coreLight)

        // Cœur central monolithique en verre dépoli (PBR Physical Material)
        const outerBoxGeo = new THREE.BoxGeometry(82, 82, 82)
        const outerGlassMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.05,
            roughness: 0.12,
            transmission: 0.72,
            thickness: 1.6,
            ior: 1.5,
            transparent: true,
            opacity: 0.78,
            reflectivity: 0.5,
        })
        const outerCube = new THREE.Mesh(outerBoxGeo, outerGlassMat)
        rootGroup.add(outerCube)

        // Arêtes lumineuses du cube
        const edgesGeo = new THREE.EdgesGeometry(outerBoxGeo)
        const edgesMat = new THREE.LineBasicMaterial({
            color: initialAccentHex,
            transparent: true,
            opacity: 0.85,
        })
        const outerEdges = new THREE.LineSegments(edgesGeo, edgesMat)
        rootGroup.add(outerEdges)

        // Noyau gyroscopique intérieur (Octaèdre)
        const octaGeo = new THREE.OctahedronGeometry(42, 0)
        const octaMat = new THREE.MeshStandardMaterial({
            color: initialAccentHex,
            roughness: 0.25,
            metalness: 0.75,
            emissive: initialAccentHex,
            emissiveIntensity: 0.55,
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

        // Nœuds satellites et faisceaux laser
        const satelliteMeshes: {
            config: OrbitalNodeConfig
            mesh: THREE.Mesh
            line: THREE.Line
            lineGeo: THREE.BufferGeometry
            currentAngle: number
        }[] = []

        const satelliteGeo = new THREE.IcosahedronGeometry(7.5, 1)

        NODES_CONFIG.forEach((config) => {
            const satMat = new THREE.MeshStandardMaterial({
                color: initialAccentHex,
                emissive: initialAccentHex,
                emissiveIntensity: 0.9,
                roughness: 0.2,
                metalness: 0.5,
            })
            const satMesh = new THREE.Mesh(satelliteGeo, satMat)
            rootGroup.add(satMesh)

            // Ligne de faisceau reliant le centre au satellite
            const linePositions = new Float32Array([0, 0, 0, 0, 0, 0])
            const lineGeo = new THREE.BufferGeometry()
            lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
            const lineMat = new THREE.LineBasicMaterial({
                color: initialAccentHex,
                transparent: true,
                opacity: 0.45,
            })
            const line = new THREE.Line(lineGeo, lineMat)
            rootGroup.add(line)

            satelliteMeshes.push({
                config,
                mesh: satMesh,
                line,
                lineGeo,
                currentAngle: config.angle,
            })
        })

        // Particules flottantes d'ambiance (poussière stellaire en arrière-plan)
        const particleCount = 45
        const particlePositions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 600
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 450
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 400
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
        const particleMat = new THREE.PointsMaterial({
            color: initialAccentHex,
            size: 2.5,
            transparent: true,
            opacity: 0.35,
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

        // Gestionnaires d'interaction souris
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
                const relX = (clientX - rect.left) / rect.width - 0.5
                const relY = (clientY - rect.top) / rect.height - 0.5
                pointerTargetX = relY * 0.35
                pointerTargetY = relX * 0.45
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

        // Vecteur temporaire pour projection écran
        const tempV = new THREE.Vector3()

        // Boucle d'animation
        const animate = (time: number) => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            const elapsed = time - startTime
            const introDuration = 1400
            const introRaw = prefersReducedMotion ? 1 : Math.min(1, elapsed / introDuration)
            // Lissage exponentiel (courbe cubic-bezier 0.16, 1, 0.3, 1)
            const introEased = 1 - Math.pow(1 - introRaw, 3)

            // Mise à jour de la couleur d'accentuation en temps réel si modifiée
            const currentAccent = computedStyle.getPropertyValue('--mr-accent-solid').trim()
            if (currentAccent) {
                const currentHex = resolveCssColor(currentAccent)
                rimLight.color.setHex(currentHex)
                coreLight.color.setHex(currentHex)
                edgesMat.color.setHex(currentHex)
                octaMat.color.setHex(currentHex)
                octaMat.emissive.setHex(currentHex)
                particleMat.color.setHex(currentHex)
            }

            // LERP de rotation
            if (!dragging && !prefersReducedMotion) {
                targetRotY += 0.003
            }
            curRotX += (targetRotX + pointerTargetX - curRotX) * 0.06
            curRotY += (targetRotY + pointerTargetY - curRotY) * 0.06
            rootGroup.rotation.x = curRotX
            rootGroup.rotation.y = curRotY

            // Échelle et animation du cœur
            const coreScale = prefersReducedMotion ? 1 : 0.15 + 0.85 * introEased
            outerCube.scale.set(coreScale, coreScale, coreScale)
            outerEdges.scale.set(coreScale, coreScale, coreScale)

            // Rotation inverse du gyroscope interne
            innerOcta.rotation.y -= 0.008
            innerOcta.rotation.x += 0.004
            const octaScale = coreScale * (1 + 0.05 * Math.sin(time * 0.003))
            innerOcta.scale.set(octaScale, octaScale, octaScale)

            // Pulsation du cœur lumineux
            coreLight.intensity = (2.8 + 0.8 * Math.sin(time * 0.004)) * introEased

            // Mise à jour des satellites
            const rect = container.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            const nextProjected: ProjectedNode[] = []

            satelliteMeshes.forEach((satItem, idx) => {
                const { config, mesh, lineGeo } = satItem
                if (!prefersReducedMotion) {
                    satItem.currentAngle += config.speed
                }
                const currentAngle = satItem.currentAngle

                // Dispersion spatiale durant l'intro (commence à 2.5x le rayon)
                const dispersion = prefersReducedMotion ? 1 : 2.5 - 1.5 * introEased
                const currentRadius = config.radius * dispersion

                const x = Math.cos(currentAngle) * currentRadius
                const z = Math.sin(currentAngle) * currentRadius
                const y = config.yOffset + Math.sin(time * 0.002 + idx) * 8

                mesh.position.set(x, y, z)

                // Mise à jour des coordonnées du faisceau laser
                const posAttr = lineGeo.attributes.position as THREE.BufferAttribute
                const arr = posAttr.array as Float32Array
                arr[0] = 0
                arr[1] = 0
                arr[2] = 0
                arr[3] = x
                arr[4] = y
                arr[5] = z
                posAttr.needsUpdate = true

                // Calcul de la projection 2D sur l'écran
                mesh.getWorldPosition(tempV)
                tempV.project(camera)

                const screenX = (tempV.x * 0.5 + 0.5) * width
                const screenY = (-tempV.y * 0.5 + 0.5) * height
                const isBehind = tempV.z > 0.8
                const depthScale = Math.max(0.75, Math.min(1.15, 1 - (tempV.z - 0.5) * 0.6))
                const opacity = isBehind ? 0.35 : 0.95

                nextProjected.push({
                    id: config.id,
                    label: config.label,
                    subLabel: config.subLabel,
                    x: screenX,
                    y: screenY,
                    scale: depthScale,
                    opacity: opacity * introEased,
                    zIndex: Math.round((1 - tempV.z) * 100),
                })
            })

            setProjectedNodes(nextProjected)

            // Rotation lente des particules d'ambiance
            particles.rotation.y += 0.0006

            renderer.render(scene, camera)
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        // Nettoyage complet des ressources WebGL selon threejs-performance
        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeRenderer)
            container.removeEventListener('mousedown', onPointerDown)
            window.removeEventListener('mousemove', onPointerMove)
            window.removeEventListener('mouseup', onPointerUp)
            container.removeEventListener('touchstart', onPointerDown)
            window.removeEventListener('touchmove', onPointerMove)
            window.removeEventListener('touchend', onPointerUp)
            if (observer) observer.disconnect()

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

            satelliteMeshes.forEach(({ lineGeo, line, mesh }) => {
                lineGeo.dispose()
                ;(line.material as THREE.Material).dispose()
                ;(mesh.material as THREE.Material).dispose()
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
