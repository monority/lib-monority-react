import { createContext } from 'react'

export interface AuthSession {
    user: { id: string; name: string; email?: string; role?: string } | null
    workspace: { id: string; name: string; plan?: string } | null
}

export interface AuthContextValue {
    session: AuthSession | null
    user: AuthSession['user']
    workspace: AuthSession['workspace']
    status: 'loading' | 'authenticated' | 'anonymous'
    error: Error | null
    errorMessage: string | null
    isAuthenticated: boolean
    isLoading: boolean
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
