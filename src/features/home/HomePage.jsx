import { AppPage } from '@/app/layouts/AppPage'
import { homeSectionNavigationItems, primaryNavigationItems } from '@/app/config/navigation'
import { Modal, Text } from '@/components/ui'
import {
    homeCtaContent,
    homeDesignSystemContent,
    homeFeatureItems,
    homeHeroContent,
    homeModalContent,
    homeRoadmapContent,
} from './content/home-content'
import { useHomeUI } from './hooks/useHomeUI'
import { CtaSection } from './sections/CtaSection'
import { DesignSystemSection } from './sections/DesignSystemSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { RoadmapSection } from './sections/RoadmapSection'

export function HomePage() {
    const { isModalOpen, openModal, closeModal } = useHomeUI()

    return (
        <AppPage navigationItems={[...primaryNavigationItems, ...homeSectionNavigationItems]}>
            <HeroSection content={homeHeroContent} onOpenModal={openModal} />
            <FeaturesSection items={homeFeatureItems} />
            <DesignSystemSection content={homeDesignSystemContent} />
            <RoadmapSection content={homeRoadmapContent} />
            <CtaSection content={homeCtaContent} />
            <Modal open={isModalOpen} title={homeModalContent.title} onClose={closeModal}>
                <Text tone="base">{homeModalContent.body}</Text>
            </Modal>
        </AppPage>
    )
}
