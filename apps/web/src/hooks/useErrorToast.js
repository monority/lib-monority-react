import { useContext } from 'react'
import { useToast } from '@monority/ui'

export function useErrorToast() {
    const { pushToast } = useToast()

    return (error) => {
        pushToast({
            title: 'Erreur',
            description: error instanceof Error ? error.message : String(error),
            tone: 'danger',
        })
    }
}
