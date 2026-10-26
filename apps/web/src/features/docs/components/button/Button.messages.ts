import type { DocI18n } from '../doc-messages'

export const buttonI18n: DocI18n = {
    fr: {
        description:
            'Composant d’action unifié. Gère le texte, les icônes, le chargement, la copie dans le presse-papiers et le mode icône seule.',
        playgroundLabels: {
            variant: 'Variante',
            size: 'Taille',
            loading: 'Chargement (loading)',
            disabled: 'Désactivé (disabled)',
            children: 'Libellé du bouton',
        },
        examples: [
            { title: 'Variantes' },
            { title: 'Tailles' },
            { title: 'Chargement' },
            { title: 'Avec icônes' },
            { title: 'Mode copie' },
            { title: 'Icône seule' },
            { title: 'Pleine largeur' },
        ],
        propDescriptions: {
            variant: 'Intention visuelle.',
            size: 'Densité du contrôle.',
            loading: 'Désactive l’action et marque l’état occupé.',
            disabled: 'État natif disabled (indépendant de loading).',
            fullWidth: 'Étire le bouton à la largeur du conteneur.',
            as: 'Rend sous forme d’élément différent (a, span, etc.).',
            iconLeading: 'Icône affichée avant le libellé.',
            iconTrailing: 'Icône affichée après le libellé.',
            type: 'Attribut natif type du bouton.',
            copyValue: 'Active le mode copie. Copie ce texte au clic.',
            copiedLabel: 'Libellé affiché brièvement après la copie.',
            duration: 'Durée (ms) d’affichage du libellé copié.',
            iconOnly: 'Mode icône seule : dimensions fixes, aria-label requis.',
            children: 'Contenu du libellé du bouton.',
        },
        keyboardNavigation: [
            {
                action: 'Active le bouton au relâchement de la touche.',
                context: 'Focus sur le bouton',
            },
            {
                action: 'Déclenche immédiatement l’action associée au bouton.',
                context: 'Focus sur le bouton',
            },
            {
                action: 'Déplace le focus séquentiellement vers ou hors du bouton.',
                context: 'Navigation globale',
            },
        ],
        a11y: [
            'Sémantique native <button> par défaut.',
            'Prend en charge aria-busy pendant le chargement.',
            'Le mode icône seule EXIGE un aria-label pour les lecteurs d’écran.',
            'Anneau de focus visible via les tokens de focus partagés.',
        ],
    },
}
