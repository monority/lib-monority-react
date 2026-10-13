export const dataTableMeta = {
    title: 'DataTable',
    status: 'stable',
    package: '@monority/ui/data-table',
    import: "import { DataTable } from '@monority/ui'",
    category: 'data',
    anatomy: [
        'root',
        'toolbar',
        'table',
        'header',
        'sortHeader',
        'body',
        'row',
        'cell',
        'pagination',
        'selection',
    ],
    accessibility: [
        'Interactive column sort headers have aria-sort attribute',
        'Row selection checkboxes have clear accessible names',
        'Keyboard sort activation via Enter and Space keys',
    ],
}
