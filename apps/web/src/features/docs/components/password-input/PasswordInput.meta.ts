export const passwordInputMeta = {
    title: 'PasswordInput',
    status: 'stable',
    package: '@monority/ui/password-input',
    import: "import { PasswordInput } from '@monority/ui/password-input'",
    category: 'forms',
    anatomy: ['field', 'label', 'input', 'toggle-button', 'hint', 'error'],
    accessibility: [
        'Accessible visibility toggle with aria-label',
        'aria-describedby for hints and errors',
        'autocomplete="current-password" support',
    ],
}
