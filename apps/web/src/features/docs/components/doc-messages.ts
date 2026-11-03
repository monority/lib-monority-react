import { useLocale } from '@/shared/i18n'
import { cloneElement, isValidElement, type ReactElement } from 'react'
import type { DocPageData } from './DocPage'
import type {
    ComponentPlaygroundProps,
    PlaygroundControl,
} from './ComponentPlayground/ComponentPlayground.types'

export interface DocMessagesOverlay {
    description?: string
    previewLabel?: string
    playgroundLabels?: Record<string, string>
    examples?: { title?: string }[]
    propDescriptions?: Record<string, string>
    keyboardNavigation?: { key?: string; action?: string; context?: string }[]
    a11y?: string[]
}

export interface DocI18n {
    fr?: DocMessagesOverlay
}

function overlayControl(control: PlaygroundControl, label: string | undefined): PlaygroundControl {
    if (!label) return control
    return { ...control, label }
}

export function localizeDoc(doc: DocPageData, locale: string): DocPageData {
    if (locale !== 'fr') return doc
    const overlay = doc.i18n?.fr
    if (!overlay) return doc

    const localized: DocPageData = { ...doc }

    if (overlay.description !== undefined) {
        localized.description = overlay.description
    }
    if (overlay.previewLabel !== undefined) {
        localized.previewLabel = overlay.previewLabel
    }

    if (overlay.playgroundLabels && isValidElement(doc.playground)) {
        localized.playground = cloneElement(
            doc.playground as ReactElement<ComponentPlaygroundProps>,
            {
                labelOverrides: overlay.playgroundLabels,
            }
        )
    }

    if (localized.playgroundConfig && overlay.playgroundLabels) {
        localized.playgroundConfig = {
            ...localized.playgroundConfig,
            controls: localized.playgroundConfig.controls.map((control, index) =>
                overlayControl(control, overlay.playgroundLabels?.[control.name ?? String(index)])
            ),
        }
    }

    if (localized.examples && overlay.examples) {
        localized.examples = localized.examples.map((example, index) => {
            const title = overlay.examples?.[index]?.title
            return title === undefined ? example : { ...example, title }
        })
    }

    if (localized.props && overlay.propDescriptions) {
        localized.props = localized.props.map((prop) => {
            const description = overlay.propDescriptions?.[prop.name]
            return description === undefined ? prop : { ...prop, description }
        })
    }

    if (localized.keyboardNavigation && overlay.keyboardNavigation) {
        localized.keyboardNavigation = localized.keyboardNavigation.map((row, index) => {
            const translated = overlay.keyboardNavigation?.[index]
            if (!translated) return row
            return {
                key: translated.key ?? row.key,
                action: translated.action ?? row.action,
                context: translated.context ?? row.context,
            }
        })
    }

    if (localized.a11y && overlay.a11y) {
        localized.a11y = localized.a11y.map((line, index) => overlay.a11y?.[index] ?? line)
    }

    return localized
}

export function useLocalizedDoc(doc: DocPageData): DocPageData {
    const { locale } = useLocale()
    return localizeDoc(doc, locale)
}
