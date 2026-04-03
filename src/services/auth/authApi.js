export const authApi = {
    session: {
        method: 'GET',
        path: '/session',
        errorMessage: 'Impossible de charger la session de demonstration.',
    },
    signOut: {
        method: 'POST',
        path: '/session/logout',
        errorMessage: 'Impossible de fermer la session de demonstration.',
    },
}
