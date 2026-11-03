import { DataList } from '@monority/ui/data-list'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    DataListCompoundExample,
    DataListSplitExample,
    DataListWithRenderExample,
} from './DataList.examples'
import { dataListI18n } from './DataList.messages'

function DataListPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [columns, setColumns] = useState<'auto' | 'split'>('split')
    const [itemCount, setItemCount] = useState<'2' | '3' | '4'>('3')

    const baseItems = isFr
        ? [
              { label: 'Identifiant client', value: 'USR-89421' },
              { label: 'Plan d’abonnement', value: 'Enterprise Edition' },
              { label: 'Statut du compte', value: 'Actif (vérifié)' },
              { label: 'Dernière connexion', value: 'Aujourd’hui à 14:32' },
          ]
        : [
              { label: 'Customer ID', value: 'USR-89421' },
              { label: 'Subscription tier', value: 'Enterprise Edition' },
              { label: 'Account status', value: 'Active (verified)' },
              { label: 'Last login', value: 'Today at 14:32' },
          ]

    const selectedItems = baseItems.slice(0, Number(itemCount))

    const snippet = `<DataList
  columns="${columns}"
  items={[
${selectedItems.map((item) => `    { label: '${item.label}', value: '${item.value}' }`).join(',\n')}
  ]}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: isFr ? 'Disposition colonnes' : 'Column layout',
                    value: columns,
                    options: [
                        {
                            value: 'split',
                            label: isFr ? 'Split (étiquette à gauche)' : 'Split (label on left)',
                        },
                        {
                            value: 'auto',
                            label: isFr ? 'Auto (empilé)' : 'Auto (stacked)',
                        },
                    ],
                    onChange: (v) => setColumns(v as 'auto' | 'split'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Nombre d’éléments' : 'Item count',
                    value: itemCount,
                    options: [
                        { value: '2', label: isFr ? '2 lignes' : '2 rows' },
                        { value: '3', label: isFr ? '3 lignes' : '3 rows' },
                        { value: '4', label: isFr ? '4 lignes' : '4 rows' },
                    ],
                    onChange: (v) => setItemCount(v as '2' | '3' | '4'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div style={{ maxWidth: 480, margin: '0 auto', width: '100%' }}>
                <DataList columns={columns} items={selectedItems} />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'DataList',
    description:
        'A structured key-value panel for metadata, system facts, and compact read-only records.',
    importCode: "import { DataList } from '@monority/ui/data-list'",
    usageCode: `<DataList items={[
  { label: 'Email', value: 'john@example.com' },
  { label: 'Role', value: 'Developer' },
]} />`,
    preview: () => <DataListPlayground />,
    examples: [
        {
            title: 'Compound composition',
            content: <DataListCompoundExample />,
            code: `<DataList columns="split">
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
</DataList>`,
        },
        {
            title: 'With render',
            content: <DataListWithRenderExample />,
            code: `<DataList items={[
  { label: 'Status', value: 'stable', render: (value) => <Badge variant="default">{String(value).toUpperCase()}</Badge> },
  { label: 'Release notes', value: 'View changelog', render: (value) => <ButtonLink href="#">{value}</ButtonLink> },
]} />`,
        },
        {
            title: 'Split layout',
            content: <DataListSplitExample />,
            code: `<DataList columns="split" items={[
  { label: 'Component', value: 'DataTable' },
  { label: 'Category', value: 'Data display' },
  { label: 'Theme aware', value: 'Yes' },
]} />`,
        },
    ],
    props: [
        {
            name: 'items',
            type: `{ key?: string; label: ReactNode; value: ReactNode; render?: (value, item, index) => ReactNode }[]`,
            defaultValue: '[]',
            description: 'Key-value pairs.',
        },
        {
            name: 'columns',
            type: `'auto' | 'split'`,
            defaultValue: '-',
            description: 'Column layout mode.',
        },
        {
            name: 'className',
            type: `string`,
            defaultValue: '-',
            description: 'Additional class name.',
        },
    ],
    cssHooks: [
        '.mr-data-list',
        '.mr-data-list__item',
        '.mr-data-list__label',
        '.mr-data-list__value',
        '[data-columns]',
    ],
    tokens: ['--mr-border-subtle', '--mr-bg-raised', '--mr-text-secondary', '--mr-text-primary'],
    a11y: ['Uses native definition list semantics.', 'Keep labels concise and values scannable.'],
    i18n: dataListI18n,
}

export function DataListDocs() {
    return <DocPage doc={docData} />
}
