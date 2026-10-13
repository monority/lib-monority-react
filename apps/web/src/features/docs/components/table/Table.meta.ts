export const tableMeta = {
    title: 'Table',
    status: 'stable',
    package: '@monority/ui/table',
    import: "import { Table } from '@monority/ui'",
    category: 'data',
    anatomy: ['root', 'caption', 'header', 'head', 'body', 'row', 'cell', 'footer'],
    accessibility: [
        'Native HTML <table>, <thead>, <tbody>, <th> with scope, <td>',
        'Semantic structure ensures screen reader table navigation shortcuts work',
    ],
}
