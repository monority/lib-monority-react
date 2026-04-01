export const asyncStatus = {
    idle: 'idle',
    loading: 'loading',
    success: 'success',
    error: 'error',
}

export function createAsyncState(overrides = {}) {
    return {
        status: asyncStatus.idle,
        data: null,
        error: null,
        ...overrides,
    }
}
