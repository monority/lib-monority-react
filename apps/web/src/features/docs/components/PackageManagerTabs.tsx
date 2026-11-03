import { CodeBlock } from '@/shared/components/CodeViewer'
import '@/shared/components/CodeViewer/CodeViewer.css'
import { LocaleContext } from '@/shared/i18n/locale-context'
import { common as enCommon } from '@/shared/i18n/messages/en/common'
import { CopyButton } from '@monority/ui/copy-button'
import {
    type KeyboardEvent,
    useCallback,
    useContext,
    useId,
    useRef,
    useSyncExternalStore,
} from 'react'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const PACKAGE_MANAGERS: readonly PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun']
const PM_STORAGE_KEY = 'mr-docs-pm'
const PM_CHANGE_EVENT = 'mr-docs-pm-change'

function isPackageManager(value: string | null): value is PackageManager {
    return value === 'pnpm' || value === 'npm' || value === 'yarn' || value === 'bun'
}

function getStoredPackageManager(): PackageManager {
    if (typeof window === 'undefined') return 'pnpm'
    try {
        const stored = window.localStorage.getItem(PM_STORAGE_KEY)
        return isPackageManager(stored) ? stored : 'pnpm'
    } catch {
        return 'pnpm'
    }
}

function subscribePackageManager(onStoreChange: () => void) {
    if (typeof window === 'undefined') return () => undefined
    window.addEventListener(PM_CHANGE_EVENT, onStoreChange)
    window.addEventListener('storage', onStoreChange)
    return () => {
        window.removeEventListener(PM_CHANGE_EVENT, onStoreChange)
        window.removeEventListener('storage', onStoreChange)
    }
}

function setStoredPackageManager(next: PackageManager) {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(PM_STORAGE_KEY, next)
    } catch {
        // Storage may be unavailable in restricted contexts; dispatch still updates live tabs.
    }
    window.dispatchEvent(new Event(PM_CHANGE_EVENT))
}

function buildDefaultCommands(packageName: string): Record<PackageManager, string> {
    return {
        pnpm: `pnpm add ${packageName}`,
        npm: `npm install ${packageName}`,
        yarn: `yarn add ${packageName}`,
        bun: `bun add ${packageName}`,
    }
}

export interface PackageManagerTabsProps {
    packageName?: string
    commands?: Partial<Record<PackageManager, string>>
    className?: string
}

export function PackageManagerTabs({
    packageName = '@monority/ui',
    commands,
    className = '',
}: PackageManagerTabsProps) {
    const instanceId = useId()
    const codeMessages = useContext(LocaleContext)?.messages.common.code ?? enCommon.code
    const activePm = useSyncExternalStore(
        subscribePackageManager,
        getStoredPackageManager,
        () => 'pnpm' as PackageManager
    )
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

    const resolvedCommands = {
        ...buildDefaultCommands(packageName),
        ...commands,
    }
    const activeCommand = resolvedCommands[activePm]

    const selectAtIndex = useCallback((index: number) => {
        const clamped = (index + PACKAGE_MANAGERS.length) % PACKAGE_MANAGERS.length
        const target = PACKAGE_MANAGERS[clamped]
        if (!target) return
        setStoredPackageManager(target)
        tabRefs.current[clamped]?.focus()
    }, [])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault()
                selectAtIndex(index + 1)
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault()
                selectAtIndex(index - 1)
            } else if (event.key === 'Home') {
                event.preventDefault()
                selectAtIndex(0)
            } else if (event.key === 'End') {
                event.preventDefault()
                selectAtIndex(PACKAGE_MANAGERS.length - 1)
            }
        },
        [selectAtIndex]
    )

    const panelId = `${instanceId}-panel`
    const activeTabId = `${instanceId}-tab-${activePm}`

    return (
        <div className={`code-viewer docs-pm-tabs ${className}`.trim()}>
            <div className="code-viewer__header docs-pm-tabs__header">
                <div
                    role="tablist"
                    aria-label={codeMessages.packageManagerAriaLabel}
                    className="docs-pm-tabs__list"
                >
                    {PACKAGE_MANAGERS.map((pm, index) => {
                        const isSelected = pm === activePm
                        return (
                            <button
                                key={pm}
                                ref={(node) => {
                                    tabRefs.current[index] = node
                                }}
                                id={`${instanceId}-tab-${pm}`}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls={panelId}
                                tabIndex={isSelected ? 0 : -1}
                                className="docs-pm-tabs__trigger"
                                onClick={() => setStoredPackageManager(pm)}
                                onKeyDown={(event) => handleKeyDown(event, index)}
                            >
                                {pm}
                            </button>
                        )
                    })}
                </div>
                <CopyButton
                    value={activeCommand}
                    size="sm"
                    variant="subtle"
                    label={codeMessages.copy}
                    copiedLabel={codeMessages.copied}
                    aria-label={codeMessages.copyAriaLabel}
                    className="docs-copy-btn"
                />
            </div>
            <div
                id={panelId}
                role="tabpanel"
                aria-labelledby={activeTabId}
                className="code-viewer__body docs-pm-tabs__body"
                tabIndex={0}
            >
                <div className="docs-pm-tabs__command">
                    <span className="docs-pm-tabs__prompt" aria-hidden="true">
                        $
                    </span>
                    <CodeBlock language="bash">{activeCommand}</CodeBlock>
                </div>
            </div>
        </div>
    )
}
