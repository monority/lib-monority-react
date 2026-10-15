import { Badge } from '@monority/ui/badge'
import { ButtonLink } from '@monority/ui/button-link'
import { DataList } from '@monority/ui/data-list'

export function DataListBasicExample() {
    return (
        <DataList
            items={[
                { key: 'package', label: 'Package', value: '@monority/ui' },
                { key: 'version', label: 'Version', value: '0.1.0' },
                { key: 'license', label: 'License', value: 'MIT' },
                { key: 'runtime', label: 'Runtime', value: 'React 19+' },
            ]}
        />
    )
}

export function DataListWithRenderExample() {
    return (
        <DataList
            items={[
                {
                    key: 'status',
                    label: 'Status',
                    value: 'stable',
                    render: (value) => (
                        <Badge variant="default">{String(value).toUpperCase()}</Badge>
                    ),
                },
                {
                    key: 'release',
                    label: 'Release notes',
                    value: 'View changelog',
                    render: (value) => <ButtonLink href="#">{value}</ButtonLink>,
                },
                {
                    key: 'owner',
                    label: 'Owner',
                    value: 'Design system',
                },
            ]}
        />
    )
}

export function DataListSplitExample() {
    return (
        <DataList
            columns="split"
            items={[
                { key: 'name', label: 'Component', value: 'DataTable' },
                { key: 'category', label: 'Category', value: 'Data display' },
                { key: 'theme', label: 'Theme aware', value: 'Yes' },
                { key: 'keyboard', label: 'Keyboard support', value: 'Native' },
            ]}
        />
    )
}

export function DataListCompoundExample() {
    return (
        <DataList columns="split">
            <DataList.Item>
                <DataList.Label>Framework</DataList.Label>
                <DataList.Value>React 19</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Architecture</DataList.Label>
                <DataList.Value>Compound Subcomponents</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>CSS Foundation</DataList.Label>
                <DataList.Value>@layer mr.*</DataList.Value>
            </DataList.Item>
        </DataList>
    )
}
