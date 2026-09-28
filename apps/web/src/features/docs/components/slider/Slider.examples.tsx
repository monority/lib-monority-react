import { Slider } from '@monority/ui/slider'

export function SliderBasicExample() {
    return <Slider label="Volume" />
}

export function SliderWithRangeExample() {
    return <Slider label="Price range" min={0} max={1000} step={50} defaultValue={500} />
}

export function SliderDisabledExample() {
    return <Slider label="Volume" disabled />
}

export function SliderWithErrorExample() {
    return <Slider label="Volume" error="Value must be between 0 and 100" />
}

export function SliderWithoutValueExample() {
    return <Slider label="Brightness" showValue={false} />
}
