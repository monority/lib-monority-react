import type { DocI18n } from '../doc-messages'

export const textI18n: DocI18n = {
    fr: {
        description:
            'Composant textuel polymorphique avec variantes de nuance et de taille. À combiner avec Title pour des compositions typographiques riches.',
        playgroundLabels: {
            size: 'Taille (size)',
            tone: 'Nuance (tone)',
            as: 'Élément HTML (as)',
            content: 'Contenu textuel',
        },
        examples: [
            { title: 'Tailles (sm, md, lg)' },
            { title: 'Nuances et emphase' },
            { title: 'Prop polymorphique (as)' },
        ],
        propDescriptions: {
            as: 'Élément HTML rendu de manière polymorphique.',
            tone: 'Nuance et niveau d’emphase du texte.',
            size: 'Échelle de taille typographique.',
            children: 'Contenu textuel.',
        },
        a11y: [
            'Privilégiez des textes concis et bien hiérarchisés.',
            'Les variantes de nuance s’appuient sur la couleur : évitez de transmettre un sens critique uniquement par la nuance chromatique.',
        ],
    },
}
