import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchMockSession, signOutMockSession } from '@/services/auth/mockAuthService'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        const controller = new AbortController()

        async function loadSession() {
            try {
                const nextSession = await fetchMockSession({ signal: controller.signal })
                setSession(nextSession)
                setStatus('authenticated')
            } catch (error) {
                if (error?.name === 'AbortError') {
                    return
                }

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
        } catch (error) {
            if (error?.name !== 'AbortError') {
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
            isAuthenticated: status === 'authenticated',
            isLoading: status === 'loading',
            signOut,
        }),
        [session, signOut, status],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
