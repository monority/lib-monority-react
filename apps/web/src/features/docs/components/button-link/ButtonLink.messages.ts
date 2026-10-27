import type { DocI18n } from '../doc-messages'

export const buttonLinkI18n: DocI18n = {
    fr: {
        description:
            'Lien de navigation hypertexte reprenant fidèlement l’apparence visuelle d’un bouton. Associe la sémantique de lien aux styles du composant Button.',
        playgroundLabels: {
            label: 'Libellé du lien',
            variant: 'Variante visuelle',
            size: 'Dimension (size)',
            fullWidth: 'Pleine largeur (fullWidth)',
            disabled: 'Désactivé (disabled)',
        },
        examples: [
            { title: 'Variantes' },
            { title: 'Tailles' },
            { title: 'États' },
            { title: 'Avec icônes' },
            { title: 'Pleine largeur' },
        ],
        propDescriptions: {
            href: 'URL de destination pour la navigation.',
            variant: 'Intention visuelle.',
            size: 'Densité du contrôle.',
            disabled: 'Désactive la navigation et positionne aria-disabled="true".',
            loading: 'Désactive la navigation et positionne aria-busy="true".',
            fullWidth: 'Élargit le lien à la largeur complète du conteneur parent.',
            children: 'Contenu du lien.',
        },
        keyboardNavigation: [
            {
                key: 'Enter',
                action: 'Active le lien hypertexte et déclenche la navigation.',
                context: 'Lien focalisé',
            },
            {
                key: 'Tab',
                action: 'Déplace le focus vers le lien ou l’élément interactif suivant.',
                context: 'Navigation au clavier',
            },
        ],
        a11y: [
            'Élément HTML sémantique <a> natif avec attribut href.',
            'Utilise aria-disabled="true" en mode désactivé pour maintenir le lien dans l’ordre de tabulation.',
            'Indicateur de focus visible via focus-visible sur tous les navigateurs.',
        ],
    },
}
