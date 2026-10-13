export const colorSwatchMeta = {
    title: 'ColorSwatch',
    status: 'stable',
    package: '@monority/ui/color-swatch',
    import: "import { ColorSwatch } from '@monority/ui'",
    category: 'display',
    anatomy: ['root', 'preview', 'content', 'label', 'value'],
    accessibility: [
        'Hidden preview from screen readers when visual-only.',
        'Supports accessible role="img" with aria-label or accessible text via label/showValue.',
    ],
}
