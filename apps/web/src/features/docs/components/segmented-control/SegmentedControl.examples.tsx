import { Card } from '@monority/ui/card'
import { SegmentedControl } from '@monority/ui/segmented-control'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'

export function SegmentedControlBasicExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [view, setView] = useState('grid')

    const viewOptions = isFr
        ? [
              { value: 'grid', label: 'Vue Grille' },
              { value: 'list', label: 'Vue Liste' },
              { value: 'table', label: 'Vue Tableau' },
          ]
        : [
              { value: 'grid', label: 'Grid view' },
              { value: 'list', label: 'List view' },
              { value: 'table', label: 'Table view' },
          ]

    return (
        <Stack gap="md" align="start">
            <SegmentedControl options={viewOptions} value={view} onChange={setView} />
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
                {isFr ? 'Vue active : ' : 'Active view: '}
                {view}
            </p>
        </Stack>
    )
}

export function SegmentedControlSizesExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    const timeOptions = isFr
        ? [
              { value: 'day', label: 'Jour' },
              { value: 'week', label: 'Semaine' },
              { value: 'month', label: 'Mois' },
          ]
        : [
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
          ]

    return (
        <Stack gap="md" align="start">
            <SegmentedControl size="sm" defaultValue="day" options={timeOptions} />
            <SegmentedControl size="md" defaultValue="week" options={timeOptions} />
            <SegmentedControl size="lg" defaultValue="month" options={timeOptions} />
        </Stack>
    )
}

export function SegmentedControlCompoundExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Card padding="md">
            <Stack gap="md">
                <Text.Strong>
                    {isFr ? 'Mode d’affichage du document' : 'Document display mode'}
                </Text.Strong>
                <SegmentedControl defaultValue="preview" fullWidth>
                    <SegmentedControl.Item value="edit">
                        {isFr ? 'Édition' : 'Edit'}
                    </SegmentedControl.Item>
                    <SegmentedControl.Item value="preview">
                        {isFr ? 'Aperçu direct' : 'Live preview'}
                    </SegmentedControl.Item>
                    <SegmentedControl.Item value="split">
                        {isFr ? 'Vue partagée' : 'Split view'}
                    </SegmentedControl.Item>
                </SegmentedControl>
            </Stack>
        </Card>
    )
}
