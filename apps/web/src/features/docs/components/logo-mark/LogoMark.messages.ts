import type { DocI18n } from '../doc-messages'

export const logoMarkI18n: DocI18n = {
    fr: {
        description:
            'La marque Monority : un nœud à trois rubans, tracé unique figé. La géométrie ne bouge jamais, seule la couleur change.',
        playgroundLabels: {
            size: 'Taille en pixels',
            variant: 'Variante de couleur',
        },
        examples: [
            { title: 'Couleur du texte (par défaut)' },
            { title: 'Sur fond sombre (on-dark)' },
            { title: 'Sur fond clair (on-light)' },
            { title: 'Ambre sur fond sombre' },
            { title: 'Tailles d’usage' },
        ],
        propDescriptions: {
            variant:
                'Couleur de la marque. `current` suit le texte ; `dark` et `amber` sont faits pour un fond sombre ; `light` pour un fond clair.',
            label: 'Nom accessible. Sans lui, la marque est décorative.',
            size: 'Largeur et hauteur en pixels.',
        },
        a11y: [
            'Décorative par défaut : elle ne répète pas un texte déjà présent.',
            'Fournissez un `label` quand la marque porte seule le sens.',
        ],
    },
}
