import type { DocI18n } from '../doc-messages'

export const inputI18n: DocI18n = {
    fr: {
        description:
            'Primitive de champ de formulaire avec libellé, aide, erreur, champ requis et états désactivés. Inclut les variantes recherche, nombre, mot de passe et effaçable.',
        playgroundLabels: {
            label: 'Libellé (label)',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            clearable: 'Effaçable (clearable)',
            disabled: 'Désactivé (disabled)',
            invalid: 'Invalide (invalid)',
        },
        examples: [
            { title: 'Recherche' },
            { title: 'Effaçable' },
            { title: 'Nombre' },
            { title: 'Mot de passe' },
            { title: 'Tailles du contrôle' },
        ],
        propDescriptions: {
            tone: 'Tonalité visuelle de la bordure et du focus.',
            size: 'Variante de densité contrôlant le padding et la taille de police.',
            invalid: 'Force l’état visuel invalide indépendamment de l’erreur.',
            id: 'Identifiant stable pour l’association au libellé et les hooks aria.',
            label: 'Libellé visible rendu via Field.',
            hint: 'Description d’aide liée via aria-describedby.',
            error: 'Message d’invalidité et état visuel d’erreur.',
            className: 'Hook de classe pour le conteneur Field.',
            inputClassName: 'Hook de classe pour l’élément input.',
            required: 'Marque le champ comme requis.',
            disabled: 'Désactive le champ et applique un style atténué.',
            placeholder: 'Texte d’exemple natif.',
            clearable: 'Ajoute un bouton d’effacement accessible quand du texte est saisi.',
        },
        keyboardNavigation: [
            {
                action: 'Déplace le focus vers ou depuis le champ de saisie.',
                context: 'Champ de saisie',
            },
            {
                action: 'Réinitialise la saisie textuelle si le champ est effaçable (clearable).',
                context: 'Champ avec bouton d’effacement',
            },
        ],
        a11y: [
            'Le libellé utilise htmlFor.',
            'Les identifiants d’aide et d’erreur alimentent aria-describedby.',
            'Les erreurs définissent aria-invalid.',
            'Les champs de recherche utilisent type="search".',
            'data-invalid, data-required, data-disabled comme hooks utilitaires.',
        ],
    },
}
