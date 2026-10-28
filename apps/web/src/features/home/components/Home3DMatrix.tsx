import { useEffect, useRef, useState } from 'react'
import { useMessages } from '@/shared/i18n'

interface Point3D {
    x: number
    y: number
    z: number
}

interface OrbitalNode {
    id: string
    label: string
    subLabel: string
    angle: number
    speed: number
    radius: number
    yOffset: number
}

const NODES_CONFIG: OrbitalNode[] = [
    {
        id: 'react',
        label: 'React 19',
        subLabel: 'Native ref',
        angle: 0,
        speed: 0.006,
        radius: 190,
        yOffset: -20,
    },
    {
        id: 'ts',
        label: 'TypeScript',
        subLabel: 'Strict types',
        angle: (Math.PI * 1) / 3,
        speed: 0.006,
        radius: 195,
        yOffset: 25,
    },
    {
        id: 'layer',
        label: 'CSS @layer',
        subLabel: 'Isolation',
        angle: (Math.PI * 2) / 3,
        speed: 0.006,
        radius: 185,
        yOffset: -30,
    },
    {
        id: 'oklch',
        label: 'OKLCH',
        subLabel: 'Runtime theme',
        angle: Math.PI,
        speed: 0.006,
        radius: 190,
        yOffset: 15,
    },
    {
        id: 'next',
        label: 'Next.js',
        subLabel: 'App Router',
        angle: (Math.PI * 4) / 3,
        speed: 0.006,
        radius: 200,
        yOffset: -15,
    },
    {
        id: 'vite',
        label: 'Vite',
        subLabel: 'Instant HMR',
        angle: (Math.PI * 5) / 3,
        speed: 0.006,
        radius: 185,
        yOffset: 30,
    },
]

// Sommets d'un cube central modulaire (taille 65)
const CUBE_SIZE = 65
const CUBE_VERTICES: Point3D[] = [
    { x: -CUBE_SIZE, y: -CUBE_SIZE, z: -CUBE_SIZE },
    { x: CUBE_SIZE, y: -CUBE_SIZE, z: -CUBE_SIZE },
    { x: CUBE_SIZE, y: CUBE_SIZE, z: -CUBE_SIZE },
    { x: -CUBE_SIZE, y: CUBE_SIZE, z: -CUBE_SIZE },
    { x: -CUBE_SIZE, y: -CUBE_SIZE, z: CUBE_SIZE },
    { x: CUBE_SIZE, y: -CUBE_SIZE, z: CUBE_SIZE },
    { x: CUBE_SIZE, y: CUBE_SIZE, z: CUBE_SIZE },
    { x: -CUBE_SIZE, y: CUBE_SIZE, z: CUBE_SIZE },
]

// Arêtes reliant les sommets du cube
const CUBE_EDGES: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0], // face arrière
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4], // face avant
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7], // arêtes longitudinales
]

// Sommets d'un octaèdre interne (noyau de tokens)
const OCTA_SIZE = 38
const OCTA_VERTICES: Point3D[] = [
    { x: 0, y: -OCTA_SIZE * 1.3, z: 0 },
    { x: 0, y: OCTA_SIZE * 1.3, z: 0 },
    { x: -OCTA_SIZE, y: 0, z: 0 },
    { x: OCTA_SIZE, y: 0, z: 0 },
    { x: 0, y: 0, z: -OCTA_SIZE },
    { x: 0, y: 0, z: OCTA_SIZE },
]

const OCTA_EDGES: [number, number][] = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [4, 3],
    [3, 5],
    [5, 2],
]

function rotateX(point: Point3D, angle: number): Point3D {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
    }
}

function rotateY(point: Point3D, angle: number): Point3D {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
    }
}

function project(
    point: Point3D,
    width: number,
    height: number,
    focal = 440
): { x: number; y: number; scale: number; z: number } {
    const scale = focal / (focal + point.z + 120)
    return {
        x: width / 2 + point.x * scale,
        y: height / 2 + point.y * scale,
        scale,
        z: point.z,
    }
}

export function Home3DMatrix() {
    const messages = useMessages().home.hero
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    // États de rotation
    const rotationRef = useRef({
        rotX: -0.25,
        rotY: 0.45,
        targetRotX: -0.25,
        targetRotY: 0.45,
        velX: 0,
        velY: 0.003,
        lastMouseX: 0,
        lastMouseY: 0,
        isDragging: false,
    })

    const orbitalAngleRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        let animationFrameId: number
        let isVisible = true

        // Respect de prefers-reduced-motion
        const prefersReducedMotion =
            typeof window !== 'undefined' && typeof window.matchMedia === 'function'
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false

        // Observer d'intersection pour suspendre le CPU hors viewport
        let observer: IntersectionObserver | null = null
        if (typeof IntersectionObserver !== 'undefined') {
            observer = new IntersectionObserver(
                ([entry]) => {
                    isVisible = entry?.isIntersecting ?? true
                },
                { threshold: 0.05 }
            )
            observer.observe(canvas)
        }

        const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)

        const resizeCanvas = () => {
            try {
                const rect = container.getBoundingClientRect()
                const dpr = Math.min(window.devicePixelRatio || 1, 2)
                canvas.width = rect.width * dpr
                canvas.height = rect.height * dpr
                canvas.style.width = `${rect.width}px`
                canvas.style.height = `${rect.height}px`
                if (!isJsdom) {
                    const ctx = canvas.getContext?.('2d')
                    if (ctx) {
                        ctx.scale(dpr, dpr)
                    }
                }
            } catch {
                /* jsdom fallback */
            }
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const render = () => {
            if (!isVisible || isJsdom) {
                animationFrameId = requestAnimationFrame(render)
                return
            }

            let ctx: CanvasRenderingContext2D | null = null
            try {
                ctx = canvas.getContext?.('2d') ?? null
            } catch {
                /* jsdom fallback */
            }
            if (!ctx) return

            const rect = container.getBoundingClientRect()
            const width = rect.width
            const height = rect.height

            // Lecture des tokens de style dynamiques
            const computedStyle = getComputedStyle(canvas)
            const accentColor =
                computedStyle.getPropertyValue('--mr-accent-solid').trim() || '#8b5cf6'
            const textColor =
                computedStyle.getPropertyValue('--mr-text-primary').trim() || '#f8fafc'
            const textMuted = computedStyle.getPropertyValue('--mr-text-muted').trim() || '#94a3b8'
            const borderSubtle =
                computedStyle.getPropertyValue('--mr-border-subtle').trim() ||
                'rgba(255,255,255,0.08)'

            ctx.clearRect(0, 0, width, height)

            // Dégradé radial d'arrière-plan discret
            const radialGlow = ctx.createRadialGradient(
                width / 2,
                height / 2,
                20,
                width / 2,
                height / 2,
                width * 0.45
            )
            radialGlow.addColorStop(0, 'rgba(139, 92, 246, 0.12)')
            radialGlow.addColorStop(0.6, 'rgba(139, 92, 246, 0.02)')
            radialGlow.addColorStop(1, 'transparent')
            ctx.fillStyle = radialGlow
            ctx.fillRect(0, 0, width, height)

            const state = rotationRef.current

            // Mise à jour de la physique de rotation
            if (!prefersReducedMotion) {
                if (!state.isDragging) {
                    state.targetRotY += state.velY
                }
                // Amortissement LERP
                state.rotX += (state.targetRotX - state.rotX) * 0.08
                state.rotY += (state.targetRotY - state.rotY) * 0.08
                orbitalAngleRef.current += 0.005
            }

            const curRotX = state.rotX
            const curRotY = state.rotY

            // 1. Transformation du cube central
            const transCube = CUBE_VERTICES.map((v) => {
                const r = rotateX(rotateY(v, curRotY), curRotX)
                return project(r, width, height)
            })

            // 2. Transformation de l'octaèdre interne (pulsation douce)
            const pulse = 1 + Math.sin(orbitalAngleRef.current * 2) * 0.08
            const transOcta = OCTA_VERTICES.map((v) => {
                const scaled = { x: v.x * pulse, y: v.y * pulse, z: v.z * pulse }
                const r = rotateX(rotateY(scaled, -curRotY * 1.5), -curRotX * 1.5)
                return project(r, width, height)
            })

            // 3. Transformation des nœuds satellites orbitaux
            const transNodes = NODES_CONFIG.map((node, i) => {
                const totalAngle = node.angle + orbitalAngleRef.current
                const orbitPoint: Point3D = {
                    x: Math.cos(totalAngle) * node.radius,
                    y: node.yOffset + Math.sin(totalAngle * 2) * 15,
                    z: Math.sin(totalAngle) * (node.radius * 0.85),
                }
                const r = rotateX(rotateY(orbitPoint, curRotY * 0.3), curRotX * 0.3)
                const proj = project(r, width, height)
                return {
                    node,
                    index: i,
                    proj,
                    z: r.z,
                }
            })

            // 4. Tri par profondeur pour Z-sorting
            transNodes.sort((a, b) => a.z - b.z)

            // 5. Rendu des rayons laser de connexion (vers les nœuds à l'arrière)
            transNodes.forEach((item) => {
                if (item.z < 0) {
                    drawLaser(
                        ctx,
                        width / 2,
                        height / 2,
                        item.proj.x,
                        item.proj.y,
                        item.proj.scale,
                        accentColor,
                        false
                    )
                }
            })

            // 6. Rendu des arêtes de l'octaèdre interne
            ctx.save()
            ctx.strokeStyle = accentColor
            ctx.lineWidth = 1.2
            ctx.globalAlpha = 0.55
            OCTA_EDGES.forEach(([i, j]) => {
                const p1 = transOcta[i]!
                const p2 = transOcta[j]!
                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.stroke()
            })
            ctx.restore()

            // 7. Rendu des faces semi-transparentes du cube central
            drawCubeFacets(ctx, transCube, accentColor)

            // 8. Rendu des arêtes du cube central
            ctx.save()
            ctx.strokeStyle = accentColor
            ctx.lineWidth = 1.6
            ctx.globalAlpha = 0.85
            CUBE_EDGES.forEach(([i, j]) => {
                const p1 = transCube[i]!
                const p2 = transCube[j]!
                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.stroke()
            })

            // 9. Rendu des sommets brillants du cube
            transCube.forEach((p) => {
                ctx.fillStyle = '#ffffff'
                ctx.beginPath()
                ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2)
                ctx.fill()
            })
            ctx.restore()

            // 10. Rendu des rayons laser (vers les nœuds à l'avant)
            transNodes.forEach((item) => {
                if (item.z >= 0) {
                    drawLaser(
                        ctx,
                        width / 2,
                        height / 2,
                        item.proj.x,
                        item.proj.y,
                        item.proj.scale,
                        accentColor,
                        true
                    )
                }
            })

            // 11. Rendu des badges de nœuds orbitaux
            transNodes.forEach((item) => {
                drawNodeBadge(
                    ctx,
                    item.proj.x,
                    item.proj.y,
                    item.proj.scale,
                    item.node.label,
                    item.node.subLabel,
                    accentColor,
                    textColor,
                    textMuted,
                    borderSubtle
                )
            })

            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
            observer?.disconnect()
        }
    }, [])

    // Gestion du glisser-déposer pour la rotation 3D
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        rotationRef.current.isDragging = true
        rotationRef.current.lastMouseX = e.clientX
        rotationRef.current.lastMouseY = e.clientY
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const state = rotationRef.current
        if (state.isDragging) {
            const dx = e.clientX - state.lastMouseX
            const dy = e.clientY - state.lastMouseY
            state.targetRotY += dx * 0.007
            state.targetRotX += dy * 0.007
            state.lastMouseX = e.clientX
            state.lastMouseY = e.clientY
        } else if (containerRef.current) {
            // Parallaxe subtile au survol
            const rect = containerRef.current.getBoundingClientRect()
            const nx = (e.clientX - rect.left) / rect.width - 0.5
            const ny = (e.clientY - rect.top) / rect.height - 0.5
            state.targetRotX = -0.25 + ny * 0.35
            state.targetRotY += nx * 0.003
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        rotationRef.current.isDragging = false
    }

    return (
        <figure
            ref={containerRef}
            aria-label={
                messages.matrixAriaLabel ||
                '3D Development Matrix showing Monority UI connected with React 19, TypeScript, CSS @layer, OKLCH, Vite, and Next.js'
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
                handleMouseUp()
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '46rem',
                height: '420px',
                marginInline: 'auto',
                marginBlock: 'var(--mr-space-4) var(--mr-space-2)',
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

function drawLaser(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    scale: number,
    color: string,
    isFront: boolean
) {
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = isFront ? 1.4 : 0.8
    ctx.globalAlpha = Math.max(0.15, Math.min(0.65, 0.45 * scale))
    ctx.setLineDash([4, 6])
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.restore()
}

function drawCubeFacets(
    ctx: CanvasRenderingContext2D,
    pts: { x: number; y: number; scale: number }[],
    accentColor: string
) {
    ctx.save()
    ctx.fillStyle = accentColor
    ctx.globalAlpha = 0.05

    // Face supérieure (0, 1, 5, 4)
    if (pts[0] && pts[1] && pts[5] && pts[4]) {
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        ctx.lineTo(pts[1].x, pts[1].y)
        ctx.lineTo(pts[5].x, pts[5].y)
        ctx.lineTo(pts[4].x, pts[4].y)
        ctx.closePath()
        ctx.fill()
    }

    // Face avant (4, 5, 6, 7)
    if (pts[4] && pts[5] && pts[6] && pts[7]) {
        ctx.beginPath()
        ctx.moveTo(pts[4].x, pts[4].y)
        ctx.lineTo(pts[5].x, pts[5].y)
        ctx.lineTo(pts[6].x, pts[6].y)
        ctx.lineTo(pts[7].x, pts[7].y)
        ctx.closePath()
        ctx.fill()
    }
    ctx.restore()
}

function drawNodeBadge(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number,
    label: string,
    subLabel: string,
    accentColor: string,
    textColor: string,
    textMuted: string,
    borderSubtle: string
) {
    ctx.save()

    const s = Math.max(0.7, Math.min(1.2, scale))
    const padX = 10 * s
    const padY = 5 * s
    const radius = 6 * s

    ctx.font = `600 ${Math.round(11 * s)}px system-ui, -apple-system, sans-serif`
    const labelMetrics = ctx.measureText(label)
    const labelW = labelMetrics.width

    ctx.font = `400 ${Math.round(9 * s)}px system-ui, -apple-system, sans-serif`
    const subMetrics = ctx.measureText(subLabel)
    const subW = subMetrics.width

    const totalW = Math.max(labelW, subW) + padX * 2
    const totalH = 34 * s

    const boxX = x - totalW / 2
    const boxY = y - totalH / 2

    // Fond du badge (sombre / flouté)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)'
    ctx.strokeStyle = scale > 1 ? accentColor : borderSubtle
    ctx.lineWidth = scale > 1 ? 1.5 : 1

    ctx.beginPath()
    if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(boxX, boxY, totalW, totalH, radius)
    } else {
        ctx.rect(boxX, boxY, totalW, totalH)
    }
    ctx.fill()
    ctx.stroke()

    // Petit point indicateur actif
    ctx.fillStyle = accentColor
    ctx.beginPath()
    ctx.arc(boxX + 9 * s, boxY + 11 * s, 2.5 * s, 0, Math.PI * 2)
    ctx.fill()

    // Texte principal (label)
    ctx.fillStyle = textColor
    ctx.font = `600 ${Math.round(11 * s)}px system-ui, -apple-system, sans-serif`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, boxX + 16 * s, boxY + 11 * s)

    // Sous-titre descriptif
    ctx.fillStyle = textMuted
    ctx.font = `400 ${Math.round(9 * s)}px system-ui, -apple-system, sans-serif`
    ctx.fillText(subLabel, boxX + 16 * s, boxY + 23 * s)

    ctx.restore()
}
