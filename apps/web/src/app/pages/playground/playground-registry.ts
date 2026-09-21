import type { PlaygroundDefinition } from './playground-types'
import { badgePlayground } from './adapters/badge.adapter'
import { buttonPlayground } from './adapters/button.adapter'
import { calloutPlayground } from './adapters/callout.adapter'
import { cardPlayground } from './adapters/card.adapter'
import { inputPlayground } from './adapters/input.adapter'
import { modalPlayground } from './adapters/modal.adapter'
import { sectionPlayground } from './adapters/section.adapter'
import { textareaPlayground } from './adapters/textarea.adapter'

/**
 * Single source of truth for Playground v1.
 * Strictly limited to the 8 stable components (Step01A).
 * To add a component later, create its adapter and append it here.
 */
export const playgroundRegistry: PlaygroundDefinition[] = [
    buttonPlayground,
    inputPlayground,
    textareaPlayground,
    badgePlayground,
    calloutPlayground,
    modalPlayground,
    cardPlayground,
    sectionPlayground,
]

export function getPlaygroundDefinition(slug: string): PlaygroundDefinition {
    return playgroundRegistry.find((item) => item.slug === slug) ?? playgroundRegistry[0]!
}
