import { ApiError } from '@/services/http/ApiError'

function normalizeError(error, fallbackMessage) {
    if (error instanceof ApiError) {
        return error
    }

    if (error?.name === 'AbortError') {
        return error
    }

    return new ApiError(fallbackMessage, {
        details: error,
    })
}

export function createApiClient({ transport, defaultErrorMessage = 'Une erreur API est survenue.' }) {
    return {
        async request(config = {}) {
            try {
                return await transport(config)
            } catch (error) {
                throw normalizeError(error, config.errorMessage ?? defaultErrorMessage)
            }
        },
    }
}
