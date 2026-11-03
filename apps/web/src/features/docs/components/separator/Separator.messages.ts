import type { DocI18n } from '../doc-messages'

export const separatorI18n: DocI18n = {
    fr: {
        description:
            'Séparateur discret pour délimiter des groupes connexes sans introduire de nouvelle surface.',
        propDescriptions: {
            orientation: 'Axe d’orientation du séparateur.',
            decorative:
                'Bascule le séparateur en rôle de présentation lorsque la structure est déjà évidente.',
        },
        examples: [{ title: 'Vertical' }, { title: 'Décoratif' }],
        a11y: [
            'Utilise par défaut role="separator" et aria-orientation.',
            'Définissez decorative={true} pour un regroupement purement visuel.',
            'Ne vous reposez pas sur les séparateurs comme seule indication du sens d’une section.',
        ],
    },
}
