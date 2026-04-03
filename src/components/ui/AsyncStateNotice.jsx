import { Text } from './Text'

export function AsyncStateNotice({ isLoading, isError, loadingMessage, errorMessage }) {
    if (isLoading) {
        return <Text tone="base">{loadingMessage}</Text>
    }

    if (isError) {
        return <Text tone="strong">{errorMessage}</Text>
    }

    return null
}
