import { DocsCodeBlock } from './components/DocsCodeBlock'

export function Introduction() {
    return (
        <div className="docs-page">
            <header className="docs-hero">
                <span className="docs-kicker">Monority UI</span>
                <h1>Introduction</h1>
                <p className="docs-description">
                    A modern, accessible React component library for building calm, consistent
                    product interfaces with production-ready primitives, layouts, feedback surfaces,
                    and overlays.
                </p>
            </header>

            <section className="docs-section">
                <h2>What You Get</h2>
                <div className="docs-feature-grid">
                    {[
                        {
                            accent: 'accent',
                            title: 'System-first UI',
                            desc: 'Shared tokens, recipes, and components that keep shells, forms, and content surfaces visually aligned.',
                        },
                        {
                            accent: 'success',
                            title: 'Composable architecture',
                            desc: 'Use the main barrel for speed or sub-path imports when you want tighter bundle control.',
                        },
                        {
                            accent: 'warning',
                            title: 'Accessible defaults',
                            desc: 'Keyboard support, ARIA patterns, and focus handling are built into the component layer.',
                        },
                        {
                            accent: 'info',
                            title: 'Theme-ready styling',
                            desc: 'CSS variable driven theming lets docs and products share the same visual language.',
                        },
                        {
                            accent: 'danger',
                            title: 'Broad coverage',
                            desc: 'From small typography helpers to data-heavy layouts and overlays, the library covers daily product work.',
                        },
                        {
                            accent: 'neutral',
                            title: 'Typed end to end',
                            desc: 'Strong TypeScript support keeps component APIs predictable as the design system grows.',
                        },
                    ].map((feature) => (
                        <div key={feature.title} className="docs-feature-card">
                            <div
                                className={`docs-feature-card__accent docs-feature-card__accent--${feature.accent}`}
                            />
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="docs-section">
                <h2>Quick Start</h2>
                <DocsCodeBlock className="docs-code-block" language="bash">
                    npm install @monority/ui
                </DocsCodeBlock>
                <DocsCodeBlock className="docs-code-block">{`import { Button } from '@monority/ui'
import '@monority/ui/styles.css'

function App() {
  return <Button>Open workspace</Button>
}`}</DocsCodeBlock>
                <p className="docs-text" style={{ marginTop: '1rem' }}>
                    <a href="/docs/installation" className="docs-text-link">
                        Read the full installation guide
                    </a>
                </p>
            </section>

            <section className="docs-section">
                <h2>Component Categories</h2>
                <p className="docs-text">
                    Monority UI groups its components into practical product-facing areas:
                </p>
                <ul className="docs-list">
                    <li>
                        <strong>Primitives</strong> - FormControl, InputBase
                    </li>
                    <li>
                        <strong>Forms</strong> - Checkbox, Input, Select, Slider, Calendar,
                        DatePicker, FileUpload, and more
                    </li>
                    <li>
                        <strong>Actions</strong> - Button, IconButton, Toggle, ToggleGroup,
                        CopyButton
                    </li>
                    <li>
                        <strong>Typography</strong> - Text, Title, Kbd, PreCode
                    </li>
                    <li>
                        <strong>Display</strong> - Accordion, Avatar, Card, Carousel, Collapsible,
                        Table
                    </li>
                    <li>
                        <strong>Data display</strong> - DataList, DataTable
                    </li>
                    <li>
                        <strong>Feedback</strong> - Badge, Banner, Skeleton, Spinner, Toast,
                        Progress
                    </li>
                    <li>
                        <strong>Layout</strong> - Container, Grid, Stack, Divider, ScrollArea,
                        Resizable
                    </li>
                    <li>
                        <strong>Navigation</strong> - Tabs, Breadcrumb, Pagination, Menubar,
                        NavigationMenu
                    </li>
                    <li>
                        <strong>Overlays</strong> - Modal, Drawer, Tooltip, Popover, HoverCard,
                        ContextMenu
                    </li>
                    <li>
                        <strong>Experimental</strong> - InfiniteScroll
                    </li>
                </ul>
            </section>
        </div>
    )
}
