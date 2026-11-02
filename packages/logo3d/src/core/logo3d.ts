import * as THREE from 'three'
import { type LogoQuality, createLogoGeometry } from './geometry'

export interface Logo3DOptions {
    /** Densité du nuage : `low` divise les points par 4. */
    quality?: LogoQuality
    /** Couleur des points, par défaut la couleur minérale de la marque. */
    color?: THREE.ColorRepresentation
    /** Taille des points en unités monde — le logo mesure 1 unité. */
    size?: number
    /** Vitesse de la rotation d'attente ; 0 = immobile. */
    speed?: number
    /** Fige la pose : le mouvement réduit passe par ici. */
    paused?: boolean
}

export interface Logo3DHandle {
    /** À ajouter à votre scène. */
    object3D: THREE.Group
    /** Avance l'animation ; sans effet si la pose est figée. */
    update: (dt: number) => void
    setPaused: (paused: boolean) => void
    /** Ajuste la taille des points en unités monde (l'adaptateur la calcule en pixels). */
    setSize: (size: number) => void
    /** Libère géométrie et matériau. */
    dispose: () => void
}

/**
 * Logo Monority en trois dimensions, sans renderer : l'hôte fournit la scène,
 * la caméra et la boucle. C'est ce qui rend le paquet utilisable dans Three.js
 * brut, dans React Three Fiber ou dans n'importe quel moteur.
 */
export function createLogo3D(options: Logo3DOptions = {}): Logo3DHandle {
    const {
        quality = 'high',
        color = '#eae4db',
        size = 0.008,
        speed = 0.6,
        paused = false,
    } = options

    const geometry = createLogoGeometry(quality)
    const material = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    points.frustumCulled = false
    const object3D = new THREE.Group()
    object3D.add(points)

    let elapsed = 0
    let isPaused = paused
    const baseZ = object3D.rotation.z

    return {
        object3D,
        update(dt: number) {
            if (isPaused) return
            elapsed += Math.min(Math.max(dt, 0), 0.1) * speed
            object3D.rotation.y = Math.sin(elapsed * 0.6) * 0.35
            object3D.rotation.x = Math.sin(elapsed * 0.43) * 0.12
            object3D.rotation.z = baseZ
        },
        setSize(next: number) {
            material.size = next
        },
        setPaused(next: boolean) {
            isPaused = next
            if (next) {
                object3D.rotation.set(0, 0, baseZ)
            }
        },
        dispose() {
            geometry.dispose()
            material.dispose()
            object3D.clear()
        },
    }
}
