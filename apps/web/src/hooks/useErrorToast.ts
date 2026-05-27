import { useEffect } from 'react'
import { useToast } from '@monority/ui'

interface UseErrorToastOptions {
    title?: string
    errorMessage?: string | null
}

export function useErrorToast(options?: UseErrorToastOptions) {
    const { pushToast } = useToast()

    useEffect(() => {
        if (!options?.errorMessage) {
            return
        }

        pushToast({
            title: options.title ?? 'Erreur',
            description: options.errorMessage,
            tone: 'danger',
        })
    }, [options?.errorMessage, options?.title, pushToast])

    return (error: unknown) => {
        pushToast({
            title: 'Erreur',
            description: error instanceof Error ? error.message : String(error),
            tone: 'danger',
        })
    }
}
