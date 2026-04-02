import { createApiClient } from '@/services/http/createApiClient'
import { fakeHttpClient } from '@/services/http/fakeHttpClient'

export const apiClient = createApiClient({
    transport: fakeHttpClient,
    defaultErrorMessage: 'Le client API de demonstration a rencontre une erreur.',
})
