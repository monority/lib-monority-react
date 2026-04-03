export const docsHeroContent = {
    eyebrow: 'UI Docs',
    title: 'Documentation d usage de la librairie UI',
    description:
        "Une page de reference rapide pour comprendre comment utiliser les primitives, les patterns et les conventions du starter sans se limiter a une simple galerie visuelle.",
    supportingPoints: [
        'Comprendre les conventions de la librairie avant de composer une page',
        'Choisir les bons composants selon le niveau de complexite de l interface',
        'Eviter les erreurs de densite, de priorisation et de feedback',
    ],
    sections: [
        { label: 'Principes', href: '#principles' },
        { label: 'Patterns', href: '#patterns' },
        { label: 'Familles', href: '#families' },
        { label: 'Guidelines', href: '#guidelines' },
        { label: 'Recettes', href: '#recipes' },
        { label: 'Reference', href: '#reference' },
    ],
}

export const docsGettingStartedContent = {
    badge: 'Commencer ici',
    title: 'Comment utiliser cette documentation efficacement',
    description:
        "Cette page sert de repere rapide pour choisir un composant, valider une composition de page et garder une interface coherente.",
    items: [
        {
            title: 'Commencer par le besoin',
            description:
                'Identifier si tu cherches une action, un champ, un feedback ou un layout avant de choisir un composant.',
        },
        {
            title: 'Valider la densite',
            description:
                'Regarder les guidelines et les recettes avant d empiler plusieurs primitives dans un meme espace.',
        },
        {
            title: 'Composer puis tester',
            description:
                'Assembler les patterns existants, puis verifier clavier, loading, erreurs et responsive.',
        },
    ],
}

export const docsPrinciples = [
    {
        title: 'API previsible',
        description: 'Les composants suivent autant que possible les memes props: `className`, variantes, tailles et contenu compose.',
    },
    {
        title: 'Accessibilite par defaut',
        description: 'Roles, labels, clavier et etats focus sont traites comme des comportements standards et non optionnels.',
    },
    {
        title: 'Responsive sans surprise',
        description: 'Les patterns de page et les primitives se replient proprement dans des contexts plus etroits.',
    },
]

export const docsApiPatterns = [
    'Toujours accepter `className` pour ajuster la presentation locale.',
    'Preferer `size`, `variant`, `tone` quand le composant expose des variantes.',
    'Rester controllable et composable plutot que cacher trop de logique metier.',
    'Garder le meme vocabulaire entre primitives proches pour faciliter l adoption.',
]

export const docsComponentFamilies = [
    {
        title: 'Actions',
        description: 'Pour declencher une intention claire ou ouvrir une interaction secondaire.',
        components: ['Button', 'IconButton', 'DropdownMenu', 'Popover', 'CommandPalette'],
        recommendation:
            'Commencer par `Button`, puis monter en complexite seulement si l interaction gagne vraiment en densite.',
    },
    {
        title: 'Formulaires',
        description: 'Pour saisir, filtrer ou configurer avec une structure lisible.',
        components: ['Input', 'Select', 'Textarea', 'Checkbox', 'Switch', 'RadioGroup', 'Combobox', 'FormSection'],
        recommendation:
            'Utiliser `FormSection` pour donner du contexte, et garder les controles simples tant qu un composant plus riche n est pas necessaire.',
    },
    {
        title: 'Feedback',
        description: 'Pour informer sans casser le flux ou, au contraire, attirer l attention quand il le faut.',
        components: ['InlineAlert', 'Banner', 'Callout', 'Toast', 'AlertDialog', 'Progress', 'Spinner'],
        recommendation:
            'Choisir le niveau de gravite adapte: inline pour le contexte local, banner pour le global, dialog pour le critique.',
    },
    {
        title: 'Navigation et layout',
        description: 'Pour structurer la page, guider la lecture et garder des interfaces stables.',
        components: ['PageHeader', 'Toolbar', 'FilterBar', 'Breadcrumb', 'Tabs', 'Drawer', 'SidebarLayout'],
        recommendation:
            'Composer les patterns de page avec `PageHeader` et `Toolbar` avant d ajouter des layouts plus lourds.',
    },
]

export const docsUsageGuidelines = [
    {
        title: 'Actions et priorisation',
        doText: 'Limiter chaque zone a une action principale claire, puis releguer le secondaire en `ghost`, menu ou lien contextuel.',
        dontText: 'Eviter trois CTA de meme poids dans un meme header, une card ou un footer de modal.',
    },
    {
        title: 'Formulaires et densite',
        doText: 'Structurer les formulaires par blocs metier avec `FormSection`, labels visibles et messages d aide courts.',
        dontText: 'Ne pas accumuler trop de champs heterogenes dans un seul conteneur sans separation semantique.',
    },
    {
        title: 'Feedback et gravite',
        doText: 'Utiliser `InlineAlert` pour un retour local, `Banner` pour un message transversal, `AlertDialog` pour une confirmation critique.',
        dontText: 'Eviter de faire remonter chaque information au niveau modal ou toast si le contexte local suffit.',
    },
    {
        title: 'Layouts et lecture',
        doText: 'Poser la hierarchie avec `PageHeader`, puis ajouter `Toolbar`, `FilterBar` ou `SidebarLayout` seulement si le besoin produit est reel.',
        dontText: 'Ne pas introduire un layout complexe trop tot si une simple page avec sections suffit encore.',
    },
]

export const docsRecipes = [
    {
        title: 'Page de liste admin',
        composition: ['PageHeader', 'Toolbar', 'FilterBar', 'Table', 'Pagination'],
        why: 'Bon pattern pour une page de gestion avec tri, filtres actifs et action primaire visible.',
    },
    {
        title: 'Page settings ou profil',
        composition: ['PageHeader', 'SidebarLayout', 'FormSection', 'InlineAlert', 'Button'],
        why: 'Permet de separer navigation secondaire, formulaire et feedback sans perdre la lisibilite.',
    },
    {
        title: 'Dashboard overview',
        composition: ['PageHeader', 'MetricGrid', 'StatCard', 'Banner', 'DataList'],
        why: 'Donne une hierarchie claire entre vue d ensemble, contexte et details secondaires.',
    },
]

export const docsComponentDocs = [
    {
        title: 'Button',
        usage: 'Actions primaires, secondaires ou compactes. A utiliser pour les intentions explicites.',
        props: ['variant: `primary | ghost | subtle`', 'size: `sm | md | lg`', 'loading', 'iconLeading / iconTrailing'],
        doText: 'Utiliser `loading` pour les mutations async et garder un libelle court.',
        dontText: 'Eviter plusieurs boutons primaires cote a cote dans une meme zone.',
    },
    {
        title: 'PageHeader',
        usage: 'Header de page pour dashboard, settings, detail ou liste admin.',
        props: ['eyebrow', 'title', 'description', 'meta', 'actions'],
        doText: 'Garder une action principale claire et des metas courtes.',
        dontText: 'Eviter de transformer le header en toolbar dense.',
    },
    {
        title: 'FormSection',
        usage: 'Bloc de formulaire structure avec contexte et actions.',
        props: ['title', 'description', 'meta', 'actions'],
        doText: 'Regrouper des champs lies metier dans un meme bloc.',
        dontText: 'Ne pas empiler trop de sections identiques sans hierarchie.',
    },
    {
        title: 'FilterBar',
        usage: 'Liste, recherche et filtres actifs avec reset rapide.',
        props: ['leading', 'filters', 'resultsCount', 'onReset'],
        doText: 'Afficher les filtres actifs sous forme de chips lisibles.',
        dontText: 'Eviter de dupliquer les memes filtres dans la toolbar et dans la bar.',
    },
]
