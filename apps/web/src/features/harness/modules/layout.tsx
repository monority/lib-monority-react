import {
    AspectRatio,
    Button,
    Container,
    Divider,
    Grid,
    PageHeader,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    ScrollArea,
    Section,
    Separator,
    Stack,
    Toolbar,
} from '@monority/ui'
import { Sample } from '../Sample'

export function AspectRatioHarness() {
    return (
        <>
            <Sample label="Aspect Ratio 16/9">
                <div style={{ width: 240 }}>
                    <AspectRatio ratio={16 / 9}>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'var(--mr-bg-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 'var(--mr-radius-sm)',
                            }}
                        >
                            16:9
                        </div>
                    </AspectRatio>
                </div>
            </Sample>
            <Sample label="Aspect Ratio 1/1">
                <div style={{ width: 140 }}>
                    <AspectRatio ratio={1}>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'var(--mr-bg-subtle)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 'var(--mr-radius-sm)',
                            }}
                        >
                            1:1
                        </div>
                    </AspectRatio>
                </div>
            </Sample>
        </>
    )
}

export function ContainerHarness() {
    return (
        <>
            <Sample label="Container Sizes">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--mr-spacing-3)',
                        width: '100%',
                    }}
                >
                    <Container
                        size="sm"
                        style={{
                            backgroundColor: 'var(--mr-bg-muted)',
                            padding: 'var(--mr-spacing-2)',
                        }}
                    >
                        Container SM
                    </Container>
                    <Container
                        size="md"
                        style={{
                            backgroundColor: 'var(--mr-bg-muted)',
                            padding: 'var(--mr-spacing-2)',
                        }}
                    >
                        Container MD
                    </Container>
                    <Container
                        size="lg"
                        style={{
                            backgroundColor: 'var(--mr-bg-muted)',
                            padding: 'var(--mr-spacing-2)',
                        }}
                    >
                        Container LG
                    </Container>
                </div>
            </Sample>
        </>
    )
}

export function DividerHarness() {
    return (
        <>
            <Sample label="Divider Horizontal">
                <div style={{ width: 300 }}>
                    <div>Top section</div>
                    <Divider />
                    <div>Bottom section</div>
                </div>
            </Sample>
            <Sample label="Divider With Label">
                <div style={{ width: 300 }}>
                    <Divider label="OR CONTINUE WITH" />
                </div>
            </Sample>
            <Sample label="Divider Vertical">
                <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                    <span>Left</span>
                    <Divider orientation="vertical" />
                    <span>Right</span>
                </div>
            </Sample>
        </>
    )
}

export function GridHarness() {
    return (
        <>
            <Sample label="Grid 3 Columns">
                <Grid columns={3} style={{ gap: 'var(--mr-spacing-2)', width: '100%' }}>
                    <div
                        style={{
                            padding: 'var(--mr-spacing-3)',
                            backgroundColor: 'var(--mr-bg-muted)',
                        }}
                    >
                        Column 1
                    </div>
                    <div
                        style={{
                            padding: 'var(--mr-spacing-3)',
                            backgroundColor: 'var(--mr-bg-muted)',
                        }}
                    >
                        Column 2
                    </div>
                    <div
                        style={{
                            padding: 'var(--mr-spacing-3)',
                            backgroundColor: 'var(--mr-bg-muted)',
                        }}
                    >
                        Column 3
                    </div>
                </Grid>
            </Sample>
            <Sample label="Grid Auto Fit">
                <Grid columns="auto-fit" style={{ gap: 'var(--mr-spacing-2)', width: '100%' }}>
                    <div
                        style={{
                            padding: 'var(--mr-spacing-3)',
                            backgroundColor: 'var(--mr-bg-subtle)',
                        }}
                    >
                        Box A
                    </div>
                    <div
                        style={{
                            padding: 'var(--mr-spacing-3)',
                            backgroundColor: 'var(--mr-bg-subtle)',
                        }}
                    >
                        Box B
                    </div>
                    <div
                        style={{
                            padding: 'var(--mr-spacing-3)',
                            backgroundColor: 'var(--mr-bg-subtle)',
                        }}
                    >
                        Box C
                    </div>
                </Grid>
            </Sample>
        </>
    )
}

export function PageHeaderHarness() {
    return (
        <>
            <Sample label="Page Header">
                <PageHeader>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            padding: 'var(--mr-spacing-4) 0',
                        }}
                    >
                        <div>
                            <h2 style={{ margin: 0, fontSize: 'var(--mr-type-title-size)' }}>
                                Dashboard
                            </h2>
                            <p
                                style={{
                                    margin: 'var(--mr-spacing-1) 0 0',
                                    color: 'var(--mr-text-secondary)',
                                }}
                            >
                                Overview of key performance metrics
                            </p>
                        </div>
                        <Button>Create Resource</Button>
                    </div>
                </PageHeader>
            </Sample>
        </>
    )
}

export function ResizableHarness() {
    return (
        <>
            <Sample label="Resizable Panels">
                <div
                    style={{
                        height: 180,
                        width: '100%',
                        maxWidth: 480,
                        border: '1px solid var(--mr-border-default)',
                        borderRadius: 'var(--mr-radius-md)',
                        overflow: 'hidden',
                    }}
                >
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={40} minSize={20}>
                            <div
                                style={{
                                    padding: 'var(--mr-spacing-3)',
                                    height: '100%',
                                    backgroundColor: 'var(--mr-bg-muted)',
                                }}
                            >
                                Navigation Panel
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={60} minSize={20}>
                            <div style={{ padding: 'var(--mr-spacing-3)', height: '100%' }}>
                                Content Panel
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </Sample>
        </>
    )
}

export function ScrollAreaHarness() {
    return (
        <>
            <Sample label="Scroll Area">
                <ScrollArea
                    style={{
                        height: 140,
                        width: 280,
                        border: '1px solid var(--mr-border-default)',
                        borderRadius: 'var(--mr-radius-sm)',
                        padding: 'var(--mr-spacing-3)',
                    }}
                >
                    <p style={{ margin: 0 }}>
                        Monority UI scroll area content. This component manages native scrolling
                        with accessible focus and scrollbar presentation.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                </ScrollArea>
            </Sample>
        </>
    )
}

export function SectionHarness() {
    return (
        <>
            <Sample label="Section Default">
                <Section title="Account Overview" spacing="sm">
                    <p style={{ margin: 0 }}>Configure personal details and subscription plan.</p>
                </Section>
            </Sample>
            <Sample label="Section Bordered">
                <Section title="Security Settings" variant="bordered" spacing="sm">
                    <p style={{ margin: 0 }}>Two-factor authentication and session keys.</p>
                </Section>
            </Sample>
            <Sample label="Section Card">
                <Section title="Billing Details" variant="card" spacing="sm">
                    <p style={{ margin: 0 }}>Active payment methods and invoices.</p>
                </Section>
            </Sample>
        </>
    )
}

export function SeparatorHarness() {
    return (
        <>
            <Sample label="Separator Horizontal">
                <div style={{ width: 280 }}>
                    <div>Section 1</div>
                    <Separator style={{ margin: 'var(--mr-spacing-2) 0' }} />
                    <div>Section 2</div>
                </div>
            </Sample>
            <Sample label="Separator Vertical">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 32,
                        gap: 'var(--mr-spacing-2)',
                    }}
                >
                    <span>A</span>
                    <Separator orientation="vertical" />
                    <span>B</span>
                    <Separator orientation="vertical" />
                    <span>C</span>
                </div>
            </Sample>
        </>
    )
}

export function StackHarness() {
    return (
        <>
            <Sample label="Stack Vertical">
                <Stack direction="vertical" gap="sm">
                    <Button variant="secondary" size="sm">
                        First item
                    </Button>
                    <Button variant="secondary" size="sm">
                        Second item
                    </Button>
                    <Button variant="secondary" size="sm">
                        Third item
                    </Button>
                </Stack>
            </Sample>
            <Sample label="Stack Horizontal">
                <Stack direction="horizontal" gap="md" align="center">
                    <Button size="sm">Save</Button>
                    <Button variant="secondary" size="sm">
                        Cancel
                    </Button>
                    <Button variant="ghost" size="sm">
                        Help
                    </Button>
                </Stack>
            </Sample>
        </>
    )
}

export function ToolbarHarness() {
    return (
        <>
            <Sample label="Toolbar">
                <Toolbar>
                    <div
                        style={{
                            display: 'flex',
                            gap: 'var(--mr-spacing-2)',
                            alignItems: 'center',
                        }}
                    >
                        <Button variant="ghost" size="sm">
                            Bold
                        </Button>
                        <Button variant="ghost" size="sm">
                            Italic
                        </Button>
                        <Button variant="ghost" size="sm">
                            Underline
                        </Button>
                        <Separator orientation="vertical" style={{ height: 20 }} />
                        <Button variant="ghost" size="sm">
                            Align Left
                        </Button>
                        <Button variant="ghost" size="sm">
                            Align Center
                        </Button>
                    </div>
                </Toolbar>
            </Sample>
        </>
    )
}
