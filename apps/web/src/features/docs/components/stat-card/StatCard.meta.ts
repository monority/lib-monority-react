export const statCardMeta = {
    title: 'StatCard',
    status: 'stable',
    package: '@monority/ui/stat-card',
    import: "import { StatCard } from '@monority/ui'",
    category: 'data',
    anatomy: ['root', 'header', 'label', 'value', 'trend', 'description', 'footer'],
    accessibility: [
        'Trend direction and delta values announced as accessible text, not color alone',
        'Numerical values formatted clearly for assistive technology',
    ],
}
