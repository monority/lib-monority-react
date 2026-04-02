export const dashboardTopbarContent = {
    brand: 'Model Workspace',
    navItems: ['Overview', 'Revenue', 'Customers'],
    meta: 'Cycle hebdo',
    actionLabel: 'Creer un rapport',
}

export const dashboardHeaderContent = {
    eyebrow: 'Dashboard',
    title: 'Vue d ensemble produit',
    description:
        'Exemple de page complete pour piloter une activite, lire les signaux clefs et lancer les prochaines actions.',
    meta: ['Mis a jour il y a 5 min', 'Workspace principal'],
    primaryActionLabel: 'Partager',
    secondaryActionLabel: 'Exporter',
}

export const dashboardMetrics = [
    {
        label: 'MRR',
        value: '48 200 EUR',
        trend: '+12%',
        trendTone: 'positive',
        description: 'Croissance sur 30 jours',
        icon: 'EUR',
    },
    {
        label: 'Activation',
        value: '64%',
        trend: '+4 pts',
        trendTone: 'positive',
        description: 'Utilisateurs actifs sur 7 jours',
        icon: '%',
    },
    {
        label: 'Churn',
        value: '2.1%',
        trend: 'Sous controle',
        description: 'Evolution hebdomadaire',
        icon: 'C',
    },
    {
        label: 'Tickets',
        value: '18',
        trend: 'A suivre',
        trendTone: 'warning',
        description: 'Demandes support prioritaires',
        icon: '!',
    },
]

export const dashboardAlert = {
    title: 'Une opportunite de conversion est en hausse',
    description:
        'Le segment trial > team convertit mieux cette semaine. C est un bon moment pour pousser une offre de migration.',
    actionLabel: 'Voir le segment',
}

export const dashboardTableColumns = [
    { key: 'customer', header: 'Client' },
    { key: 'plan', header: 'Plan' },
    { key: 'owner', header: 'Owner' },
    { key: 'mrr', header: 'MRR', align: 'right' },
]

export const dashboardTableRows = [
    { id: '1', customer: 'Acme Studio', plan: 'Scale', owner: 'Alice', mrr: '4 800 EUR' },
    { id: '2', customer: 'Northstar', plan: 'Growth', owner: 'Bruno', mrr: '3 100 EUR' },
    { id: '3', customer: 'Monolith', plan: 'Enterprise', owner: 'Claire', mrr: '9 400 EUR' },
    { id: '4', customer: 'Orbit', plan: 'Starter', owner: 'Nina', mrr: '890 EUR' },
]

export const dashboardSidebarData = {
    highlights: [
        { label: 'Pipeline qualifie', value: '23 leads' },
        { label: 'Forecast du mois', value: '61 000 EUR' },
        { label: 'NPS', value: '48' },
    ],
    tasks: [
        'Verifier les tickets enterprise ouverts',
        'Confirmer le plan de release de vendredi',
        'Partager le recap revenue avec l equipe',
    ],
}
