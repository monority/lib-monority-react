import type { DocI18n } from '../doc-messages'

export const preCodeI18n: DocI18n = {
    fr: {
        description:
            'Bloc de code préformaté avec défilement horizontal, retour à la ligne facultatif et coloration syntaxique lisible adaptée aux thèmes.',
        playgroundLabels: {
            size: 'Taille (size)',
            wrap: 'Retour à la ligne (wrap)',
        },
        examples: [
            { title: 'Tailles (sm, md)' },
            { title: 'Défilement horizontal' },
            { title: 'Retour automatique à la ligne' },
        ],
        propDescriptions: {
            children: 'Contenu textuel du code.',
            language:
                'Indicateur de langage, injecté sous forme de classe language-* sur l’élément <code>.',
            size: 'Taille du bloc de code.',
            wrap: 'Active le retour à la ligne automatique plutôt que le défilement horizontal.',
            codeClassName: 'Classe CSS additionnelle pour l’élément <code> interne.',
        },
        a11y: [
            'Rend la structure HTML sémantique native <pre><code>.',
            'Le mode par défaut fait défiler les lignes longues horizontalement sans déformer la largeur de la page.',
            'Utilisez l’option wrap lorsque le retour à la ligne est préférable.',
        ],
    },
}
