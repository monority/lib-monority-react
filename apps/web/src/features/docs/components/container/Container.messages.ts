import type { DocI18n } from '../doc-messages'

export const containerI18n: DocI18n = {
    fr: {
        description:
            'Conteneur à largeur maximale contrainte pour centrer et équilibrer le contenu d’une page.',
        playgroundLabels: {
            size: 'Taille maximale (size)',
        },
        examples: [{ title: 'Tailles et gabarits de largeur' }],
        propDescriptions: {
            size: 'Préréglage de largeur maximale du conteneur (sm, md, lg, xl).',
        },
        a11y: [
            'Composant structurel de mise en page sans état interactif direct.',
            'Aucune sémantique ARIA complexe requise par défaut.',
        ],
    },
}
