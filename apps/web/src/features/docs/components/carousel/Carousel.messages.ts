import type { DocI18n } from '../doc-messages'

export const carouselI18n: DocI18n = {
    fr: {
        description:
            'Diaporama accessible avec flèches aériennes glassmorphic, indicateurs morphiques en pilule et compteur de défilement.',
        playgroundLabels: {
            showArrows: 'Flèches de navigation (showArrows)',
            arrowsPosition: 'Position des flèches (arrowsPosition)',
            showDots: 'Indicateurs à points (showDots)',
            showCounter: 'Compteur de diapositive (showCounter)',
            loop: 'Bouclage infini (loop)',
            autoPlay: 'Lecture auto (autoPlay)',
        },
        examples: [
            { title: 'Composition Compound' },
            { title: 'Lecture automatique (Auto-play)' },
            { title: 'Mode boucle continue (Loop)' },
            { title: 'Sans contrôles de navigation' },
        ],
        propDescriptions: {
            slides: 'Tableau des éléments enfants à projeter comme diapositives (mode raccourci).',
            children:
                'Sous-composants compound : Carousel.Content, Carousel.Previous, Carousel.Next, etc.',
            autoPlay: 'Active le défilement automatique cadencé.',
            interval: 'Délai en millisecondes entre deux transitions automatiques.',
            showArrows: 'Affiche les flèches de navigation circulaire (mode raccourci).',
            arrowsPosition:
                'Positionnement des flèches : extérieur (flanqué à gauche et droite) ou intérieur (superposé en overlay).',
            showDots: 'Affiche les indicateurs morphiques de pagination (mode raccourci).',
            showCounter:
                'Affiche le badge compteur indiquant la diapositive active / totale (mode raccourci).',
            loop: 'Autorise le bouclage circulaire infini sans blocage aux extrémités.',
            orientation: 'Axe de défilement du carrousel.',
            slideClassName:
                'Classe CSS additionnelle injectée sur chaque conteneur de diapositive.',
        },
        keyboardNavigation: [
            {
                key: 'Flèche Gauche / Flèche Droite',
                action: 'Navigue vers la diapositive précédente ou suivante en orientation horizontale.',
                context: 'Focus sur le carrousel ou ses contrôles',
            },
            {
                key: 'Flèche Haut / Flèche Bas',
                action: 'Navigue vers la diapositive précédente ou suivante en orientation verticale.',
                context: 'Focus sur le carrousel ou ses contrôles',
            },
            {
                key: 'Home / Début',
                action: 'Revient immédiatement à la première diapositive.',
                context: 'Focus sur le carrousel ou ses contrôles',
            },
            {
                key: 'End / Fin',
                action: 'Avance immédiatement à la dernière diapositive.',
                context: 'Focus sur le carrousel ou ses contrôles',
            },
            {
                key: 'Tab',
                action: 'Déplace le focus séquentiellement entre le carrousel, les flèches, le bouton lecture/pause et les points de pagination.',
                context: 'Navigation globale',
            },
            {
                key: 'Enter / Espace',
                action: 'Active le bouton fléché, le bouton lecture/pause ou sélectionne le point de pagination ciblé.',
                context: 'Focus sur le bouton ciblé',
            },
        ],
        a11y: [
            'Conteneur racine doté de role="region" et aria-roledescription="carousel".',
            'Chaque diapositive expose role="group", aria-roledescription="slide" et un libellé accessible dynamique.',
            'Les diapositives inactives hors champ sont masquées aux technologies d’assistance via aria-hidden="true".',
            'La pagination expose role="tablist" avec boutons dotés de role="tab" et aria-selected synchronisé.',
            'Support complet des raccourcis clavier (flèches directionnelles, touches Home et End).',
            'Suspension automatique de la rotation lors du survol de la souris ou de la prise de focus clavier.',
        ],
    },
}
