import { SidebarLayout } from '@monority/ui/sidebar-layout'
import { Text } from '@monority/ui/text'

export function SidebarLayoutBasicExample() {
    return (
        <SidebarLayout
            sidebar={
                <nav aria-label="Project navigation">
                    <Text.Small style={{ display: 'block', marginBottom: '0.75rem' }}>
                        Workspace
                    </Text.Small>
                    <Text.Strong style={{ display: 'block' }}>Overview</Text.Strong>
                    <Text.Muted style={{ display: 'block', marginTop: '0.5rem' }}>
                        Releases
                    </Text.Muted>
                    <Text.Muted style={{ display: 'block', marginTop: '0.5rem' }}>
                        Settings
                    </Text.Muted>
                </nav>
            }
            header={<Text.Strong>Project shell</Text.Strong>}
        >
            <div>
                <h3 style={{ margin: 0 }}>Main area</h3>
                <Text.Muted style={{ display: 'block', margin: '0.5rem 0 0' }}>
                    Sidebar stays contextual, content stays readable.
                </Text.Muted>
            </div>
        </SidebarLayout>
    )
}

export function SidebarLayoutWithContentExample() {
    return (
        <SidebarLayout
            sidebar={
                <nav aria-label="Dashboard navigation">
                    <Text.Strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Navigation
                    </Text.Strong>
                    <Text.Muted size="sm" style={{ display: 'block' }}>
                        Dashboard
                    </Text.Muted>
                    <Text.Muted size="sm" style={{ display: 'block' }}>
                        Settings
                    </Text.Muted>
                </nav>
            }
            header={
                <>
                    <Text.Strong>Analytics workspace</Text.Strong>
                    <Text.Muted size="sm">Updated 5 min ago</Text.Muted>
                </>
            }
        >
            <main>
                <h2 style={{ margin: 0 }}>Main content</h2>
                <Text.Muted style={{ display: 'block', marginTop: '0.5rem' }}>
                    Page content goes here.
                </Text.Muted>
            </main>
        </SidebarLayout>
    )
}

export function SidebarLayoutWidthsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SidebarLayout sidebarWidth="sm" sidebar={<div>Small rail</div>}>
                <div>Main content</div>
            </SidebarLayout>
            <SidebarLayout sidebarWidth="md" sidebar={<div>Medium rail</div>}>
                <div>Main content</div>
            </SidebarLayout>
            <SidebarLayout sidebarWidth="lg" sidebar={<div>Large rail</div>}>
                <div>Main content</div>
            </SidebarLayout>
        </div>
    )
}
