function wait(duration) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration)
    })
}

export async function fakeHttpClient({ data, delay = 240, shouldFail = false }) {
    await wait(delay)

    if (shouldFail) {
        throw new Error('La requete de demonstration a echoue.')
    }

    return data
}
