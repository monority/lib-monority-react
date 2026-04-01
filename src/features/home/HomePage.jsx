import { AppShell } from '@/app/layouts/AppShell'
import { homeSectionNavigationItems, primaryNavigationItems } from '@/app/config/navigation'
import { Container, Modal, Stack, Text } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'
import {
    homeCtaContent,
    homeDesignSystemContent,
    homeFeatureItems,
    homeHeroContent,
    homeModalContent,
} from './content/home-content'
import { useHomeUI } from './hooks/useHomeUI'
import { CtaSection } from './sections/CtaSection'
import { DesignSystemSection } from './sections/DesignSystemSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'

export function HomePage() {
    const { isDark, toggleTheme } = useTheme()
    const { isModalOpen, openModal, closeModal } = useHomeUI()

    return (
        <AppShell
            isDark={isDark}
            onToggleTheme={toggleTheme}
            navigationItems={[...primaryNavigationItems, ...homeSectionNavigationItems]}
        >
            <Container size="lg">
                <Stack gap="xl">
                    <HeroSection content={homeHeroContent} onOpenModal={openModal} />
                    <FeaturesSection items={homeFeatureItems} />
                    <DesignSystemSection content={homeDesignSystemContent} />
                    <CtaSection content={homeCtaContent} />
                </Stack>
            </Container>

            <Modal open={isModalOpen} title={homeModalContent.title} onClose={closeModal}>
                <Text tone="base">{homeModalContent.body}</Text>
            </Modal>
        </AppShell>
    )
}
