/**
 * Détection de listes de thèmes, par une règle **structurelle** sur le type des
 * éléments.
 *
 * Une liste de thèmes est un tableau — littéral, ou tableau d'une boucle, d'un
 * `.each`, d'un `for…of` — dont les éléments sont des chaînes littérales égales
 * à des noms de thèmes. Un tableau dont les éléments sont des objets n'en est
 * pas une, quelles que soient ses clés.
 *
 * Deux raisons de faire ainsi.
 *
 * Un scan qui cherche un motif d'écriture (`themes = [`) est aveugle aux autres
 * formes. Le chantier l'a payé : un décompte de « 4 specs e2e portant une liste
 * de thèmes » était faux, parce que quatre fichiers écrivaient cette forme et
 * six autres citaient des thèmes autrement.
 *
 * Un critère sur le *contenu* — « au moins deux noms de thèmes dans un littéral »
 * — confond une liste de thèmes avec un objet de configuration qui porte un
 * thème. C'est ce qu'arrivait sur `design-config.spec.ts`, où un tableau de
 * fixtures contient `theme: 'light'` et `theme: 'night'` dans deux de ses
 * éléments. Le critère sur le type des éléments les exclut sans parser aucune
 * clé.
 */

/** Limite connue, à traiter en 0.15b : un objet indexé par noms de thèmes. */
export const LIMITE_OBJETS_INDEXES =
    'Un objet indexé par noms de thèmes (un Record) n est pas detecte. Hors perimetre assumé : un tel objet est type sur ThemeName, donc le compilateur en impose l exhaustivite.'

const MARQUE = 'mr-theme-subset:'

export { MARQUE }

/**
 * @param {string} source  code à analyser
 * @param {Iterable<string>} noms  noms de thèmes, alias et préférences
 * @returns {{ligne:number, themes:string[], extrait:string}[]}
 */
export function detecterListesDeThemes(source, noms) {
    const connus = new Set(noms)
    const trouves = []
    let dernierFin = -1

    for (const [index, caractere] of [...source].entries()) {
        if (caractere !== '[') continue
        if (index < dernierFin) continue
        const fin = trouverCrochetFermant(source, index)
        if (fin === -1) continue
        dernierFin = fin

        const themes = themesDuTableau(source.slice(index + 1, fin), connus)
        if (themes.length < 2) continue
        if (new Set(themes).size !== themes.length) continue

        trouves.push({
            ligne: source.slice(0, index).split('\n').length,
            themes: [...new Set(themes)].sort(),
            extrait: source
                .slice(index + 1, fin)
                .trim()
                .replace(/\s+/g, ' ')
                .slice(0, 120),
        })
    }

    return trouves
}

/**
 * Noms de thèmes d'un tableau, au sens de la règle structurelle.
 * Accepte un tableau de chaînes, et un tableau de tableaux dont on prend
 * l'union (`.each` avec des paires). Tout autre type d'élément écarte le
 * tableau entier : c'est une table de fixtures, pas une liste de thèmes.
 */
function themesDuTableau(corps, connus) {
    const elements = elementsDePremierNiveau(corps)
    if (elements.length === 0) return []
    const trouves = []
    for (const element of elements) {
        const texte = element.trim()
        if (texte === '') continue
        if (/^['"]/.test(texte)) {
            const nom = texte.match(/^['"]([^'"]+)['"]/)?.[1]
            if (nom === undefined) return []
            if (!connus.has(nom)) return []
            trouves.push(nom)
            continue
        }
        if (texte.startsWith('[')) {
            const imbrique = themesDuTableau(texte.slice(1, texte.lastIndexOf(']')), connus)
            if (imbrique.length === 0) return []
            trouves.push(...imbrique)
            continue
        }
        // Un élément qui n'est pas une chaîne littérale ni un tableau : ce n'est
        // pas une liste de thèmes.
        return []
    }
    return trouves
}

/** Découpe le corps d'un tableau en éléments de premier niveau. */
function elementsDePremierNiveau(corps) {
    const elements = []
    let profondeur = 0
    let courant = ''
    for (let i = 0; i < corps.length; i++) {
        const c = corps[i]
        if (c === "'" || c === '"' || c === '`') {
            const guillemet = c
            courant += c
            i++
            while (i < corps.length && corps[i] !== guillemet) {
                courant += corps[i] === '\\' ? corps[i] + (corps[i + 1] ?? '') : corps[i]
                if (corps[i] === '\\') i++
                i++
            }
            courant += guillemet
            continue
        }
        if (c === '[' || c === '{') profondeur++
        if (c === ']' || c === '}') profondeur--
        if ((c === ',' || c === ';') && profondeur === 0) {
            elements.push(courant)
            courant = ''
            continue
        }
        courant += c
    }
    if (courant.trim() !== '') elements.push(courant)
    return elements
}

/** Position du `]` correspondant, en ignorant chaînes et commentaires. */
function trouverCrochetFermant(source, ouverture) {
    let profondeur = 0
    for (let i = ouverture; i < source.length; i++) {
        const c = source[i]
        if (c === "'" || c === '"' || c === '`') {
            const guillemet = c
            i++
            while (i < source.length && source[i] !== guillemet) {
                if (source[i] === '\\') i++
                i++
            }
            continue
        }
        if (c === '/' && source[i + 1] === '/') {
            while (i < source.length && source[i] !== '\n') i++
            continue
        }
        if (c === '/' && source[i + 1] === '*') {
            i = source.indexOf('*/', i)
            if (i === -1) return -1
            i++
            continue
        }
        if (c === '[') profondeur++
        else if (c === ']') {
            profondeur--
            if (profondeur === 0) return i
        }
    }
    return -1
}

/**
 * Raison déclarée par le commentaire qui précède une liste : il doit porter la
 * marque `mr-theme-subset:`. Le test vérifie la présence de la marque, pas la
 * rédaction de la raison.
 *
 * @returns {string|null}
 */
export function raisonDeclaree(source, ligne) {
    const lignes = source.split('\n')
    let i = ligne - 2
    while (i >= 0 && lignes[i].trim() === '') i--
    while (i >= 0 && (lignes[i].trim().startsWith('//') || lignes[i].trim().startsWith('*'))) {
        if (lignes[i].includes(MARQUE)) return lignes[i].split(MARQUE)[1].trim()
        i--
    }
    return null
}
