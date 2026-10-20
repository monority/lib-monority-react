import { Button } from '@monority/ui'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'monority-motion'

export function MotionToggle({ className }: { className?: string }) {
    const [motionMode, setMotionMode] = useState<'always' | 'reduce'>(() => {
        if (typeof window === 'undefined') return 'always'
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'always' || saved === 'reduce') return saved
        return 'always'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-motion', motionMode)
        try {
            localStorage.setItem(STORAGE_KEY, motionMode)
        } catch {
            // Ignore localStorage exceptions in private mode
        }
    }, [motionMode])

    const isAlways = motionMode === 'always'

    function toggleMotion() {
        setMotionMode((prev) => (prev === 'always' ? 'reduce' : 'always'))
    }

    return (
        <Button
            type="button"
            size="sm"
            variant="ghost"
            className={className}
            onClick={toggleMotion}
            aria-label={
                isAlways
                    ? 'Animations actives. Cliquer pour reduire le mouvement.'
                    : 'Animations reduites. Cliquer pour activer le mouvement.'
            }
            iconLeading={
                isAlways ? (
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                ) : (
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                )
            }
        >
            {isAlways ? 'Motion: On' : 'Motion: Off'}
        </Button>
    )
}
