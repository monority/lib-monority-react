import type { DocI18n } from '../doc-messages'

export const comboboxI18n: DocI18n = {
    fr: {
        description:
            'Select avec autocomplétion, liste déroulante en portal, navigation clavier et filtrage côté client.',
        playgroundLabels: {
            size: 'Taille',
            clearable: 'Effaçable (clearable)',
            loading: 'Chargement asynchrone',
            disabled: 'Désactivé',
            placeholder: 'Placeholder',
            label: 'Libellé du champ',
        },
        examples: [
            { title: 'Avec descriptions' },
            { title: 'Chargement asynchrone et effaçable' },
            { title: 'Désactivé' },
            { title: 'État d’erreur' },
            { title: 'Tailles' },
        ],
        propDescriptions: {
            items: 'Éléments de la liste déroulante.',
            value: 'Valeur sélectionnée contrôlée.',
            defaultValue: 'Valeur sélectionnée par défaut.',
            onChange: 'Rappel de sélection.',
            placeholder: 'Placeholder du champ.',
            emptyLabel: 'Label quand aucun résultat ne correspond.',
            label: 'Label du champ.',
            hint: 'Description d’aide.',
            error: 'Message d’erreur.',
            required: 'Indicateur de champ obligatoire.',
            loading:
                'Indicateur de chargement asynchrone qui remplace le chevron par un spinner et active aria-busy.',
            clearable:
                'Affiche un bouton d’effacement rapide lorsque le champ contient une sélection ou une saisie.',
            clearAriaLabel: 'Libellé accessible (aria-label) pour le bouton d’effacement.',
            onClear: 'Rappel déclenché lors du clic sur le bouton d’effacement.',
        },
        keyboardNavigation: [
            {
                action: 'Ouvre le menu déroulant ou déplace la surbrillance sur l’option suivante.',
                context: 'Focus sur le champ ou menu ouvert',
            },
            {
                action: 'Déplace la surbrillance sur l’option précédente.',
                context: 'Menu déroulant ouvert',
            },
            {
                action: 'Valide l’option actuellement mise en surbrillance et referme le menu.',
                context: 'Option active',
            },
            {
                action: 'Referme le menu déroulant et conserve la valeur actuelle.',
                context: 'Menu déroulant ouvert',
            },
            {
                action: 'Navigue directement vers la première option de la liste.',
                context: 'Menu déroulant ouvert',
            },
            {
                action: 'Navigue directement vers la dernière option de la liste.',
                context: 'Menu déroulant ouvert',
            },
            {
                action: 'Ferme la liste déroulante et déplace le focus vers le champ interactif suivant.',
                context: 'Navigation globale',
            },
        ],
        a11y: [
            'Combinaison ARIA combobox (role="combobox", aria-expanded, aria-activedescendant).',
            'Navigation clavier (flèches, entrée, échap).',
            'Rôle listbox pour le menu d’options.',
            'Anneau de focus visible.',
        ],
    },
}
