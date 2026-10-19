import { useEffect, useRef, useState } from 'react'

export interface UsePresenceOptions {
    /**
     * Duree de l'animation de sortie en millisecondes.
     * Correspond par defaut au token --mr-duration-state (150ms).
     */
    durationMs?: number
}

export interface UsePresenceReturn {
    /**
     * Indique si l'element doit etre present dans l'arborescence DOM.
     * Reste true pendant toute la phase de fermeture animee.
     */
    isMounted: boolean
    /**
     * Indique si l'element est en cours de fermeture animee.
     */
    isClosing: boolean
    /**
     * Attributs de statut standardises pour styler l'etat via CSS.
     */
    presenceProps: {
        'data-state': 'open' | 'closed'
        'data-closing'?: ''
    }
}

/**
 * usePresence orchestre le cycle de vie de montage et demontage d'un composant
 * necessitant une animation de sortie (fade-out, scale-out, slide-out).
 *
 * Lorsque `open` passe de true a false, le composant reste monte dans le DOM
 * pendant `durationMs` sous l'attribut `data-closing`. Il est demonte a la fin du delai.
 *
 * Lorsque `open` passe a true, le montage est immediat et synchrone des la premiere passe.
 *
 * Si `prefers-reduced-motion` est actif ou `durationMs <= 0`, le demontage est synchrone (0ms).
 */
export function usePresence(open: boolean, options: UsePresenceOptions = {}): UsePresenceReturn {
    const { durationMs = 150 } = options
    const [isClosing, setIsClosing] = useState(false)
    const prevOpenRef = useRef(open)
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    // Nettoyage systematique a la destruction
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const wasOpen = prevOpenRef.current
        prevOpenRef.current = open

        if (open) {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = undefined
            }
            setIsClosing(false)
            return
        }

        // Si open n'a pas bascule de true a false, rien a faire
        if (!wasOpen) {
            return
        }

        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (durationMs <= 0 || prefersReducedMotion) {
            setIsClosing(false)
            return
        }

        setIsClosing(true)
        timerRef.current = setTimeout(() => {
            setIsClosing(false)
            timerRef.current = undefined
        }, durationMs)

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = undefined
            }
        }
    }, [open, durationMs])

    const isMounted = open || isClosing

    return {
        isMounted,
        isClosing,
        presenceProps: {
            'data-state': open ? 'open' : 'closed',
            'data-closing': isClosing ? '' : undefined,
        },
    }
}
