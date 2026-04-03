import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchMockSession, signOutMockSession } from '@/services/auth/mockAuthService'
import { getErrorMessage, isAbortError } from '@/services/http/httpErrorUtils'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [status, setStatus] = useState('loading')
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadSession() {
            try {
                const nextSession = await fetchMockSession({ signal: controller.signal })
                setSession(nextSession)
                setStatus('authenticated')
                setError(null)
            } catch (error) {
                if (isAbortError(error)) {
                    return
                }

                setError(error)
                setStatus('anonymous')
            }
        }

        loadSession()

        return () => {
            controller.abort()
        }
    }, [])

    const signOut = useCallback(async () => {
        const controller = new AbortController()

        try {
            await signOutMockSession({ signal: controller.signal })
            setSession(null)
            setStatus('anonymous')
            setError(null)
        } catch (error) {
            if (!isAbortError(error)) {
                throw error
            }
        }
    }, [])

    const value = useMemo(
        () => ({
            session,
            user: session?.user ?? null,
            workspace: session?.workspace ?? null,
            status,
            error,
            errorMessage: getErrorMessage(error),
            isAuthenticated: status === 'authenticated',
            isLoading: status === 'loading',
            signOut,
        }),
        [error, session, signOut, status],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
