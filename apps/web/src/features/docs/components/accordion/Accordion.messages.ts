import type { DocI18n } from '../doc-messages'

export const accordionI18n: DocI18n = {
    fr: {
        description:
            'Sections extensibles groupées pour les FAQ, notes de version et contenus secondaires denses.',
        playgroundLabels: {
            apiMode: "Mode d'API",
            size: 'Taille',
            activeItem: 'Section ouverte',
            collapsible: 'Repliable',
            allowMultiple: 'Multi-sections',
        },
        examples: [
            { title: 'Syntaxe composée (Compound)' },
            { title: 'Avec la prop items' },
            { title: 'Plusieurs sections ouvertes' },
            { title: 'Repliable (fermeture autorisée)' },
        ],
        propDescriptions: {
            items: 'Sections de l’accordéon. Chaque élément accepte un indicateur disabled.',
            defaultValue: 'Valeur(s) développée(s) par défaut.',
            value: 'Valeur(s) développée(s) en mode contrôlé.',
            onChange: 'Rappel déclenché lors du changement d’ouverture.',
            allowMultiple: 'Autorise l’ouverture simultanée de plusieurs sections.',
            collapsible: 'Autorise la fermeture de la section active.',
            size: 'Densité et taille de l’accordéon.',
        },
        keyboardNavigation: [
            {
                key: 'Enter / Espace',
                action: 'Développe ou réduit la section ciblée.',
                context: 'Focus sur l’en-tête de section',
            },
            {
                key: 'Flèche Bas',
                action: 'Déplace le focus vers l’en-tête suivant (avec bouclage).',
                context: 'Focus sur l’en-tête de section',
            },
            {
                key: 'Flèche Haut',
                action: 'Déplace le focus vers l’en-tête précédent (avec bouclage).',
                context: 'Focus sur l’en-tête de section',
            },
            {
                key: 'Origine (Home)',
                action: 'Déplace le focus vers le premier en-tête.',
                context: 'Focus sur l’en-tête de section',
            },
            {
                key: 'Fin (End)',
                action: 'Déplace le focus vers le dernier en-tête.',
                context: 'Focus sur l’en-tête de section',
            },
        ],
        a11y: [
            'Chaque déclencheur expose les attributs aria-expanded et aria-controls.',
            'Chaque panneau est étiqueté par son déclencheur via aria-labelledby.',
            'Les boutons d’en-tête restent accessibles au clavier via Entrée et Espace.',
            'Les déclencheurs utilisent un roving tabindex pour une navigation optimale.',
            'Flèche Haut / Bas naviguent entre les déclencheurs avec bouclage cyclique ; Début / Fin accèdent au premier et au dernier.',
            'Les éléments désactivés sont ignorés par le focus clavier et ne peuvent être activés.',
            'L’animation fluide repose sur CSS Grid (grid-template-rows: 0fr -> 1fr) avec hauteur résiduelle nulle une fois fermé.',
        ],
    },
}
