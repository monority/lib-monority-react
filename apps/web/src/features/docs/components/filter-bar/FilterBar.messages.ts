import type { DocI18n } from '../doc-messages'

export const filterBarI18n: DocI18n = {
    fr: {
        description:
            'Barre de contrôle compacte pour la recherche, les filtres, les puces actives et les métadonnées de résultats avec sous-composants composés.',
        playgroundLabels: {
            showChips: 'Puces actives (showChips)',
            category: 'Catégorie',
            status: 'Statut',
        },
        examples: [
            { title: 'Avec contrôles composés' },
            { title: 'Avec bouton de réinitialisation' },
        ],
        propDescriptions: {
            children: 'Contrôles de filtrage et sous-composants (FilterBar.Main, FilterBar.Meta).',
            'FilterBar.Main':
                'Conteneur principal regroupant le champ de saisie, les sélecteurs et les puces.',
            'FilterBar.Leading':
                'Emplacement de tête pour le champ de recherche ou filtre principal.',
            'FilterBar.Chips': 'Zone horizontale de flux pour les étiquettes et puces actives.',
            'FilterBar.Chip': 'Puce de filtre interactive avec état pressé actif et focus clavier.',
            'FilterBar.Meta':
                'Emplacement de fin pour les métadonnées de comptage et actions de remise à zéro.',
        },
        a11y: [
            'Utilise par défaut role="group" avec aria-label="Filtres".',
            'FilterBar.Chip utilise role="button" avec aria-pressed pour refléter l’état actif et supporte les touches Entrée et Espace.',
            'Assurez-vous que chaque contrôle enfant dispose de son propre nom accessible indépendant.',
            'Réservez la zone meta pour le statut passif de comptage ou l’action de réinitialisation globale.',
        ],
    },
}
