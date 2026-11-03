import type { DocI18n } from '../doc-messages'

export const sliderI18n: DocI18n = {
    fr: {
        description:
            'Curseur de sélection numérique interactif prenant en charge les variantes de tailles, les tonalités sémantiques, le mode intervalle à double curseur et la granularité personnalisée.',
        playgroundLabels: {
            label: 'Libellé (label)',
            size: 'Dimension (size)',
            tone: 'Tonalité visuelle',
            min: 'Valeur min',
            max: 'Valeur max',
            step: 'Pas (step)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Tailles (sm, md, lg)' },
            { title: 'Tonalités sémantiques (neutral, accent, danger)' },
            { title: 'Mode intervalle double curseur (range)' },
            { title: 'Paliers et granularité (step)' },
            { title: 'Contrôlé avec synchronisation d’état' },
            { title: 'Désactivé' },
            { title: 'État d’erreur' },
        ],
        propDescriptions: {
            label: 'Libellé textuel associé au champ du curseur.',
            hint: 'Texte d’aide affiché sous le curseur.',
            error: 'Message d’erreur visuel passant le composant en état invalide.',
            size: 'Variante de taille ajustant la hauteur de piste et les marges.',
            tone: 'Tonalité chromatique de la piste active.',
            value: 'Valeur contrôlée.',
            defaultValue: 'Valeur initiale incontrôlée.',
            range: 'Active le mode intervalle à deux poignées (double curseur).',
            min: 'Borne inférieure autorisée.',
            max: 'Borne supérieure autorisée.',
            step: 'Pas de déplacement du curseur.',
            showValue: 'Affiche la valeur numérique courante dans un élément <output>.',
            disabled: 'Désactive le curseur et empêche les interactions.',
            onValueChange: 'Rappel déclenché lors du déplacement avec la nouvelle valeur.',
        },
        keyboardNavigation: [
            {
                action: 'Incrémente la valeur selon le pas (step).',
                context: 'Curseur focalisé',
            },
            {
                action: 'Décrémente la valeur selon le pas (step).',
                context: 'Curseur focalisé',
            },
            {
                action: 'Positionne le curseur sur la borne minimale (min).',
                context: 'Curseur focalisé',
            },
            {
                action: 'Positionne le curseur sur la borne maximale (max).',
                context: 'Curseur focalisé',
            },
            {
                action: 'Effectue un saut de valeur plus important (10% de l’échelle).',
                context: 'Curseur focalisé',
            },
        ],
        a11y: [
            'Éléments natifs <input type="range"> garantissant les rôles ARIA implicites.',
            'Prise en charge complète de la navigation clavier (flèches, Début, Fin).',
            'Sortie visuelle associée <output htmlFor="..."> pour le retour de lecture.',
            'Anneau de focus visible et distinct au clavier.',
        ],
    },
}
