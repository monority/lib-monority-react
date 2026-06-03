import { useEffect, useRef } from 'react'

const PHI = (1 + Math.sqrt(5)) / 2

type Vertex3 = [number, number, number]

const vertices: Vertex3[] = [
    [-1, PHI, 0],
    [1, PHI, 0],
    [-1, -PHI, 0],
    [1, -PHI, 0],
    [0, -1, PHI],
    [0, 1, PHI],
    [0, -1, -PHI],
    [0, 1, -PHI],
    [PHI, 0, -1],
    [PHI, 0, 1],
    [-PHI, 0, -1],
    [-PHI, 0, 1],
].map(([x, y, z]) => {
    const length = Math.hypot(x, y, z)
    return [x / length, y / length, z / length]
})

const edges: [number, number][] = []

for (let a = 0; a < vertices.length; a += 1) {
    for (let b = a + 1; b < vertices.length; b += 1) {
        const [ax, ay, az] = vertices[a]
        const [bx, by, bz] = vertices[b]
        const distance = Math.hypot(ax - bx, ay - by, az - bz)

        if (distance < 1.08) {
            edges.push([a, b])
        }
    }
}

const edgeKeys = new Set(edges.map(([a, b]) => `${a}:${b}`))
const faces: [number, number, number][] = []

function hasEdge(a: number, b: number) {
    return edgeKeys.has(a < b ? `${a}:${b}` : `${b}:${a}`)
}

for (let a = 0; a < vertices.length; a += 1) {
    for (let b = a + 1; b < vertices.length; b += 1) {
        for (let c = b + 1; c < vertices.length; c += 1) {
            if (hasEdge(a, b) && hasEdge(b, c) && hasEdge(a, c)) {
                faces.push([a, b, c])
            }
        }
    }
}

function rotateVertex([x, y, z]: Vertex3, rotation: Vertex3): Vertex3 {
    const [rx, ry, rz] = rotation
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)
    const cosZ = Math.cos(rz)
    const sinZ = Math.sin(rz)

    const y1 = y * cosX - z * sinX
    const z1 = y * sinX + z * cosX
    const x2 = x * cosY + z1 * sinY
    const z2 = -x * sinY + z1 * cosY
    const x3 = x2 * cosZ - y1 * sinZ
    const y3 = x2 * sinZ + y1 * cosZ

    return [x3, y3, z2]
}

export function PremiumIcosahedron() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const initialRotation: Vertex3 = [-0.48, 0.56, 0.18]
        let frameId = 0
        let start = performance.now()

        const resize = () => {
            const rect = canvas.getBoundingClientRect()
            const ratio = window.devicePixelRatio || 1
            canvas.width = Math.round(rect.width * ratio)
            canvas.height = Math.round(rect.height * ratio)
            context.setTransform(ratio, 0, 0, ratio, 0, 0)
        }

        const draw = (time: number) => {
            const rect = canvas.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            const size = Math.min(width, height) * 0.54
            const elapsed = mediaQuery.matches ? 0 : (time - start) / 1000
            const rotation: Vertex3 = [
                initialRotation[0] + elapsed * 0.16,
                initialRotation[1] + elapsed * 0.11,
                initialRotation[2] + elapsed * 0.08,
            ]

            context.clearRect(0, 0, width, height)

            const projected = vertices.map((vertex) => {
                const [x, y, z] = rotateVertex(vertex, rotation)
                const depth = (z + 1) / 2
                const perspective = 1.9 / (2.7 - z)

                return {
                    x: width / 2 + x * size * perspective,
                    y: height / 2 + y * size * perspective,
                    modelX: x,
                    modelY: y,
                    z,
                    depth,
                    perspective,
                }
            })

            const sortedFaces = [...faces].sort((left, right) => {
                const leftDepth =
                    (projected[left[0]].z + projected[left[1]].z + projected[left[2]].z) / 3
                const rightDepth =
                    (projected[right[0]].z + projected[right[1]].z + projected[right[2]].z) / 3
                return leftDepth - rightDepth
            })

            for (const [first, second, third] of sortedFaces) {
                const a = projected[first]
                const b = projected[second]
                const c = projected[third]
                const depth = (a.depth + b.depth + c.depth) / 3
                const centerX = (a.x + b.x + c.x) / 3
                const centerY = (a.y + b.y + c.y) / 3
                const faceTilt = Math.abs((a.modelX + b.modelY - c.modelX) / 3)
                const alpha = 0.035 + depth * 0.12
                const faceGradient = context.createRadialGradient(
                    centerX - size * 0.08,
                    centerY - size * 0.11,
                    0,
                    centerX,
                    centerY,
                    size * 0.28,
                )

                faceGradient.addColorStop(0, `rgba(215, 252, 255, ${alpha + 0.05 * faceTilt})`)
                faceGradient.addColorStop(0.38, `rgba(92, 194, 239, ${alpha})`)
                faceGradient.addColorStop(1, `rgba(15, 61, 86, ${alpha * 0.42})`)

                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(b.x, b.y)
                context.lineTo(c.x, c.y)
                context.closePath()
                context.fillStyle = faceGradient
                context.fill()

                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(b.x, b.y)
                context.lineTo(c.x, c.y)
                context.closePath()
                context.strokeStyle = `rgba(175, 235, 255, ${0.035 + depth * 0.12})`
                context.lineWidth = 0.32 + depth * 0.28
                context.stroke()

                if (depth > 0.42) {
                    const highlightPoint = [a, b, c].sort((left, right) => right.depth - left.depth)[0]
                    const highlight = context.createLinearGradient(centerX, centerY, highlightPoint.x, highlightPoint.y)
                    highlight.addColorStop(0, `rgba(255, 255, 255, ${0.0})`)
                    highlight.addColorStop(1, `rgba(222, 251, 255, ${0.08 + depth * 0.16})`)

                    context.beginPath()
                    context.moveTo(centerX, centerY)
                    context.lineTo(highlightPoint.x, highlightPoint.y)
                    context.strokeStyle = highlight
                    context.lineWidth = 0.7 + depth * 0.65
                    context.stroke()
                }
            }

            const sortedEdges = [...edges].sort((left, right) => {
                const leftDepth = (projected[left[0]].z + projected[left[1]].z) / 2
                const rightDepth = (projected[right[0]].z + projected[right[1]].z) / 2
                return leftDepth - rightDepth
            })

            context.save()
            context.globalCompositeOperation = 'lighter'

            for (const [from, to] of sortedEdges) {
                const a = projected[from]
                const b = projected[to]
                const depth = (a.depth + b.depth) / 2
                const alpha = 0.055 + depth * 0.14
                const gradient = context.createLinearGradient(a.x, a.y, b.x, b.y)
                gradient.addColorStop(0, `rgba(246, 224, 184, ${alpha * (0.68 + a.depth * 0.32)})`)
                gradient.addColorStop(1, `rgba(255, 246, 219, ${alpha * (0.68 + b.depth * 0.32)})`)

                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(b.x, b.y)
                context.lineWidth = 5.5 + depth * 2.5
                context.strokeStyle = gradient
                context.shadowColor = `rgba(241, 211, 160, ${0.1 + depth * 0.12})`
                context.shadowBlur = 12 + depth * 8
                context.stroke()
            }

            context.restore()

            for (const [from, to] of sortedEdges) {
                const a = projected[from]
                const b = projected[to]
                const depth = (a.depth + b.depth) / 2
                const alpha = 0.15 + depth * 0.48
                const gradient = context.createLinearGradient(a.x, a.y, b.x, b.y)
                gradient.addColorStop(0, `rgba(235, 213, 176, ${alpha * (0.62 + a.depth * 0.38)})`)
                gradient.addColorStop(0.5, `rgba(255, 250, 232, ${alpha})`)
                gradient.addColorStop(1, `rgba(203, 178, 137, ${alpha * (0.62 + b.depth * 0.38)})`)

                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(b.x, b.y)
                context.lineWidth = 0.55 + depth * 0.95
                context.strokeStyle = gradient
                context.lineCap = 'round'
                context.stroke()
            }

            const sortedVertices = [...projected].sort((a, b) => a.z - b.z)

            for (const point of sortedVertices) {
                const radius = 2.4 + point.depth * 5.2
                const gradient = context.createRadialGradient(
                    point.x - radius * 0.24,
                    point.y - radius * 0.28,
                    0,
                    point.x,
                    point.y,
                    radius,
                )
                gradient.addColorStop(0, `rgba(255, 250, 225, ${0.62 + point.depth * 0.34})`)
                gradient.addColorStop(0.28, `rgba(238, 210, 164, ${0.34 + point.depth * 0.34})`)
                gradient.addColorStop(1, 'rgba(238, 210, 164, 0)')

                context.beginPath()
                context.arc(point.x, point.y, radius, 0, Math.PI * 2)
                context.fillStyle = gradient
                context.fill()
            }

            frameId = window.requestAnimationFrame(draw)
        }

        resize()
        frameId = window.requestAnimationFrame(draw)
        window.addEventListener('resize', resize)

        return () => {
            window.cancelAnimationFrame(frameId)
            window.removeEventListener('resize', resize)
            start = 0
        }
    }, [])

    return <canvas ref={canvasRef} className="home-icosahedron" aria-hidden="true" />
}
