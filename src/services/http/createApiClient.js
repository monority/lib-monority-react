import { normalizeApiError } from '@/services/http/httpErrorUtils'

export function createApiClient({ transport, defaultErrorMessage = 'Une erreur API est survenue.' }) {
    return {
        async request(config = {}) {
            try {
                return await transport(config)
            } catch (error) {
                throw normalizeApiError(error, config.errorMessage ?? defaultErrorMessage)
            }
        },
    }
}
