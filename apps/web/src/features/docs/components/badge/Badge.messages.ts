import type { DocI18n } from '../doc-messages'

export const badgeI18n: DocI18n = {
    fr: {
        description:
            'Étiquette d’état compacte pour les métadonnées, étapes de cycle de vie et catégorisations légères.',
        playgroundLabels: {
            label: 'Texte du badge',
            variant: 'Variante visuelle',
        },
        examples: [
            { title: 'Primaire (Primary)' },
            { title: 'Succès (Success)' },
            { title: 'Avertissement (Warning)' },
            { title: 'Danger (Danger)' },
            { title: 'Toutes les variantes' },
        ],
        propDescriptions: {
            variant: 'Variante visuelle du badge.',
            children: 'Libellé court du badge.',
        },
        a11y: [
            'Utilisez un libellé textuel concis et explicite.',
            'Ne transmettez jamais d’information critique uniquement par la couleur.',
        ],
    },
}
