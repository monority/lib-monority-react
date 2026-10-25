import { Button, DropdownMenu, type DropdownMenuItemData } from '@monority/ui'
import { useLocale, useMessages } from '../i18n'
import { type Locale, SUPPORTED_LOCALES } from '../i18n/locales'

const LANGUAGE_LABELS: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
}

export function LocaleSwitcher({ className }: { className?: string }) {
    const { locale, setLocale } = useLocale()
    const nav = useMessages().nav
    const messages = nav.language

    const items: DropdownMenuItemData[] = SUPPORTED_LOCALES.map((value) => ({
        value,
        label: LANGUAGE_LABELS[value],
        shortcut: value === locale ? nav.theme.active : undefined,
        onSelect: () => setLocale(value),
    }))

    return (
        <DropdownMenu
            align="end"
            side="bottom"
            trigger={
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className={className}
                    aria-label={messages.current(LANGUAGE_LABELS[locale])}
                    iconLeading={
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    }
                >
                    {locale.toUpperCase()}
                </Button>
            }
            items={items}
        />
    )
}
