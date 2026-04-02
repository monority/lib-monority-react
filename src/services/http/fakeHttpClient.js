function waitWithSignal(duration, signal) {
    if (signal?.aborted) {
        return Promise.reject(new DOMException('Request aborted', 'AbortError'))
    }

    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            signal?.removeEventListener('abort', handleAbort)
            resolve()
        }, duration)

        function handleAbort() {
            window.clearTimeout(timeoutId)
            reject(new DOMException('Request aborted', 'AbortError'))
        }

        signal?.addEventListener('abort', handleAbort, { once: true })
    })
}

export async function fakeHttpClient({ data, delay = 240, shouldFail = false, signal } = {}) {
    await waitWithSignal(delay, signal)

    if (shouldFail) {
        throw new Error('La requete de demonstration a echoue.')
    }

    return data
}
