import { Slider } from '@monority/ui/slider'
import { Stack } from '@monority/ui/stack'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'

export function SliderBasicExample() {
    return <Slider label="Volume" defaultValue={50} />
}

export function SliderSizesExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Stack gap="md">
            <Slider label={isFr ? 'Compact (sm)' : 'Compact (sm)'} size="sm" defaultValue={30} />
            <Slider label={isFr ? 'Standard (md)' : 'Standard (md)'} size="md" defaultValue={50} />
            <Slider label={isFr ? 'Confort (lg)' : 'Comfort (lg)'} size="lg" defaultValue={75} />
        </Stack>
    )
}

export function SliderTonesExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Stack gap="md">
            <Slider label={isFr ? 'Neutre' : 'Neutral'} tone="neutral" defaultValue={40} />
            <Slider
                label={isFr ? 'Accent (marque)' : 'Accent (brand)'}
                tone="accent"
                defaultValue={65}
            />
            <Slider
                label={isFr ? 'Alerte (danger)' : 'Alert (danger)'}
                tone="danger"
                defaultValue={85}
            />
        </Stack>
    )
}

export function SliderDualRangeExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Slider
            label={isFr ? 'Fourchette de prix' : 'Price range'}
            hint={
                isFr
                    ? 'Sélectionnez un budget minimum et maximum'
                    : 'Select a minimum and maximum budget'
            }
            range
            min={0}
            max={500}
            step={10}
            defaultValue={[100, 350]}
        />
    )
}

export function SliderWithStepsExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Slider
            label={isFr ? 'Niveau de qualité' : 'Quality level'}
            hint={isFr ? 'Incrémentation par palier de 25%' : '25% step increments'}
            min={0}
            max={100}
            step={25}
            defaultValue={50}
        />
    )
}

export function SliderDisabledExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Slider
            label={isFr ? 'Sortie audio verrouillée' : 'Locked audio output'}
            disabled
            defaultValue={60}
        />
    )
}

export function SliderWithErrorExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Slider
            label={isFr ? 'Fréquence' : 'Frequency'}
            defaultValue={95}
            error={
                isFr
                    ? 'La valeur dépasse le seuil critique autorisé'
                    : 'Value exceeds maximum critical threshold'
            }
        />
    )
}

export function SliderControlledExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [val, setVal] = useState(42)

    return (
        <Slider
            label={isFr ? 'Luminosité dynamique' : 'Dynamic brightness'}
            value={val}
            onValueChange={setVal}
            hint={isFr ? `Valeur active dans l'état : ${val}%` : `Active state value: ${val}%`}
        />
    )
}
