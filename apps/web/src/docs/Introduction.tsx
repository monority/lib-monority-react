export function Introduction() {
    return (
        <div className="docs-page">
            <header className="docs-hero">
                <span className="docs-kicker">Monority UI</span>
                <h1>Introduction</h1>
                <p className="docs-description">
                    A modern, accessible, and customizable React component library.
                    Build interfaces faster with 63+ production-ready components.
                </p>
            </header>

            <section className="docs-section">
                <h2>Features</h2>
                <div className="docs-feature-grid">
                    {[
                        { accent: 'accent', title: 'Design System', desc: 'Consistent, accessible components with unified styling through CSS custom properties.' },
                        { accent: 'success', title: 'Performance', desc: 'Tree-shakeable architecture with sub-path imports for optimal bundle size.' },
                        { accent: 'warning', title: 'Accessibility', desc: 'WAI-ARIA compliant components with full keyboard navigation support.' },
                        { accent: 'info', title: 'Dark Mode', desc: 'Built-in theme switching via CSS variables — no JavaScript runtime overhead.' },
                        { accent: 'danger', title: '63 Components', desc: 'From buttons to complex overlays, each component is production-ready.' },
                        { accent: 'neutral', title: 'TypeScript', desc: 'Full type safety with strict TypeScript types and comprehensive generics.' },
                    ].map(f => (
                        <div key={f.title} className="docs-feature-card">
                            <div className={`docs-feature-card__accent docs-feature-card__accent--${f.accent}`} />
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="docs-section">
                <h2>Quick Start</h2>
                <div className="docs-code-block">
                    <pre><code>{`npm install @monority/ui`}</code></pre>
                </div>
                <div className="docs-code-block">
                    <pre><code>{`import { Button } from '@monority/ui'
import '@monority/ui/styles.css'

function App() {
    return <Button>Click me</Button>
}`}</code></pre>
                </div>
                <p className="docs-text" style={{ marginTop: '1rem' }}>
                    <a href="/docs/installation" className="docs-text-link">Read the full installation guide ?</a>
                </p>
            </section>

            <section className="docs-section">
                <h2>Component Categories</h2>
                <p className="docs-text">
                    Monority UI provides <strong>63 components</strong> organized into <strong>10 categories</strong>:
                </p>
                <ul className="docs-list">
                    <li><strong>Primitives</strong> — FormControl, InputBase</li>
                    <li><strong>Forms</strong> — Checkbox, Input, Select, Slider, Calendar, DatePicker, FileUpload, and more</li>
                    <li><strong>Actions</strong> — Button, IconButton, Toggle, ToggleGroup, CopyButton</li>
                    <li><strong>Typography</strong> — Text, Title, Kbd</li>
                    <li><strong>Display</strong> — Accordion, Avatar, Card, Carousel, Collapsible, Table</li>
                    <li><strong>Data-display</strong> — DataList, DataTable</li>
                    <li><strong>Feedback</strong> — Badge, Banner, Skeleton, Spinner, Toast, Progress</li>
                    <li><strong>Layout</strong> — Container, Grid, Stack, Divider, ScrollArea, Resizable</li>
                    <li><strong>Navigation</strong> — Tabs, Breadcrumb, Pagination, Menubar, NavigationMenu</li>
                    <li><strong>Overlays</strong> — Modal, Drawer, Tooltip, Popover, HoverCard, ContextMenu</li>
                    <li><strong>Experimental</strong> — InfiniteScroll</li>
                </ul>
            </section>
        </div>
    )
}
