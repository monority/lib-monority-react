import { ApiError } from '@/services/http/ApiError'

export function isAbortError(error) {
    return error?.name === 'AbortError'
}

export function normalizeApiError(error, fallbackMessage) {
    if (error instanceof ApiError) {
        return error
    }

    if (isAbortError(error)) {
        return error
    }

    return new ApiError(fallbackMessage, {
        details: error,
    })
}

export function getErrorMessage(error, fallbackMessage = null) {
    return error?.message ?? fallbackMessage
}
