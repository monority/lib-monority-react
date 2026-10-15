import { useState } from 'react'
import { Slider } from '@monority/ui/slider'
import { Stack } from '@monority/ui/stack'

export function SliderBasicExample() {
    return <Slider label="Volume" defaultValue={50} />
}

export function SliderSizesExample() {
    return (
        <Stack gap="md">
            <Slider label="Compact (sm)" size="sm" defaultValue={30} />
            <Slider label="Standard (md)" size="md" defaultValue={50} />
            <Slider label="Confort (lg)" size="lg" defaultValue={75} />
        </Stack>
    )
}

export function SliderTonesExample() {
    return (
        <Stack gap="md">
            <Slider label="Neutre" tone="neutral" defaultValue={40} />
            <Slider label="Accent (marque)" tone="accent" defaultValue={65} />
            <Slider label="Alerte (danger)" tone="danger" defaultValue={85} />
        </Stack>
    )
}

export function SliderDualRangeExample() {
    return (
        <Slider
            label="Fourchette de prix"
            hint="Sélectionnez un budget minimum et maximum en euros"
            range
            min={0}
            max={500}
            step={10}
            defaultValue={[100, 350]}
        />
    )
}

export function SliderWithStepsExample() {
    return (
        <Slider
            label="Niveau de qualité"
            hint="Incrémentation par palier de 25%"
            min={0}
            max={100}
            step={25}
            defaultValue={50}
        />
    )
}

export function SliderDisabledExample() {
    return <Slider label="Sortie audio verrouillée" disabled defaultValue={60} />
}

export function SliderWithErrorExample() {
    return (
        <Slider
            label="Fréquence"
            defaultValue={95}
            error="La valeur dépasse le seuil critique autorisé"
        />
    )
}

export function SliderControlledExample() {
    const [val, setVal] = useState(42)
    return (
        <Slider
            label="Luminosité dynamique"
            value={val}
            onValueChange={setVal}
            hint={`Valeur active dans l'état : ${val}%`}
        />
    )
}
