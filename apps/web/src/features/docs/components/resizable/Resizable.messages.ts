import type { DocI18n } from '../doc-messages'

export const resizableI18n: DocI18n = {
    fr: {
        description:
            'Panneaux avec poignées de redimensionnement interactives par glisser-déposer, permettant d’ajuster les dimensions horizontales ou verticales.',
        playgroundLabels: {
            direction: 'Orientation',
            withHandle: 'Poignée visuelle (withHandle)',
        },
        examples: [
            { title: 'Panneaux verticaux' },
            { title: 'Avec poignée visuelle (grip)' },
            { title: 'Trois panneaux configurés' },
        ],
        propDescriptions: {
            direction: 'Axe de disposition du groupe de panneaux (horizontal ou vertical).',
            defaultSize: 'Taille initiale du panneau exprimée en pourcentage.',
            minSize: 'Taille minimale du panneau exprimée en pourcentage.',
            maxSize: 'Taille maximale du panneau exprimée en pourcentage.',
            withHandle: 'Affiche une encoche visuelle de préhension sur la poignée.',
        },
        keyboardNavigation: [
            { key: 'Flèche Gauche / Haut', action: 'Diminue la taille du panneau précédent de 1%' },
            { key: 'Flèche Droite / Bas', action: 'Augmente la taille du panneau précédent de 1%' },
            { key: 'Shift + Flèche', action: 'Ajuste la taille par pas de 10%' },
        ],
        a11y: [
            'Les poignées utilisent role="separator" avec un attribut aria-orientation synchronisé.',
            'Les poignées sont focalisables au clavier (tabIndex=0) et répondent aux touches fléchées.',
            'Shift + Touches fléchées redimensionnent par incréments de 10 %, les flèches simples par 1 %.',
            'aria-valuenow reflète le pourcentage de dimension actuel du panneau précédent.',
            'Le glissement désactive la sélection textuelle parasite via la classe mr-resizable--dragging.',
        ],
    },
}
