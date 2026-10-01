/**
 * Étape 0.13 — parité des thèmes.
 *
 * Trois listes doivent décrire le même ensemble, sinon le pipeline perd des
 * tokens en silence. C'est ce qui est arrivé avec `slate.json` : le fichier
 * existe, il est suivi par git, il matche le glob `src/themes/*.json`, et il
 * n'était jamais émis parce que le générateur portait une liste en dur.
 *
 * Ce test échoue si l'une des trois dérive. Il est volontairement rouge en
 * l'état : c'est la preuve que la porte détecte quelque chose.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { THEMES } from './lib/tokens-lib.mjs'
import { ALIASES } from './lib/themes.mjs'
import { MARQUE, detecterListesDeThemes, raisonDeclaree } from './lib/detecter-listes-themes.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '../../..')
const themesDir = path.join(repoRoot, 'packages/tokens/src/themes')
const generatedCss = path.join(repoRoot, 'packages/styles/src/tokens/generated/tokens.css')

/** Noms de thèmes déduits des noms de fichiers, triés pour un ordre déterministe. */
function themesOnDisk() {
    return fs
        .readdirSync(themesDir)
        .filter((f) => f.endsWith('.json'))
        .map((f) => path.basename(f, '.json'))
        .sort()
}

/** Clés déclarées dans chaque fichier de thème, sans le préfixe `theme-`. */
function declaredScope(file) {
    const raw = JSON.parse(fs.readFileSync(path.join(themesDir, file), 'utf8'))
    return Object.keys(raw.mr ?? {})
}

test('les noms de fichiers de thème sont valides', () => {
    for (const name of themesOnDisk()) {
        assert.match(
            name,
            /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
            `nom de thème non conforme : ${name}. Attendu : minuscules, chiffres, tirets.`
        )
    }
})

test('chaque fichier déclare une portée unique et conforme', () => {
    for (const file of fs.readdirSync(themesDir).filter((f) => f.endsWith('.json'))) {
        const scopes = declaredScope(file)
        if (scopes.length === 0) {
            // Table rase : le fichier est un coquille vide. Il n'y a rien à
            // vérifier tant qu'il ne contient pas de token.
            continue
        }
        assert.equal(
            scopes.length,
            1,
            `${file} doit déclarer exactement une portée, trouvé ${scopes.length} : ${scopes.join(', ')}`
        )
        const scope = scopes[0]
        assert.equal(
            scope,
            `theme-${path.basename(file, '.json')}`,
            `${file} déclare la portée « ${scope} » mais le nom de fichier impose « theme-${path.basename(file, '.json')} »`
        )
    }
})

test('PARITÉ : fichiers sur disque = thèmes enregistrés = thèmes émis', () => {
    const disk = themesOnDisk()
    const registered = [...THEMES].sort()

    assert.deepEqual(
        registered,
        disk,
        `THEMES (tokens-lib.mjs) ne couvre pas les fichiers du disque.\n` +
            `  fichiers   : ${disk.join(', ')}\n` +
            `  enregistrés : ${registered.join(', ')}`
    )

    if (!fs.existsSync(generatedCss)) {
        // Avant le premier build, l'émission ne peut pas être vérifiée.
        return
    }
    const css = fs.readFileSync(generatedCss, 'utf8')
    for (const name of disk) {
        assert.ok(
            css.includes(`[data-theme="${name}"]`),
            `le thème « ${name} » est sur disque et enregistré mais absent du CSS généré`
        )
    }
})

test('aucun thème n est déclaré deux fois', () => {
    const disk = themesOnDisk()
    assert.equal(new Set(disk).size, disk.length)
})

/**
 * Étape 0.15 (D22) — parité des listes de thèmes écrites à la main.
 *
 * Le test ci-dessus compare trois listes maintenues par le build. Celui-ci
 * compare les listes **écrites dans le code applicatif**, qu'aucun test ne
 * surveillait. C'est la même cause que `slate` : une liste recopiée à la main,
 * jamais mise à jour.
 *
 * Une liste détectée est soit exhaustive, soit annotée `mr-theme-subset:` avec
 * une raison. Le message d'échec nomme le thème manquant et le fichier fautif.
 * Un alias n'est jamais compté comme thème manquant : `dim` rend `dark`.
 */
test('toute liste de thèmes e2e est exhaustive ou annotee', () => {
    const disque = themesOnDisk()
    const alias = Object.keys(ALIASES)
    const connus = [...disque, ...alias, 'system']
    const repertoire = path.join(repoRoot, 'apps/web/e2e')

    const ecarts = []
    let detectees = 0

    for (const fichier of fs.readdirSync(repertoire).filter((f) => f.endsWith('.ts'))) {
        const source = fs.readFileSync(path.join(repertoire, fichier), 'utf8')
        for (const liste of detecterListesDeThemes(source, connus)) {
            detectees++
            const themes = liste.themes.filter((t) => !alias.includes(t))
            const manquants = disque.filter((t) => !themes.includes(t))
            const raison = raisonDeclaree(source, liste.ligne)

            if (manquants.length === 0) continue
            if (raison) continue

            ecarts.push(
                `${fichier}:${liste.ligne} — thèmes manquants : ${manquants.join(', ')}` +
                    ` (trouvés : ${themes.join(', ')}). Ajouter la marque « ${MARQUE} »` +
                    ` avec la raison, ou compléter la liste.`
            )
        }
    }

    assert.deepEqual(ecarts, [], `listes de thèmes non couvertes :\n  ${ecarts.join('\n  ')}`)
    // Garde-fou : si le détecteur cessait de trouver quoi que ce soit, le test
    // passerait au vert sans rien vérifier. Ce seuil le prouve.
    assert.ok(
        detectees >= 5,
        `le détecteur n'a trouvé que ${detectees} liste(s) : il a probablement cessé de fonctionner`
    )
})

test('aucune liste e2e ne cite un thème absent du disque ni un alias non declare', () => {
    const disque = themesOnDisk()
    const connus = [...disque, ...Object.keys(ALIASES), 'system']
    const repertoire = path.join(repoRoot, 'apps/web/e2e')

    for (const fichier of fs.readdirSync(repertoire).filter((f) => f.endsWith('.ts'))) {
        const source = fs.readFileSync(path.join(repertoire, fichier), 'utf8')
        for (const liste of detecterListesDeThemes(source, connus)) {
            for (const nom of liste.themes) {
                assert.ok(
                    connus.includes(nom),
                    `${fichier}:${liste.ligne} — « ${nom} » n'est ni un thème du disque, ni un alias, ni system`
                )
            }
        }
    }
})

test('le détecteur distingue bien une liste de thèmes d une table de fixtures', () => {
    const connus = [...themesOnDisk(), ...Object.keys(ALIASES), 'system']
    const fixtures = `const presets = [
        { theme: 'light', accent: 'violet' },
        { theme: 'night', accent: 'blue' },
    ]`
    assert.deepEqual(
        detecterListesDeThemes(fixtures, connus),
        [],
        'un tableau dont les éléments sont des objets n est pas une liste de thèmes'
    )
    const liste = `const themes = ['light', 'dark', 'slate']`
    assert.equal(detecterListesDeThemes(liste, connus).length, 1)
})
