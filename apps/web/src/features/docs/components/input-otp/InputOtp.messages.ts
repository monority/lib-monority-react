import type { DocI18n } from '../doc-messages'

export const inputOtpI18n: DocI18n = {
    fr: {
        description:
            'Champ de saisie segmenté pour codes One-Time Password, vérification en deux étapes (2FA) et codes PIN avec support transparent du collage.',
        playgroundLabels: {
            maxLength: 'Nombre de chiffres (maxLength)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [{ title: 'Composition manuelle avec séparateur' }, { title: 'État désactivé' }],
        propDescriptions: {
            value: 'Valeur contrôlée du code.',
            defaultValue: 'Valeur initiale non contrôlée.',
            maxLength: 'Nombre total de caractères requis.',
            pattern: 'Expression régulière de filtrage des caractères.',
            inputMode: 'Type de clavier virtuel affiché sur mobile.',
            disabled: 'Désactive toute interaction.',
            onChange: 'Rappel déclenché à chaque saisie.',
            onComplete: 'Rappel déclenché lorsque toutes les cases sont remplies.',
        },
        keyboardNavigation: [
            {
                action: 'Saisit le caractère numérique et se déplace automatiquement vers la case suivante.',
                context: 'Case de saisie (slot OTP)',
            },
            {
                action: 'Efface le caractère courant et recule le focus d’une case.',
                context: 'Case de saisie (slot OTP)',
            },
            {
                action: 'Déplace manuellement la position du focus entre les différentes cases.',
                context: 'Case de saisie (slot OTP)',
            },
            {
                action: 'Colle un code à usage unique complet et remplit automatiquement les cases.',
                context: 'Case de saisie (slot OTP)',
            },
        ],
        a11y: [
            'Utilise un champ natif sous-jacent avec inputMode="numeric" et autoComplete="one-time-code".',
            'Prend en charge la saisie clavier standard, les raccourcis copier/coller et la touche retour arrière.',
            'Curseur visuel clignotant simulé respectant la préférence prefers-reduced-motion.',
            'Accessible aux lecteurs d’écran avec un libellé clair.',
        ],
    },
}
