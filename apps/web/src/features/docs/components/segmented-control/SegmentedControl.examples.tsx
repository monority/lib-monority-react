import { useState } from 'react'
import { SegmentedControl } from '@monority/ui/segmented-control'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'

const viewOptions = [
    { value: 'grid', label: 'Vue Grille' },
    { value: 'list', label: 'Vue Liste' },
    { value: 'table', label: 'Vue Tableau' },
]

export function SegmentedControlBasicExample() {
    const [view, setView] = useState('grid')

    return (
        <Stack gap="md" align="start">
            <SegmentedControl options={viewOptions} value={view} onChange={setView} />
            <p style={{ margin: 0, fontSize: '0.875rem' }}>Vue active : {view}</p>
        </Stack>
    )
}

export function SegmentedControlSizesExample() {
    return (
        <Stack gap="md" align="start">
            <SegmentedControl
                size="sm"
                defaultValue="day"
                options={[
                    { value: 'day', label: 'Jour' },
                    { value: 'week', label: 'Semaine' },
                    { value: 'month', label: 'Mois' },
                ]}
            />
            <SegmentedControl
                size="md"
                defaultValue="week"
                options={[
                    { value: 'day', label: 'Jour' },
                    { value: 'week', label: 'Semaine' },
                    { value: 'month', label: 'Mois' },
                ]}
            />
            <SegmentedControl
                size="lg"
                defaultValue="month"
                options={[
                    { value: 'day', label: 'Jour' },
                    { value: 'week', label: 'Semaine' },
                    { value: 'month', label: 'Mois' },
                ]}
            />
        </Stack>
    )
}

export function SegmentedControlCompoundExample() {
    return (
        <Card padding="md">
            <Stack gap="md">
                <strong>Mode d affichage du document</strong>
                <SegmentedControl defaultValue="preview" fullWidth>
                    <SegmentedControl.Item value="edit">Edition</SegmentedControl.Item>
                    <SegmentedControl.Item value="preview">Apercu direct</SegmentedControl.Item>
                    <SegmentedControl.Item value="split">Vue partagee</SegmentedControl.Item>
                </SegmentedControl>
            </Stack>
        </Card>
    )
}
