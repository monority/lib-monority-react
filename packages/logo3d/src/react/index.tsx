import { type CSSProperties, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { type Logo3DOptions, createLogo3D } from '../core/logo3d'

export interface Logo3DProps extends Logo3DOptions {
    /** `auto` respecte `prefers-reduced-motion` ; `none` fige ; `always` anime. */
    motion?: 'auto' | 'none' | 'always'
    /** Nom accessible. Sans lui, le canvas est purement décoratif. */
    label?: string
    /** Appelé si WebGL est indisponible : l'hôte affiche son propre repli. */
    onUnsupported?: () => void
    className?: string
    style?: CSSProperties
}

/**
 * Logo Monority en 3D, autonome : rendu, caméra, redimensionnement et
 * suspension hors écran sont pris en charge. Pour un rendu intégré à une scène
 * existante, utiliser `createLogo3D` du cœur.
 */
export function Logo3D({
    motion = 'auto',
    label,
    onUnsupported,
    className,
    style,
    quality = 'high',
    color = '#eae4db',
    size = 0.008,
    speed = 0.6,
    paused = false,
}: Logo3DProps) {
    const hostRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const host = hostRef.current
        if (!host) return

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const still = paused || motion === 'none' || (motion === 'auto' && reduce)

        const canvas = document.createElement('canvas')
        // hors flux : un canvas en 100 % de hauteur dans un conteneur en aspect-ratio
        // crée une dépendance circulaire et fausse la mesure du conteneur
        canvas.style.position = 'absolute'
        canvas.style.inset = '0'
        canvas.style.display = 'block'
        canvas.style.inlineSize = '100%'
        canvas.style.blockSize = '100%'
        host.appendChild(canvas)

        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        } catch {
            canvas.remove()
            onUnsupported?.()
            return
        }

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 10)
        const logo = createLogo3D({ quality, color, size, speed, paused: still })
        scene.add(logo.object3D)

        const resize = () => {
            const width = host.clientWidth
            const height = host.clientHeight
            if (!width || !height) return
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            // cadre le logo (1 unité) avec une marge de 35 %
            camera.position.z = (0.5 / Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) * 1.35
            camera.updateProjectionMatrix()
            // ~1,6 px de point quelle que soit la taille affichée : le logo reste lisible à 48 px
            logo.setSize((1.6 * 1.35) / height)
        }

        let raf = 0
        let visible = true
        let last = performance.now()
        const loop = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1)
            last = now
            logo.update(dt)
            renderer.render(scene, camera)
            if (visible) raf = requestAnimationFrame(loop)
        }

        const observer = new ResizeObserver(resize)
        observer.observe(host)
        const io = new IntersectionObserver(([entry]) => {
            const next = entry?.isIntersecting ?? true
            if (next && !visible) {
                visible = true
                last = performance.now()
                raf = requestAnimationFrame(loop)
            } else if (!next) {
                visible = false
                cancelAnimationFrame(raf)
            }
        })
        io.observe(host)
        const onVisibility = () => {
            if (document.hidden) {
                visible = false
                cancelAnimationFrame(raf)
            } else if (!visible) {
                visible = true
                last = performance.now()
                raf = requestAnimationFrame(loop)
            }
        }
        document.addEventListener('visibilitychange', onVisibility)

        resize()
        raf = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(raf)
            observer.disconnect()
            io.disconnect()
            document.removeEventListener('visibilitychange', onVisibility)
            logo.dispose()
            renderer.dispose()
            canvas.remove()
        }
    }, [motion, quality, color, size, speed, paused, onUnsupported])

    return (
        <div
            ref={hostRef}
            className={className}
            style={{ position: 'relative', inlineSize: '100%', blockSize: '100%', ...style }}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        />
    )
}
