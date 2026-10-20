import { useCallback, useEffect, useRef, useState } from 'react'

export interface UsePresenceOptions {
    /**
     * Duree de repli (fallback timer) de l'animation de sortie en millisecondes.
     * Si l'evenement natif `animationend` n'est pas declenche ou si aucun ref n'est attache,
     * l'element sera demonte a l'issue de ce delai.
     * Correspond par defaut au token --mr-duration-panel (280ms).
     */
    durationMs?: number
    /**
     * Callback optionnel appele des que l'animation de sortie est achevee
     * et que l'element est pret a etre retire de l'arborescence DOM.
     */
    onExitComplete?: () => void
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
    /**
     * Ref callback a brancher optionnellement sur l'element DOM anime pour
     * synchroniser le demontage a la frame pres via l'evenement natif `animationend`.
     */
    ref: (node: HTMLElement | null) => void
}

/**
 * Verifie si le mouvement reduit est requis par l'OS,
 * sauf si explicitement debraye par l'attribut `data-motion="always"`.
 */
export function isReducedMotionPreferred(): boolean {
    if (typeof document !== 'undefined') {
        const motionAttr =
            document.documentElement?.getAttribute('data-motion') ||
            document.body?.getAttribute('data-motion')
        if (motionAttr === 'always') return false
        if (motionAttr === 'reduce') return true
    }

    if (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return true
    }

    return false
}

/**
 * usePresence orchestre le cycle de vie de montage et demontage d'un composant
 * necessitant une animation de sortie (fade-out, scale-out, slide-out).
 *
 * Lorsque `open` passe de true a false, le composant reste monte dans le DOM
 * sous l'attribut `data-closing` et `data-state="closed"`.
 *
 * Le demontage est declenche :
 * - soit des la reception de l'evenement natif `animationend` si un ref est branche.
 * - soit au terme du delai de garde `durationMs` (filet de securite).
 *
 * Lorsque `open` repasse a true, le montage est immediat et synchrone.
 */
export function usePresence(open: boolean, options: UsePresenceOptions = {}): UsePresenceReturn {
    const { durationMs = 280, onExitComplete } = options
    const [isClosing, setIsClosing] = useState(false)
    const [node, setNode] = useState<HTMLElement | null>(null)
    const prevOpenRef = useRef(open)
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const onExitCompleteRef = useRef(onExitComplete)

    useEffect(() => {
        onExitCompleteRef.current = onExitComplete
    })

    const finishClosing = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = undefined
        }
        setIsClosing(false)
        onExitCompleteRef.current?.()
    }, [])

    // Nettoyage systematique a la destruction
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = undefined
            }
        }
    }, [])

    // Ecoute de l'evenement DOM natif animationend specifique a l'animation de sortie
    useEffect(() => {
        if (!isClosing || !node) return

        function handleAnimationEnd(event: AnimationEvent) {
            if (event.target !== node) return

            // Ne terminer la fermeture que si l'animation qui s'acheve est bien l'animation de sortie
            // (evite que la fin ou l'annulation d'une animation d'entree ne coupe prematurement la transition)
            const name = (event.animationName || '').toLowerCase()
            const isExit =
                !name ||
                name.includes('exit') ||
                name.includes('out') ||
                name.includes('leave') ||
                name.includes('close')

            if (isExit) {
                finishClosing()
            }
        }

        node.addEventListener('animationend', handleAnimationEnd)

        return () => {
            node.removeEventListener('animationend', handleAnimationEnd)
        }
    }, [isClosing, node, finishClosing])

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

        const reducedMotion = isReducedMotionPreferred()

        if (durationMs <= 0 || reducedMotion) {
            setIsClosing(false)
            onExitCompleteRef.current?.()
            return
        }

        setIsClosing(true)
        timerRef.current = setTimeout(() => {
            finishClosing()
        }, durationMs)

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = undefined
            }
        }
    }, [open, durationMs, finishClosing])

    const isMounted = open || isClosing

    return {
        isMounted,
        isClosing,
        ref: setNode,
        presenceProps: {
            'data-state': open ? 'open' : 'closed',
            'data-closing': isClosing ? '' : undefined,
        },
    }
}
