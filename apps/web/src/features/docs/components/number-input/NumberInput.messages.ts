import type { DocI18n } from '../doc-messages'

export const numberInputI18n: DocI18n = {
    fr: {
        description:
            'Champ numérique pas à pas avec boutons d’incrémentation et de décrémentation, navigation clavier et pincement aux contraintes.',
        playgroundLabels: {
            label: 'Libellé (label)',
            hint: 'Indication (hint)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            min: 'Valeur minimale (min)',
            max: 'Valeur maximale (max)',
            step: 'Pas d’incrémentation (step)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Utilisation contrôlée' },
            { title: 'Tailles' },
            { title: 'Tonalités' },
            { title: 'États' },
        ],
        propDescriptions: {
            value: 'Valeur numérique contrôlée.',
            defaultValue: 'Valeur numérique initiale pour le mode non contrôlé.',
            onValueChange: 'Rappel déclenché quand la valeur numérique analysée change.',
            min: 'Valeur numérique minimale autorisée.',
            max: 'Valeur numérique maximale autorisée.',
            step: 'Incrément ou décrément appliqué par les boutons et les flèches.',
            size: 'Densité de hauteur et de taille de texte du champ.',
            tone: 'Tonalité sémantique de la bordure et de l’anneau de focus.',
            label: 'Label accessible au-dessus du champ.',
            hint: 'Texte d’aide affiché sous le champ.',
            error: 'Message d’erreur qui définit l’état invalide.',
            disabled: 'Désactive le champ et les boutons du stepper.',
            readOnly: 'Empêche l’édition tout en gardant la valeur lisible.',
        },
        keyboardNavigation: [
            {
                action: 'Incrémente la valeur selon le pas (step).',
                context: 'Champ numérique',
            },
            {
                action: 'Décrémente la valeur selon le pas (step).',
                context: 'Champ numérique',
            },
            {
                action: 'Réinitialise à la valeur minimale (min) si définie.',
                context: 'Champ numérique',
            },
            {
                action: 'Définit la valeur sur le maximum (max) si défini.',
                context: 'Champ numérique',
            },
            {
                action: 'Navigue vers les boutons du stepper ou le contrôle suivant.',
                context: 'Champ numérique',
            },
        ],
        a11y: [
            'Les boutons du stepper ont des labels accessibles (Increment / Decrement).',
            'Prend en charge l’incrémentation clavier avec ArrowUp et ArrowDown.',
            'Associations aria-invalid et aria-describedby correctes pour les indications et erreurs.',
        ],
    },
}
