import type { DocI18n } from '../doc-messages'

export const colorSwatchI18n: DocI18n = {
    fr: {
        description:
            'Aperçu visuel d’un token de couleur, niveau de thème ou code hexadécimal avec libellé et valeur textuelle facultatifs.',
        playgroundLabels: {
            colorType: 'Teinte',
            size: 'Taille',
            shape: 'Forme (shape)',
            showValue: 'Afficher la valeur brute',
        },
        examples: [
            { title: 'Tailles' },
            { title: 'Formes géométriques' },
            { title: 'Avec valeurs textuelles' },
        ],
        propDescriptions: {
            value: 'Valeur chromatique (hex, rgb, hsl ou variable CSS).',
            label: 'Libellé d’accompagnement affiché à côté de la pastille.',
            showValue: 'Affiche la valeur textuelle brute de la couleur.',
            size: 'Taille de l’échantillon de couleur.',
            shape: 'Forme géométrique et rayon de courbure de la pastille.',
        },
        a11y: [
            'L’élément d’aperçu porte aria-hidden="true" lorsqu’il est accompagné d’un texte visible.',
            'Attribue automatiquement role="img" lorsqu’un aria-label est fourni sans libellé textuel visible.',
        ],
    },
}
