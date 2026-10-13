export const fieldMeta = {
    title: 'Field',
    status: 'stable',
    package: '@monority/ui/field',
    import: "import { Field } from '@monority/ui'",
    category: 'forms',
    anatomy: ['root', 'label', 'content', 'description', 'error'],
    accessibility: [
        'Automatic label htmlFor to control id binding',
        'aria-describedby linking hints and error messages',
        'aria-invalid passed to enclosed input when error is present',
    ],
}
