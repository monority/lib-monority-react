import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchMockSession, signOutMockSession } from '@/services/auth/mockAuthService'
import { getErrorMessage, isAbortError } from '@/services/http/httpErrorUtils'
import { AuthContext } from './auth-context'

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<any>(null)
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'anonymous'>('loading')
    const [error, setError] = useState<Error | null>(null)

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

                setError(error as Error)
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
