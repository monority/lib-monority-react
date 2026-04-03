export function mapSessionResponse(session) {
    if (!session) {
        return null
    }

    return {
        user: {
            id: session.user?.id ?? '',
            name: session.user?.name ?? 'Unknown user',
            email: session.user?.email ?? '',
            role: session.user?.role ?? 'Member',
        },
        workspace: {
            id: session.workspace?.id ?? '',
            name: session.workspace?.name ?? 'Unknown workspace',
            plan: session.workspace?.plan ?? 'Free',
        },
    }
}
