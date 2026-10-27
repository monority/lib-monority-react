import type { DocI18n } from '../doc-messages'

export const collapsibleI18n: DocI18n = {
    fr: {
        description:
            'Panneau dépliable pour les détails secondaires, notes de migration et conseils intégrés dans le flux.',
        playgroundLabels: {
            apiMode: "Mode d'API",
            size: 'Taille',
            open: 'Ouvert (open)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Ouvert par défaut (defaultOpen)' },
            { title: 'État contrôlé (controlled)' },
            { title: 'Tailles (sm, md, lg)' },
        ],
        propDescriptions: {
            title: 'Contenu du bouton déclencheur (mode raccourci).',
            children: 'Contenu du panneau dépliable ou sous-composants composés.',
            defaultOpen: 'État développé par défaut.',
            open: 'État développé en mode contrôlé.',
            onOpenChange: 'Rappel déclenché lors du changement d’ouverture.',
            size: 'Taille et densité du composant.',
        },
        keyboardNavigation: [
            {
                key: 'Tab / Shift + Tab',
                action: 'Déplace le focus vers le bouton de déclenchement du panneau.',
                context: 'Navigation globale',
            },
            {
                key: 'Enter / Espace',
                action: 'Bascule le panneau entre l’état replié et développé.',
                context: 'Focus sur le déclencheur',
            },
        ],
        a11y: [
            'Le bouton déclencheur expose les attributs aria-expanded et aria-controls.',
            'Le panneau utilise role="region", aria-hidden, et est étiqueté par le déclencheur.',
            'La navigation clavier fonctionne avec Entrée et Espace via le bouton natif.',
            'L’animation fluide repose sur CSS Grid (grid-template-rows: 0fr -> 1fr) avec hauteur résiduelle nulle une fois fermé.',
        ],
    },
}
