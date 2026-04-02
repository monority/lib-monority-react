export class ApiError extends Error {
    constructor(message, { code = 'unknown_error', status = 500, details = null } = {}) {
        super(message)
        this.name = 'ApiError'
        this.code = code
        this.status = status
        this.details = details
    }
}
