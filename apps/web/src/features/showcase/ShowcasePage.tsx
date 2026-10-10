import { usePageSeo } from '@/shared/seo/usePageSeo'
import { HeroHeader } from '@/shared/components/HeroHeader'
import { ShowcaseSection } from './ShowcaseSection'
import { ActivityComposition } from './sections/ActivityComposition'
import { FeedbackComposition } from './sections/FeedbackComposition'
import { PricingComposition } from './sections/PricingComposition'
import { SettingsComposition } from './sections/SettingsComposition'
import './showcase.css'

export function ShowcasePage() {
    usePageSeo({
        title: 'Showcase',
        description: 'Realistic compositions built only with stable components.',
    })

    return (
        <div className="sc-layout">
            <HeroHeader
                kicker="Compositions"
                title="Showcase"
                description="What can you build with this library? Four curated compositions, built exclusively with stable components. No isolated grids, no fake components, no draft APIs."
            />

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
