import { useEffect, useRef } from 'react'
import { useToast } from '@/hooks/useToast'

export function useErrorToast({ errorMessage, title }) {
    const { pushToast } = useToast()
    const lastErrorMessageRef = useRef(null)

    useEffect(() => {
        if (!errorMessage || lastErrorMessageRef.current === errorMessage) {
            return
        }

        pushToast({
            title,
            description: errorMessage,
            tone: 'danger',
        })

        lastErrorMessageRef.current = errorMessage
    }, [errorMessage, pushToast, title])
}
