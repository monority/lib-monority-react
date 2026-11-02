import { useEffect, useRef, useState } from 'react'
import { useMessages } from '@/shared/i18n'

// Mappage instantané des teintes d'accentuation standard de Monority
const ACCENT_HEX_MAP: Record<string, number> = {
    '290': 0x8b5cf6, // Violet / Iris (défaut)
    '215': 0x06b6d4, // Cyan
    '70': 0xf59e0b, // Amber
    '155': 0x10b981, // Emerald
}

const SIGNATURE_VIOLET = 0x8b5cf6

const LAYER_STAMPS = [
    'mr.utilities',
    'mr.components',
    'mr.themes',
    'mr.tokens',
    'mr.base',
    'mr.reset',
]

let helperCanvas: HTMLCanvasElement | null = null
let helperCtx: CanvasRenderingContext2D | null = null

function resolveCssColor(cssColor: string, defaultHex = SIGNATURE_VIOLET): number {
    if (!cssColor) return defaultHex
    const trimmed = cssColor.trim()

    if (trimmed.startsWith('#')) {
        const parsed = Number.parseInt(trimmed.slice(1), 16)
        if (!Number.isNaN(parsed)) return parsed
    }

    for (const [hue, hex] of Object.entries(ACCENT_HEX_MAP)) {
        if (trimmed.includes(hue)) return hex
    }

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

function hexToRgb(hex: number): { r: number; g: number; b: number } {
    return {
        r: (hex >> 16) & 255,
        g: (hex >> 8) & 255,
        b: hex & 255,
    }
}

export function Home3DMatrix() {
    const messages = useMessages()
    const containerRef = useRef<HTMLElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const isHoveredRef = useRef(false)
    isHoveredRef.current = isHovered

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        let ctx: CanvasRenderingContext2D | null = null
        try {
            ctx = canvas.getContext('2d', { alpha: true })
        } catch {
            return
        }
        if (!ctx) return

        let animationFrameId: number
        let isVisible = true
        let intersectionObs: IntersectionObserver | null = null

        if (typeof IntersectionObserver !== 'undefined') {
            intersectionObs = new IntersectionObserver(
                ([entry]) => {
                    isVisible = entry?.isIntersecting ?? true
                },
                { threshold: 0.05 }
            )
            intersectionObs.observe(container)
        }

        // Configuration de la résolution et Retina Display
        let width = 768
        let height = 440
        let dpr = 1

        const resize = () => {
            const rect = container.getBoundingClientRect()
            width = rect.width || container.clientWidth || 768
            height = rect.height || container.clientHeight || 440
            dpr = Math.min(window.devicePixelRatio || 1, 2.5)

            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
        }
        resize()

        const resizeObs =
            typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => resize()) : null
        if (resizeObs) resizeObs.observe(container)
        window.addEventListener('resize', resize)

        // Gestion de la couleur d'accentuation en temps réel
        const computedStyle = getComputedStyle(container)
        const initialAccentStr = computedStyle.getPropertyValue('--mr-accent-solid').trim()
        let currentAccentHex = resolveCssColor(initialAccentStr, SIGNATURE_VIOLET)
        let lastAccentStr = initialAccentStr

        // Cinématique d'interaction
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const startTime = performance.now()

        let tiltX = 0
        let tiltY = 0
        let targetTiltX = 0
        let targetTiltY = 0
        let bezelAngle = 0
        let dragLastX = 0
        let dragging = false

        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
            dragging = true
            setIsDragging(true)
            dragLastX = clientX
        }

        const onPointerMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
            const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY

            if (dragging) {
                const deltaX = clientX - dragLastX
                dragLastX = clientX
                bezelAngle += deltaX * 0.012
            } else {
                const rect = container.getBoundingClientRect()
                if (rect.width > 0 && rect.height > 0) {
                    const normX = (clientX - rect.left) / rect.width - 0.5
                    const normY = (clientY - rect.top) / rect.height - 0.5
                    targetTiltX = normX * 22
                    targetTiltY = normY * 18
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

        // Boucle de rendu haute précision 60fps / 120fps
        const render = (time: number) => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render)
                return
            }

            // Détection du changement de thème en direct
            const currentAccent = computedStyle.getPropertyValue('--mr-accent-solid').trim()
            if (currentAccent && currentAccent !== lastAccentStr) {
                lastAccentStr = currentAccent
                currentAccentHex = resolveCssColor(currentAccent, SIGNATURE_VIOLET)
            }

            const accentRgb = hexToRgb(currentAccentHex)
            const accentCss = `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`

            // Amortissement de l'inclinaison par ressort
            tiltX += (targetTiltX - tiltX) * 0.08
            tiltY += (targetTiltY - tiltY) * 0.08

            if (!dragging && !prefersReducedMotion) {
                bezelAngle += 0.0018
            }

            const elapsed = time - startTime
            const introDuration = 1200
            const introRaw = prefersReducedMotion ? 1 : Math.min(1, elapsed / introDuration)
            const introEased = 1 - (1 - introRaw) ** 3

            // Initialisation de la surface de dessin Retina
            ctx.save()
            ctx.scale(dpr, dpr)
            ctx.clearRect(0, 0, width, height)

            const cx = width / 2 + tiltX * 0.35
            const cy = height / 2 + tiltY * 0.35
            const dialRadius = Math.min(width * 0.42, 175)

            // 1. Halo volumétrique d'arrière-plan doux
            const haloGrad = ctx.createRadialGradient(
                cx,
                cy,
                dialRadius * 0.35,
                cx,
                cy,
                dialRadius * 1.55
            )
            haloGrad.addColorStop(
                0,
                `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${0.16 * introEased})`
            )
            haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
            ctx.fillStyle = haloGrad
            ctx.beginPath()
            ctx.arc(cx, cy, dialRadius * 1.55, 0, Math.PI * 2)
            ctx.fill()

            // 2. Châssis métallique extérieur et anneaux concentriques
            ctx.save()
            ctx.beginPath()
            ctx.arc(cx, cy, dialRadius + 14, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
            ctx.lineWidth = 1
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(cx, cy, dialRadius + 8, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
            ctx.lineWidth = 1.5
            ctx.stroke()

            // 3. 180 Graduations laser de précision du cadran (Tachymètre télémétrique)
            const tickCount = 180
            for (let i = 0; i < tickCount; i++) {
                const angle = (i * Math.PI * 2) / tickCount + bezelAngle
                const isMajor = i % 30 === 0
                const isMedium = i % 5 === 0 && !isMajor
                const tickLen = isMajor ? 11 : isMedium ? 6.5 : 3.5

                const innerR = dialRadius - tickLen
                const outerR = dialRadius

                const x1 = cx + Math.cos(angle) * innerR
                const y1 = cy + Math.sin(angle) * innerR
                const x2 = cx + Math.cos(angle) * outerR
                const y2 = cy + Math.sin(angle) * outerR

                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)

                if (isMajor) {
                    ctx.strokeStyle = accentCss
                    ctx.lineWidth = 1.8
                } else if (isMedium) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
                    ctx.lineWidth = 1.0
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
                    ctx.lineWidth = 0.65
                }
                ctx.stroke()

                // Numérotation télémétrique cardinale sur les graduations majeures
                if (isMajor && dialRadius > 130) {
                    const labelR = dialRadius - 20
                    const lx = cx + Math.cos(angle) * labelR
                    const ly = cy + Math.sin(angle) * labelR
                    ctx.save()
                    ctx.font = '8px var(--mr-font-family-mono, monospace)'
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    const deg = ((i * 2) % 360).toString().padStart(3, '0')
                    ctx.fillText(`${deg}°`, lx, ly)
                    ctx.restore()
                }
            }
            ctx.restore()

            // 4. Arcs segmentés du spectre OKLCH (Teintes natives Monority avec lueur néon)
            ctx.save()
            ctx.lineWidth = 4.5
            ctx.lineCap = 'round'

            const oklchArcs = [
                { color: 'oklch(0.65 0.24 290)', start: 0.05, end: 0.38 }, // Iris
                { color: 'oklch(0.70 0.18 215)', start: 0.43, end: 0.76 }, // Cyan
                { color: 'oklch(0.68 0.18 155)', start: 0.81, end: 1.14 }, // Emerald
                { color: 'oklch(0.72 0.18 70)', start: 1.19, end: 1.52 }, // Amber
                { color: 'oklch(0.65 0.22 25)', start: 1.57, end: 1.9 }, // Coral / Rose
            ]

            const arcRadius = dialRadius + 1
            oklchArcs.forEach((item) => {
                const sAngle = item.start * Math.PI + bezelAngle * 0.7
                const eAngle = item.end * Math.PI + bezelAngle * 0.7

                ctx.shadowBlur = 8
                ctx.shadowColor = item.color
                ctx.beginPath()
                ctx.arc(cx, cy, arcRadius, sAngle, eAngle)
                ctx.strokeStyle = item.color
                ctx.stroke()
            })
            ctx.restore()

            // 5. Anneau vernier intermédiaire gravé avec les 6 couches CSS @layer
            const layerRingR = dialRadius - 30
            ctx.save()
            ctx.beginPath()
            ctx.arc(cx, cy, layerRingR, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
            ctx.lineWidth = 1
            ctx.stroke()

            // Gravure des noms de couches autour de l'anneau vernier
            if (dialRadius > 140) {
                LAYER_STAMPS.forEach((stamp, sIdx) => {
                    const stampAngle = (sIdx * Math.PI * 2) / 6 + bezelAngle * 0.35
                    const sx = cx + Math.cos(stampAngle) * (layerRingR - 5)
                    const sy = cy + Math.sin(stampAngle) * (layerRingR - 5)

                    ctx.save()
                    ctx.translate(sx, sy)
                    ctx.rotate(stampAngle + Math.PI / 2)
                    ctx.font = '7px var(--mr-font-family-mono, monospace)'
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText(stamp, 0, 0)
                    ctx.restore()
                })
            }
            ctx.restore()

            // 6. Chambre intérieure de l'oscilloscope (Masque circulaire de profondeur)
            const chamberR = dialRadius - 40
            ctx.save()
            ctx.beginPath()
            ctx.arc(cx, cy, chamberR, 0, Math.PI * 2)
            ctx.clip()

            // Fond radial sombre de l'oscilloscope
            const chamberGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, chamberR)
            chamberGrad.addColorStop(
                0,
                `rgba(${Math.round(accentRgb.r * 0.14)}, ${Math.round(accentRgb.g * 0.14)}, ${Math.round(accentRgb.b * 0.22)}, 0.96)`
            )
            chamberGrad.addColorStop(0.72, 'rgba(8, 10, 16, 0.98)')
            chamberGrad.addColorStop(1, 'rgba(4, 5, 8, 1)')
            ctx.fillStyle = chamberGrad
            ctx.fill()

            // Réticule de visée cartésien central fin
            ctx.beginPath()
            ctx.moveTo(cx - chamberR, cy)
            ctx.lineTo(cx + chamberR, cy)
            ctx.moveTo(cx, cy - chamberR)
            ctx.lineTo(cx, cy + chamberR)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
            ctx.lineWidth = 0.8
            ctx.setLineDash([3, 4])
            ctx.stroke()
            ctx.setLineDash([])

            // Cercles de visée concentriques
            ctx.beginPath()
            ctx.arc(cx, cy, chamberR * 0.35, 0, Math.PI * 2)
            ctx.arc(cx, cy, chamberR * 0.7, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
            ctx.lineWidth = 0.8
            ctx.stroke()

            // 7. Matrice dense de scanlines horizontales (Raster oscilloscopique inspiré d'Anime.js)
            const scanlineCount = 38
            const scanlineStep = (chamberR * 2) / (scanlineCount + 1)
            const waveFreq = isHoveredRef.current ? 0.005 : 0.003
            const waveSpeed = time * waveFreq

            for (let k = 1; k <= scanlineCount; k++) {
                const sy = cy - chamberR + k * scanlineStep
                const distFromCenter = Math.abs(sy - cy) / chamberR
                const maxHalfWidth = Math.sqrt(Math.max(0, chamberR * chamberR - (sy - cy) ** 2))

                // Modulation de largeur harmonique multi-fréquences
                const harmonic =
                    Math.sin(waveSpeed + k * 0.32) * 0.55 +
                    Math.cos(waveSpeed * 0.7 + k * 0.18) * 0.45
                const lineWidthFactor = 0.2 + 0.72 * Math.abs(harmonic)
                const currentHalfWidth = maxHalfWidth * lineWidthFactor * introEased

                if (currentHalfWidth > 3) {
                    ctx.beginPath()
                    ctx.moveTo(cx - currentHalfWidth, sy)
                    ctx.lineTo(cx + currentHalfWidth, sy)

                    const lineAlpha = (1 - distFromCenter * 0.4) * (0.22 + 0.6 * Math.abs(harmonic))
                    ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${lineAlpha})`
                    ctx.lineWidth = 1.4
                    ctx.lineCap = 'round'
                    ctx.stroke()
                }
            }

            // 8. Courbe d'interpolation cinématique et traceurs lumineux (Nodes Anime.js)
            const nodeCount = 20
            const curvePoints: { x: number; y: number }[] = []

            for (let j = 0; j < nodeCount; j++) {
                const normX = (j / (nodeCount - 1) - 0.5) * 2 // de -1 à +1
                const px = cx + normX * (chamberR * 0.84)

                // Double harmonique avec amortissement gaussien
                const env = Math.exp(-(normX * normX) * 2.2)
                const waveY =
                    Math.sin(time * 0.0035 + j * 0.42) * 0.7 +
                    Math.cos(time * 0.002 + j * 0.25) * 0.3
                const py = cy + waveY * (chamberR * 0.44) * env

                curvePoints.push({ x: px, y: py })
            }

            // Tracé du faisceau laser connectant les nœuds
            if (curvePoints.length > 1) {
                ctx.beginPath()
                const firstPt = curvePoints[0]
                if (firstPt) ctx.moveTo(firstPt.x, firstPt.y)

                for (let j = 1; j < curvePoints.length; j++) {
                    const pt = curvePoints[j]
                    if (pt) ctx.lineTo(pt.x, pt.y)
                }
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
                ctx.lineWidth = 1.3
                ctx.stroke()
            }

            // Traceurs particulaires brillants le long du faisceau
            curvePoints.forEach((pt, idx) => {
                const pulse = Math.sin(time * 0.005 + idx * 0.55) * 0.5 + 0.5
                const dotR = 2.4 + pulse * 1.6

                // Lueur néon
                const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, dotR * 3)
                glow.addColorStop(0, accentCss)
                glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
                ctx.fillStyle = glow
                ctx.beginPath()
                ctx.arc(pt.x, pt.y, dotR * 3, 0, Math.PI * 2)
                ctx.fill()

                // Cœur blanc éclatant
                ctx.beginPath()
                ctx.arc(pt.x, pt.y, dotR * 0.85, 0, Math.PI * 2)
                ctx.fillStyle = '#ffffff'
                ctx.fill()
            })

            ctx.restore() // Fin du clip de la chambre intérieure

            // 9. Dôme de verre optique et reflets spéculaires caustiques en croissant
            // C'est ce détail précis qui confère le relief 3D saisissant de https://animejs.com/
            ctx.save()
            const glareShiftX = -tiltX * 0.4
            const glareShiftY = -tiltY * 0.4

            // Reflet principal supérieur gauche (Croissant de verre courbé)
            const glassGlareR = chamberR + 2
            const glareGrad = ctx.createLinearGradient(
                cx + glareShiftX - glassGlareR * 0.8,
                cy + glareShiftY - glassGlareR * 0.8,
                cx + glareShiftX,
                cy + glareShiftY
            )
            glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)')
            glareGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.18)')
            glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')

            ctx.beginPath()
            ctx.arc(
                cx + glareShiftX,
                cy + glareShiftY,
                glassGlareR,
                Math.PI * 0.88,
                Math.PI * 1.72,
                false
            )
            ctx.strokeStyle = glareGrad
            ctx.lineWidth = 9
            ctx.lineCap = 'round'
            ctx.stroke()

            // Reflet secondaire rasant inférieur droit
            const subGlareGrad = ctx.createLinearGradient(
                cx + glareShiftX,
                cy + glareShiftY,
                cx + glareShiftX + glassGlareR * 0.7,
                cy + glareShiftY + glassGlareR * 0.7
            )
            subGlareGrad.addColorStop(
                0,
                `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.35)`
            )
            subGlareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

            ctx.beginPath()
            ctx.arc(
                cx + glareShiftX,
                cy + glareShiftY,
                glassGlareR - 1,
                Math.PI * 0.12,
                Math.PI * 0.38,
                false
            )
            ctx.strokeStyle = subGlareGrad
            ctx.lineWidth = 4
            ctx.lineCap = 'round'
            ctx.stroke()

            ctx.restore()

            // 10. Micro-typographie télémétrique discrète sur le cadran
            ctx.save()
            ctx.font = '9px var(--mr-font-family-mono, monospace)'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'

            // Label supérieur
            ctx.textAlign = 'center'
            ctx.fillText('MONORITY UI // TELEMETRY ENGINE', cx, cy - dialRadius - 24 + tiltY * 0.15)

            // Label inférieur centré
            ctx.font = '8px var(--mr-font-family-mono, monospace)'
            ctx.fillText(
                'CSS @LAYER CASCADE // PERCEPTUAL OKLCH',
                cx,
                cy + dialRadius + 26 + tiltY * 0.15
            )

            ctx.restore()
            ctx.restore() // Fin de l'échelle Retina

            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resize)
            container.removeEventListener('mousedown', onPointerDown)
            window.removeEventListener('mousemove', onPointerMove)
            window.removeEventListener('mouseup', onPointerUp)
            container.removeEventListener('touchstart', onPointerDown)
            window.removeEventListener('touchmove', onPointerMove)
            window.removeEventListener('touchend', onPointerUp)
            if (intersectionObs) intersectionObs.disconnect()
            if (resizeObs) resizeObs.disconnect()
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                <span>Interactive Dial •</span>
                <span>Drag to orbit 3D</span>
            </div>

            {/* Texte accessible réservé aux lecteurs d'écran */}
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
