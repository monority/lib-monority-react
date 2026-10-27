import type { DocI18n } from '../doc-messages'

export const copyButtonI18n: DocI18n = {
    fr: {
        description:
            'Bouton d’action dédié à la copie de texte dans le presse-papiers avec un retour visuel accessible.',
        playgroundLabels: {
            variant: 'Variante',
            size: 'Taille',
            label: 'Libellé',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Variantes' },
            { title: 'Tailles' },
            { title: 'Retour personnalisé' },
            { title: 'Désactivé' },
        ],
        propDescriptions: {
            value: 'Texte copié dans le presse-papiers lors du clic.',
            label: 'Libellé initial affiché sur le bouton.',
            copiedLabel: 'Libellé affiché temporairement après la copie.',
            duration: 'Durée en millisecondes de l’état copié.',
            variant: 'Variante de présentation visuelle.',
            size: 'Densité de taille du bouton.',
            disabled: 'Désactive les interactions avec le bouton.',
        },
        keyboardNavigation: [
            { key: 'Entrée', action: 'Copie la valeur dans le presse-papiers.' },
            { key: 'Espace', action: 'Copie la valeur dans le presse-papiers.' },
            { key: 'Tab', action: 'Déplace le focus sur le bouton.' },
        ],
        a11y: [
            'Élément bouton natif avec activation au clavier (Espace et Entrée).',
            'Texte de retour explicite lors de la copie réussie.',
            'Indicateurs de focus accessibles via :focus-visible.',
        ],
    },
}
