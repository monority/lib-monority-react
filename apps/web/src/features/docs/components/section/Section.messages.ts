import type { DocI18n } from '../doc-messages'

export const sectionI18n: DocI18n = {
    fr: {
        description:
            'Section de contenu avec espacement configurable, variantes visuelles et élément racine polymorphique.',
        playgroundLabels: {
            variant: 'Variante visuelle',
            spacing: 'Espacement (spacing)',
            title: 'Titre de la section',
        },
        examples: [{ title: 'Composition Compound' }, { title: 'Variantes d’espacement' }],
        propDescriptions: {
            title: 'Contenu du titre de la section.',
            titleAs: 'Niveau sémantique du titre HTML (h1 à h6).',
            spacing: 'Préréglage de rythme vertical (padding et gap).',
            variant: 'Variante visuelle et traitement de surface.',
            as: 'Élément racine polymorphique.',
            children: 'Contenu de la section.',
        },
        a11y: [
            'Rend par défaut un repère sémantique HTML <section>.',
            'Passez as="div" pour retirer le repère sémantique lorsque la section ne constitue pas un point de repère autonome.',
            'Le titre s’appuie sur un niveau de titre sémantique approprié (h2 par défaut, paramétrable via titleAs).',
        ],
    },
}
