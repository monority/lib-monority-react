/**
 * Returns a human-readable error message from an unknown error value.
 */
export function getErrorMessage(error: unknown) {
    if (typeof error === 'string') {
        return error
    }

    if (error instanceof Error) {
        return error.message
    }

    return String(error)
}

/**
 * Returns true when an error was caused by an AbortController abortion.
 */
export function isAbortError(error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
        return true
    }

    if (typeof error !== 'object' || error === null) {
        return false
    }

    const candidate = error as { name?: unknown; code?: unknown }

    return candidate.name === 'AbortError' || candidate.code === 'ERR_CANCELED'
}
