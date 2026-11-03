import { createContext, useContext } from 'react'
import type { Locale } from './locales'
import type { Messages } from './messages'

export interface LocaleContextValue {
    locale: Locale
    messages: Messages
    setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale(): LocaleContextValue {
    const value = useContext(LocaleContext)
    if (!value) {
        throw new Error('useLocale must be used within a LocaleProvider.')
    }
    return value
}

export function useMessages(): Messages {
    return useLocale().messages
}
