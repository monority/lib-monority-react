/**
 * Returns a human-readable error message from an unknown error value.
 */
export function getErrorMessage(error) {
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
export function isAbortError(error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
        return true
    }

    return error?.name === 'AbortError' || error?.code === 'ERR_CANCELED'
}
