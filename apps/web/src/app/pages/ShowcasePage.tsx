import { usePageSeo } from '@/seo/usePageSeo'
import { ShowcaseSection } from './showcase/ShowcaseSection'
import { ActivityComposition } from './showcase/sections/ActivityComposition'
import { FeedbackComposition } from './showcase/sections/FeedbackComposition'
import { PricingComposition } from './showcase/sections/PricingComposition'
import { SettingsComposition } from './showcase/sections/SettingsComposition'
import './showcase/showcase.css'

export function ShowcasePage() {
    usePageSeo({
        title: 'Showcase',
        description: 'Realistic compositions built only with stable components.',
    })

    return (
        <div className="sc-layout">
            <header className="sc-intro">
                <h1>Showcase</h1>
                <p>
                    What can you build with this library? Four curated compositions, built
                    exclusively with stable components. No isolated grids, no fake components,
                    no draft APIs.
                </p>
            </header>

            <ShowcaseSection
                eyebrow="settings"
                title="Workspace settings"
                description="Forms in context: labels, hints, validation feedback and submission actions."
                playgroundSlug="input"
                docsPath="/docs/input"
            >
                <SettingsComposition />
            </ShowcaseSection>

            <ShowcaseSection
                eyebrow="pricing"
                title="Pricing that converts"
                description="Marketing composition: cards, badges and full-width calls to action."
                playgroundSlug="card"
                docsPath="/docs/card"
            >
                <PricingComposition />
            </ShowcaseSection>

            <ShowcaseSection
                eyebrow="activity"
                title="Project overview"
                description="Product composition: status badges, grouped cards and a calm empty state."
                playgroundSlug="badge"
                docsPath="/docs/badge"
            >
                <ActivityComposition />
            </ShowcaseSection>

            <ShowcaseSection
                eyebrow="feedback"
                title="Feedback and confirmation"
                description="Tones, confirmations and a modal flow — success only appears after publishing."
                playgroundSlug="modal"
                docsPath="/docs/modal"
            >
                <FeedbackComposition />
            </ShowcaseSection>
        </div>
    )
}
