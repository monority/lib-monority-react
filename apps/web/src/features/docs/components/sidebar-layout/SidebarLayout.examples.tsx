import { SidebarLayout } from '@monority/ui/sidebar-layout'
import { Stack } from '@monority/ui/stack'
import { Text } from '@monority/ui/text'
import { Title } from '@monority/ui/title'

export function SidebarLayoutBasicExample() {
    return (
        <SidebarLayout
            sidebar={
                <nav aria-label="Project navigation">
                    <Stack gap="xs">
                        <Text.Small tone="muted">Workspace</Text.Small>
                        <Text.Strong>Overview</Text.Strong>
                        <Text.Muted>Releases</Text.Muted>
                        <Text.Muted>Settings</Text.Muted>
                    </Stack>
                </nav>
            }
            header={<Text.Strong>Project shell</Text.Strong>}
        >
            <Stack gap="xs">
                <Title as="h3" size="sm">
                    Main area
                </Title>
                <Text.Muted>Sidebar stays contextual, content stays readable.</Text.Muted>
            </Stack>
        </SidebarLayout>
    )
}

export function SidebarLayoutWithContentExample() {
    return (
        <SidebarLayout
            sidebar={
                <nav aria-label="Dashboard navigation">
                    <Stack gap="xs">
                        <Text.Strong>Navigation</Text.Strong>
                        <Text.Muted size="sm">Dashboard</Text.Muted>
                        <Text.Muted size="sm">Settings</Text.Muted>
                    </Stack>
                </nav>
            }
            header={
                <Stack direction="horizontal" gap="sm" align="center">
                    <Text.Strong>Analytics workspace</Text.Strong>
                    <Text.Muted size="sm">Updated 5 min ago</Text.Muted>
                </Stack>
            }
        >
            <main>
                <Stack gap="xs">
                    <Title as="h2" size="md">
                        Main content
                    </Title>
                    <Text.Muted>Page content goes here.</Text.Muted>
                </Stack>
            </main>
        </SidebarLayout>
    )
}

export function SidebarLayoutWidthsExample() {
    return (
        <Stack gap="md">
            <SidebarLayout sidebarWidth="sm" sidebar={<Text.Muted>Small rail</Text.Muted>}>
                <Text>Main content</Text>
            </SidebarLayout>
            <SidebarLayout sidebarWidth="md" sidebar={<Text.Muted>Medium rail</Text.Muted>}>
                <Text>Main content</Text>
            </SidebarLayout>
            <SidebarLayout sidebarWidth="lg" sidebar={<Text.Muted>Large rail</Text.Muted>}>
                <Text>Main content</Text>
            </SidebarLayout>
        </Stack>
    )
}
