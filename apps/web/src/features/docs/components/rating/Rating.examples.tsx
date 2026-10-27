import { Rating } from '@monority/ui/rating'
import { Stack } from '@monority/ui/stack'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'

export function RatingBasicExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [score, setScore] = useState(4)

    return (
        <Stack gap="sm" align="start">
            <Rating value={score} onChange={setScore} />
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
                {isFr ? 'Note sélectionnée : ' : 'Selected score: '}
                {score} / 5
            </p>
        </Stack>
    )
}

export function RatingSizesExample() {
    return (
        <Stack gap="md" align="start">
            <Rating size="sm" defaultValue={3} />
            <Rating size="md" defaultValue={4} />
            <Rating size="lg" defaultValue={5} />
        </Stack>
    )
}

export function RatingReadOnlyExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Stack gap="sm" align="start">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Rating value={5} readOnly size="sm" />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {isFr ? '5.0 (248 avis clients)' : '5.0 (248 customer reviews)'}
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Rating value={3} readOnly size="sm" />
                <span style={{ fontSize: '0.875rem', color: 'var(--mr-text-secondary)' }}>
                    {isFr ? 'Évaluation moyenne produit' : 'Average product score'}
                </span>
            </div>
        </Stack>
    )
}
