export const textareaMeta = {
    title: 'Textarea',
    status: 'stable',
    package: '@monority/ui/textarea',
    import: "import { Textarea } from '@monority/ui/textarea'",
    category: 'forms',
    anatomy: ['root', 'label', 'hint', 'error', 'counter'],
    accessibility: [
        'Native <textarea> semantics, associated label via htmlFor',
        'aria-invalid set when error is provided',
        'aria-describedby connects hint and error',
        'aria-live="polite" on character counter',
        'Visible focus ring',
        'Disabled state prevents interaction',
    ],
}
