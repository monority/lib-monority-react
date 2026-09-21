import type { PlaygroundDefinition } from './playground-types'
import { alertDialogPlayground } from './adapters/alert-dialog.adapter'
import { badgePlayground } from './adapters/badge.adapter'
import { breadcrumbPlayground } from './adapters/breadcrumb.adapter'
import { buttonPlayground } from './adapters/button.adapter'
import { calloutPlayground } from './adapters/callout.adapter'
import { cardPlayground } from './adapters/card.adapter'
import { inputPlayground } from './adapters/input.adapter'
import { modalPlayground } from './adapters/modal.adapter'
import { radioGroupPlayground } from './adapters/radio-group.adapter'
import { sectionPlayground } from './adapters/section.adapter'
import { selectPlayground } from './adapters/select.adapter'
import { separatorPlayground } from './adapters/separator.adapter'
import { skeletonPlayground } from './adapters/skeleton.adapter'
import { spinnerPlayground } from './adapters/spinner.adapter'
import { switchPlayground } from './adapters/switch.adapter'
import { tabsPlayground } from './adapters/tabs.adapter'
import { textareaPlayground } from './adapters/textarea.adapter'
import { togglePlayground } from './adapters/toggle.adapter'

/**
 * Single source of truth for the Playground.
 * Entries are limited to stable components (see docs registry status).
 * To add a component later, create its adapter and append it here.
 */
export const playgroundRegistry: PlaygroundDefinition[] = [
    buttonPlayground,
    inputPlayground,
    textareaPlayground,
    selectPlayground,
    switchPlayground,
    radioGroupPlayground,
    badgePlayground,
    calloutPlayground,
    skeletonPlayground,
    spinnerPlayground,
    modalPlayground,
    alertDialogPlayground,
    togglePlayground,
    tabsPlayground,
    breadcrumbPlayground,
    cardPlayground,
    sectionPlayground,
    separatorPlayground,
]

export function getPlaygroundDefinition(slug: string): PlaygroundDefinition {
    return playgroundRegistry.find((item) => item.slug === slug) ?? playgroundRegistry[0]!
}
