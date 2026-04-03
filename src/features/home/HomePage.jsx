import { AppPage } from '@/app/layouts/AppPage'
import { homeSectionNavigationItems, primaryNavigationItems } from '@/app/config/navigation'
import { buildAbsoluteUrl } from '@/app/seo/site-config'
import { Modal, Text } from '@/components/ui'
import {
    homeChecklistContent,
    homeCtaContent,
    homeDesignSystemContent,
    homeExamplesContent,
    homeFaqContent,
    homeFeatureItems,
    homeFooterContent,
    homeHeroContent,
    homeMetricsContent,
    homeModalContent,
    homePatternsContent,
    homeQuickLinksContent,
    homeRoadmapContent,
    homeWorkflowContent,
    homeWhyContent,
} from './content/home-content'
import { ChecklistSection } from './sections/ChecklistSection'
import { useHomeUI } from './hooks/useHomeUI'
import { CtaSection } from './sections/CtaSection'
import { DesignSystemSection } from './sections/DesignSystemSection'
import { ExamplesSection } from './sections/ExamplesSection'
import { FaqSection } from './sections/FaqSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { MetricsSection } from './sections/MetricsSection'
import { PatternsSection } from './sections/PatternsSection'
import { QuickLinksSection } from './sections/QuickLinksSection'
import { RoadmapSection } from './sections/RoadmapSection'
import { WorkflowSection } from './sections/WorkflowSection'
import { WhySection } from './sections/WhySection'

export function HomePage() {
    const { isModalOpen, openModal, closeModal } = useHomeUI()
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                name: 'Model Starter',
                url: buildAbsoluteUrl('/'),
                inLanguage: 'fr-FR',
                description:
                    'Starter frontend React + Vite avec architecture feature-first, design system et base de qualite pour des projets pros.',
            },
            {
                '@type': 'FAQPage',
                mainEntity: homeFaqContent.items.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer,
                    },
                })),
            },
        ],
    }

    return (
        <AppPage
            navigationItems={[...primaryNavigationItems, ...homeSectionNavigationItems]}
            seo={{
                title: 'Starter frontend React + Vite',
                description:
                    'Starter frontend React + Vite avec architecture feature-first, design system, dark mode, tests et patterns UI reutilisables.',
                structuredData,
            }}
        >
            <HeroSection content={homeHeroContent} onOpenModal={openModal} />
            <FeaturesSection items={homeFeatureItems} />
            <WhySection content={homeWhyContent} />
            <DesignSystemSection content={homeDesignSystemContent} />
            <MetricsSection content={homeMetricsContent} />
            <PatternsSection content={homePatternsContent} />
            <ExamplesSection content={homeExamplesContent} />
            <ChecklistSection content={homeChecklistContent} />
            <WorkflowSection content={homeWorkflowContent} />
            <QuickLinksSection content={homeQuickLinksContent} />
            <FaqSection content={homeFaqContent} />
            <RoadmapSection content={homeRoadmapContent} />
            <CtaSection content={homeCtaContent} />
            <FooterSection content={homeFooterContent} />
            <Modal open={isModalOpen} title={homeModalContent.title} onClose={closeModal}>
                <Text tone="base">{homeModalContent.body}</Text>
            </Modal>
        </AppPage>
    )
}
