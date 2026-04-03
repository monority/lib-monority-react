export const adminOverviewData = {
    header: {
        eyebrow: 'Admin',
        title: 'Gestion des utilisateurs et des acces',
        description:
            'Exemple de page orientee operations avec filtres, table de gestion, statuts et actions rapides.',
        meta: ['128 membres', '12 invitations en attente'],
        primaryActionLabel: 'Inviter',
        secondaryActionLabel: 'Exporter CSV',
    },
    filters: [
        { label: 'Actifs' },
        { label: 'Equipe produit' },
        { label: 'Role admin' },
    ],
    table: {
        columns: [
            { key: 'name', header: 'Membre' },
            { key: 'role', header: 'Role' },
            { key: 'status', header: 'Status' },
            { key: 'lastSeen', header: 'Derniere activite' },
        ],
        rows: [
            { id: '1', name: 'Alice Martin', role: 'Admin', status: 'Active', lastSeen: 'Il y a 2 min' },
            { id: '2', name: 'Bruno Leroy', role: 'Editor', status: 'Active', lastSeen: 'Il y a 18 min' },
            { id: '3', name: 'Claire Dupont', role: 'Admin', status: 'Pending', lastSeen: 'Invitation envoyee' },
            { id: '4', name: 'Nina Costa', role: 'Viewer', status: 'Suspended', lastSeen: 'Hier' },
        ],
    },
    sidebar: {
        summary: [
            { label: 'Admins', value: '8' },
            { label: 'Editors', value: '24' },
            { label: 'Pending invites', value: '12' },
        ],
        actions: [
            'Verifier les roles admin trop larges',
            'Relancer les invitations en attente',
            'Clore les acces inactifs du mois',
        ],
    },
}
