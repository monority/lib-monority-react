import { AppPage } from '@/app/layouts/AppPage'
import { homeSectionNavigationItems, primaryNavigationItems } from '@/app/config/navigation'
import { Modal, Text } from '@/components/ui'
import {
    homeChecklistContent,
    homeCtaContent,
    homeDesignSystemContent,
    homeExamplesContent,
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

    return (
        <AppPage navigationItems={[...primaryNavigationItems, ...homeSectionNavigationItems]}>
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
            <RoadmapSection content={homeRoadmapContent} />
            <CtaSection content={homeCtaContent} />
            <FooterSection content={homeFooterContent} />
            <Modal open={isModalOpen} title={homeModalContent.title} onClose={closeModal}>
                <Text tone="base">{homeModalContent.body}</Text>
            </Modal>
        </AppPage>
    )
}
