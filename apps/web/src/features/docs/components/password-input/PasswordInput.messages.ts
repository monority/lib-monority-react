import type { DocI18n } from '../doc-messages'

export const passwordInputI18n: DocI18n = {
    fr: {
        description:
            'Champ de texte spécialisé pour les mots de passe avec bascule de visibilité intégrée et métadonnées de champ.',
        playgroundLabels: {
            label: 'Libellé (label)',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            showToggle: 'Bouton afficher/masquer',
            disabled: 'Désactivé (disabled)',
            required: 'Requis (required)',
        },
        examples: [{ title: 'Tailles' }, { title: 'Bascule de visibilité' }, { title: 'États' }],
        propDescriptions: {
            label: 'Label affiché au-dessus du champ.',
            hint: 'Description d’aide affichée sous le champ.',
            error: 'Message d’erreur qui place le champ en état invalide.',
            size: 'Densité de hauteur et de police.',
            showToggle: 'Contrôle l’affichage du bouton de bascule de visibilité.',
            disabled: 'Désactive l’interaction et atténue le champ.',
            required: 'Marque le champ comme obligatoire.',
        },
        keyboardNavigation: [
            {
                action: 'Déplace le focus vers le champ ou vers le bouton de visibilité.',
                context: 'Champ mot de passe',
            },
            {
                action: 'Bascule la visibilité du mot de passe entre texte en clair et masqué.',
                context: 'Bouton d’affichage du mot de passe',
            },
        ],
        a11y: [
            'La bascule de visibilité a un label accessible alternant entre afficher et masquer.',
            'Valeur autocomplete par défaut adaptée aux gestionnaires de mots de passe.',
            'Labels de champ et messages d’erreur reliés via aria-describedby.',
        ],
    },
}
