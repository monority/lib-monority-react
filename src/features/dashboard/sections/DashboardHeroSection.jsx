import { Badge, Button, PageHeader, Text } from '@/components/ui'

export function DashboardHeroSection({ topbarContent, headerContent }) {
    return (
        <div className="stack-m">
            <div className="ui-topbar dashboard-topbar">
                <div className="ui-topbar__brand">{topbarContent.brand}</div>
                <nav className="ui-topbar__navigation">
                    {topbarContent.navItems.map((item) => (
                        <span key={item} className="dashboard-topbar__item">
                            {item}
                        </span>
                    ))}
                </nav>
                <div className="ui-topbar__meta">
                    <Badge>{topbarContent.meta}</Badge>
                </div>
                <div className="ui-topbar__actions">
                    <Button size="sm">{topbarContent.actionLabel}</Button>
                </div>
            </div>

            <PageHeader
                eyebrow={headerContent.eyebrow}
                title={headerContent.title}
                description={headerContent.description}
                meta={
                    <div className="cluster">
                        {headerContent.meta.map((item) => (
                            <Text key={item} tone="muted" size="sm">
                                {item}
                            </Text>
                        ))}
                    </div>
                }
                actions={
                    <div className="cluster">
                        <Button size="sm" variant="ghost">
                            {headerContent.secondaryActionLabel}
                        </Button>
                        <Button size="sm">{headerContent.primaryActionLabel}</Button>
                    </div>
                }
            />
        </div>
    )
}
