import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

const distPath = new URL('../dist/index.js', import.meta.url)

if (!existsSync(distPath)) {
    test('dist absent', { skip: 'lancer `pnpm build` avant ce test' }, () => {})
} else {
    const { createLogoGeometry } = await import(distPath.href)

    const count = (quality) => createLogoGeometry(quality).getAttribute('position').count

    test('la qualité divise le nombre de points sans toucher au contour', () => {
        // 975 points de contour + 6 000 de surface
        assert.equal(count('high'), 6_975)
        assert.equal(count('medium'), 975 + 3_000)
        assert.equal(count('low'), 975 + 1_500)
    })

    test('la géométrie tient dans la boîte unitaire', () => {
        const geometry = createLogoGeometry('high')
        geometry.computeBoundingSphere()
        const radius = geometry.boundingSphere?.radius ?? 0
        // le logo remplit la boîte unitaire : son rayon est 0,5, pas 0,5√2
        assert.ok(radius > 0.45 && radius < 0.55, `rayon inattendu : ${radius}`)
        assert.ok(geometry.getAttribute('position').count > 0)
    })

    test('les positions sont finies et planes', () => {
        const positions = createLogoGeometry('low').getAttribute('position')
        for (let i = 0; i < positions.count; i++) {
            assert.ok(Number.isFinite(positions.getX(i)))
            assert.ok(Number.isFinite(positions.getY(i)))
            assert.equal(positions.getZ(i), 0)
        }
    })
}
