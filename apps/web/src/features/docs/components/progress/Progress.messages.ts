import type { DocI18n } from '../doc-messages'

export const progressI18n: DocI18n = {
    fr: {
        description:
            'Indicateur de progression pour les téléversements, migrations et tâches longues avec modes déterminé, indéterminé et stries animées.',
        playgroundLabels: {
            label: 'Libellé accessible',
            value: 'Progression (%)',
            tone: 'Tonalité visuelle',
            mode: 'Mode de progression',
            striped: 'Motif strié (striped)',
            animated: 'Animation continue',
            showValue: 'Afficher le pourcentage',
        },
        examples: [
            { title: 'Flux asynchrone réaliste (Règle d’or)' },
            { title: 'Stries et animation continue' },
            { title: 'Animation cyclique' },
            { title: 'Valeurs et échelons' },
            { title: 'Tonalités' },
            { title: 'Sans affichage de valeur' },
            { title: 'Mode indéterminé' },
        ],
        propDescriptions: {
            value: 'Valeur de progression (0-100).',
            label: 'Libellé accessible.',
            showValue: 'Affiche le texte du pourcentage.',
            tone: 'Tonalité de la barre de progression.',
            mode: 'Mode d’affichage. Le mode indéterminé affiche une barre animée en continu.',
            striped: 'Applique des rayures diagonales discrètes sur la barre.',
            animated: 'Anime continuellement les rayures pour préserver la perception d’activité.',
            barClassName: 'Classe CSS appliquée à l’élément de barre interne.',
        },
        a11y: [
            'La piste expose role="progressbar".',
            'aria-valuenow, aria-valuemin et aria-valuemax sont fournis en mode déterminé.',
            'Le mode indéterminé omet aria-valuenow.',
        ],
    },
}
