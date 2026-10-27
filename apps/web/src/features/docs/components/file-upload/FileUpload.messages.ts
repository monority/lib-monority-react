import type { DocI18n } from '../doc-messages'

export const fileUploadI18n: DocI18n = {
    fr: {
        description:
            'Dépôt de fichiers composé avec glisser-déposer, déclencheur de fichier et liste de fichiers. Aussi disponible en primitives autonomes : FileTrigger, DropZone, FileList.',
        playgroundLabels: {
            label: 'Libellé principal',
            actionLabel: 'Texte du bouton déclencheur',
            description: 'Description d’aide',
            multiple: 'Fichiers multiples',
            disabled: 'Désactivé',
        },
        examples: [
            { title: 'Avec action et description' },
            { title: 'État d’erreur' },
            { title: 'Fichiers multiples' },
            { title: 'Désactivé' },
        ],
        propDescriptions: {
            label: 'Label du champ.',
            hint: 'Description d’aide.',
            error: 'Message d’erreur.',
            accept: 'Types MIME ou extensions acceptés.',
            multiple: 'Autorise plusieurs fichiers.',
            actionLabel: 'Label du bouton d’action (dans le déclencheur).',
            description: 'Description d’aide dans la zone de dépôt.',
            placeholder: 'Texte placeholder quand aucun fichier n’est sélectionné.',
            required: 'Indicateur de champ obligatoire.',
            invalid: 'Marque le déclencheur et le champ natif comme invalides.',
            name: 'Nom du champ fichier natif utilisé lors de la soumission du formulaire.',
            disabled: 'Désactive toutes les interactions.',
            size: 'Taille du contrôle.',
            files: 'Fichiers sélectionnés contrôlés.',
            onFilesChange: 'Appelé quand les fichiers sélectionnés changent.',
        },
        keyboardNavigation: [
            {
                action: 'Fait entrer ou sortir le focus sur la zone de dépôt ou le bouton de sélection.',
                context: 'Navigation globale',
            },
            {
                action: 'Ouvre le sélecteur de fichiers natif du système d’exploitation.',
                context: 'Déclencheur actif',
            },
            {
                action: 'Ouvre le sélecteur de fichiers natif du système d’exploitation.',
                context: 'Déclencheur actif',
            },
            {
                action: 'Annule la sélection ou referme le sélecteur natif.',
                context: 'Dialogue système actif',
            },
        ],
        a11y: [
            'Sémantiques natives de champ fichier et de bouton via FileTrigger.',
            'Les descriptions d’indication et d’erreur sont reliées au déclencheur visible.',
            'Prend en charge disabled/required/aria-invalid et la soumission native par nom.',
            'Anneau de focus visible sur le bouton déclencheur.',
            'DropZone a un role="region" avec aria-label.',
            'FileList a un role="list" avec aria-label="Selected files".',
            'Les boutons de suppression ont un aria-label avec le nom du fichier.',
        ],
    },
}
