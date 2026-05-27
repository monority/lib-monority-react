const DEMO_USER = {
    id: 'user-1',
    name: 'Alice Martin',
    email: 'alice@example.com',
}

const DEMO_WORKSPACE = {
    id: 'workspace-1',
    name: 'Model Workspace',
    plan: 'Pro',
}

interface MockSessionOptions {
    signal?: AbortSignal
}

/**
 * Fetches an existing (mock) session — always resolves to the demo session
 * unless a signal is already aborted.
 */
export async function fetchMockSession({ signal }: MockSessionOptions = {}) {
    await delay(600)

    if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError')
    }

    return {
        user: DEMO_USER,
        workspace: DEMO_WORKSPACE,
    }
}

/**
 * Signs the mock session out and returns the null/empty state.
 */
export async function signOutMockSession({ signal }: MockSessionOptions = {}) {
    await delay(300)

    if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError')
    }

    return { user: null, workspace: null }
}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
