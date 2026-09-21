import type { PlaygroundDefinition } from './playground-types'
import { accordionPlayground } from './adapters/accordion.adapter'
import { alertDialogPlayground } from './adapters/alert-dialog.adapter'
import { avatarPlayground } from './adapters/avatar.adapter'
import { badgePlayground } from './adapters/badge.adapter'
import { breadcrumbPlayground } from './adapters/breadcrumb.adapter'
import { buttonPlayground } from './adapters/button.adapter'
import { calloutPlayground } from './adapters/callout.adapter'
import { cardPlayground } from './adapters/card.adapter'
import { checkboxPlayground } from './adapters/checkbox.adapter'
import { inputPlayground } from './adapters/input.adapter'
import { modalPlayground } from './adapters/modal.adapter'
import { progressPlayground } from './adapters/progress.adapter'
import { radioGroupPlayground } from './adapters/radio-group.adapter'
import { sectionPlayground } from './adapters/section.adapter'
import { selectPlayground } from './adapters/select.adapter'
import { separatorPlayground } from './adapters/separator.adapter'
import { skeletonPlayground } from './adapters/skeleton.adapter'
import { sliderPlayground } from './adapters/slider.adapter'
import { spinnerPlayground } from './adapters/spinner.adapter'
import { switchPlayground } from './adapters/switch.adapter'
import { tabsPlayground } from './adapters/tabs.adapter'
import { textareaPlayground } from './adapters/textarea.adapter'
import { toastPlayground } from './adapters/toast.adapter'
import { togglePlayground } from './adapters/toggle.adapter'
import { tooltipPlayground } from './adapters/tooltip.adapter'

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
    checkboxPlayground,
    sliderPlayground,
    radioGroupPlayground,
    badgePlayground,
    calloutPlayground,
    progressPlayground,
    skeletonPlayground,
    spinnerPlayground,
    modalPlayground,
    alertDialogPlayground,
    tooltipPlayground,
    toastPlayground,
    togglePlayground,
    tabsPlayground,
    accordionPlayground,
    avatarPlayground,
    breadcrumbPlayground,
    cardPlayground,
    sectionPlayground,
    separatorPlayground,
]

export function getPlaygroundDefinition(slug: string): PlaygroundDefinition {
    return playgroundRegistry.find((item) => item.slug === slug) ?? playgroundRegistry[0]!
}
