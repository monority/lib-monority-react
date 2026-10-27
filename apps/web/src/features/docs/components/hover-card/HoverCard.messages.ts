import type { DocI18n } from '../doc-messages'

export const hoverCardI18n: DocI18n = {
    fr: {
        description:
            'Carte de détails déclenchée au survol pour les aperçus, les métadonnées de support et les informations contextuelles compactes.',
        playgroundLabels: {
            control_0: 'Position (side)',
            control_1: 'Alignement (align)',
            control_2: 'Flèche indicatrice (arrow)',
        },
        examples: [
            { title: 'Délai personnalisé' },
            { title: 'Côtés' },
            { title: 'Contrôlé' },
        ],
        propDescriptions: {
            children: 'Élément déclencheur ou sous-composants composés.',
            content: 'Contenu de la carte rendu dans un portail (mode abrégé).',
            openDelay: 'Délai en ms avant l’affichage de la carte.',
            closeDelay: 'Délai en ms avant le masquage de la carte.',
            side: 'Côté du déclencheur où positionner la carte.',
            align: 'Alignement le long du côté.',
            sideOffset: 'Distance en px depuis le déclencheur.',
            defaultOpen: 'État d’ouverture initial en mode non contrôlé.',
            open: 'État d’ouverture contrôlé.',
            onOpenChange: 'Rappel lorsque l’état d’ouverture change.',
            arrow: 'Affiche une flèche pointant vers le déclencheur.',
            contentClassName: 'ClassName supplémentaire pour le contenu de la carte.',
        },
        a11y: [
            'S’ouvre au survol avec un délai configurable.',
            'La carte a role="dialog" pour les lecteurs d’écran.',
            'Se ferme à la sortie de la souris du déclencheur ou de la carte.',
            'Le positionnement est recalculé au défilement et au redimensionnement.',
        ],
    },
}
