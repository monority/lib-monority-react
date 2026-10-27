import type { DocI18n } from '../doc-messages'

export const commandPaletteI18n: DocI18n = {
    fr: {
        description:
            'Palette d’actions clavier d’abord pour naviguer, rechercher et déclencher les tâches produit courantes.',
        playgroundLabels: {
            title: 'Titre de la palette',
            placeholder: 'Placeholder de recherche',
            emptyLabel: 'Message aucun résultat',
        },
        examples: [
            { title: 'Composition par sous-composants' },
            { title: 'Avec groupes' },
            { title: 'Avec raccourcis' },
        ],
        propDescriptions: {
            open: 'Contrôle l’état d’ouverture.',
            onClose: 'Rappel de fermeture.',
            items: 'Éléments de commande.',
            title: 'Titre de la palette.',
            placeholder: 'Placeholder de recherche.',
            emptyLabel: 'Message de résultats vides.',
        },
        keyboardNavigation: [
            {
                action: 'Ouvre la palette de commandes depuis n’importe quel endroit.',
                context: 'Raccourci global',
            },
            {
                action: 'Déplace le focus et la surbrillance sur la commande suivante.',
                context: 'Palette ouverte',
            },
            {
                action: 'Déplace le focus et la surbrillance sur la commande précédente.',
                context: 'Palette ouverte',
            },
            {
                action: 'Exécute l’action associée à la commande surlignée et referme la palette.',
                context: 'Commande active',
            },
            {
                action: 'Ferme immédiatement la palette de commandes et restaure le focus.',
                context: 'Palette ouverte',
            },
            {
                action: 'Fait circuler le focus à l’intérieur du piège de focus du modal.',
                context: 'Palette ouverte',
            },
        ],
        a11y: [
            'La palette est présentée comme une boîte de dialogue modale.',
            'Les résultats exposent les rôles listbox et option pour la sélection au clavier.',
            'Les flèches déplacent l’élément actif, Enter le sélectionne et Escape ferme la palette.',
        ],
    },
}
