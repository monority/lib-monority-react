import type { DocI18n } from '../doc-messages'

export const avatarI18n: DocI18n = {
    fr: {
        description:
            'Indicateur d’identité d’utilisateur ou d’entité avec image, repli sur initiales et pastille de statut.',
        playgroundLabels: {
            size: 'Taille',
            status: 'Statut',
            initials: 'Initiales',
            showImage: 'Avec image',
        },
        examples: [{ title: 'Tailles' }, { title: 'Avec image' }, { title: 'Groupe d’avatars' }],
        propDescriptions: {
            size: 'Taille rendue.',
            src: 'URL de la source image (mode raccourci). Repli sur les initiales en cas d’absence ou d’erreur de chargement.',
            alt: 'Texte alternatif de l’image ; utilisé comme nom accessible.',
            name: 'Nom de la personne (mode raccourci). Fournit le nom accessible et dérive les initiales.',
            status: 'Indicateur de statut de présence.',
            children: 'Contenu explicite de repli ou sous-composants composés.',
        },
        a11y: [
            'Fournissez un texte alternatif (alt) ou aria-label lorsque l’avatar identifie une personne.',
            'La prop name fournit automatiquement le nom accessible lorsque alt est absent.',
            'Les avatars sans name, alt ni aria-label restent purement décoratifs.',
            'Le contenu de repli (initiales) est masqué de l’arbre d’accessibilité pour éviter la redondance.',
        ],
    },
}
