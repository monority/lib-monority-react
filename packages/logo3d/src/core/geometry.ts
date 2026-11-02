import * as THREE from 'three'
import { FILL_COUNT, OUTLINE_COUNT, POINTS_BASE64 } from '../data/logo'

export type LogoQuality = 'low' | 'medium' | 'high'

const STRIDE: Record<LogoQuality, number> = { low: 4, medium: 2, high: 1 }

/**
 * Décode les coordonnées embarquées : Int16 little-endian, ramenées dans
 * [-1, 1]. `atob` existe dans les navigateurs et dans Node ≥ 16 : aucune
 * dépendance, aucun parse SVG.
 */
export function decodePoints(base64: string): Float32Array {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const ints = new Int16Array(bytes.buffer)
    const points = new Float32Array(ints.length)
    for (let i = 0; i < ints.length; i++) points[i] = (ints[i] ?? 0) / 32767
    return points
}

/**
 * Construit la géométrie : contour complet, puis un sous-échantillon régulier
 * du remplissage selon la qualité. Le logo tient dans une boîte de 1 unité,
 * centrée sur l'origine, dans le plan z = 0.
 */
export function createLogoGeometry(quality: LogoQuality = 'high'): THREE.BufferGeometry {
    const stride = STRIDE[quality]
    const data = decodePoints(POINTS_BASE64)
    const fillKept = Math.ceil(FILL_COUNT / stride)
    const positions = new Float32Array((OUTLINE_COUNT + fillKept) * 3)

    let o = 0
    for (let i = 0; i < OUTLINE_COUNT; i++) {
        positions[o++] = data[i * 2] ?? 0
        positions[o++] = data[i * 2 + 1] ?? 0
        positions[o++] = 0
    }

    const fillStart = OUTLINE_COUNT * 2
    for (let i = 0; i < FILL_COUNT; i += stride) {
        positions[o++] = data[fillStart + i * 2] ?? 0
        positions[o++] = data[fillStart + i * 2 + 1] ?? 0
        positions[o++] = 0
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions.subarray(0, o), 3))
    geometry.computeBoundingSphere()
    return geometry
}
