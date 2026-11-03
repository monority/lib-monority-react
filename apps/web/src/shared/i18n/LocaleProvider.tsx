import { type ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LocaleContext } from './locale-context'
import { getLocaleFromPath, type Locale, localizePath, persistLocale } from './locales'
import { messages } from './messages'

export interface LocaleProviderProps {
    children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
    const { pathname, search, hash } = useLocation()
    const navigate = useNavigate()
    const locale = getLocaleFromPath(pathname)

    useEffect(() => {
        document.documentElement.lang = locale
        document.documentElement.dataset.locale = locale
    }, [locale])

    const setLocale = useCallback(
        (nextLocale: Locale) => {
            persistLocale(nextLocale)
            if (nextLocale === locale) return
            navigate({ pathname: localizePath(pathname, nextLocale), search, hash })
        },
        [hash, locale, navigate, pathname, search]
    )

    const value = useMemo(
        () => ({ locale, messages: messages[locale], setLocale }),
        [locale, setLocale]
    )

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
