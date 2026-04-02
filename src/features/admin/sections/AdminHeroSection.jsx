import { Badge, Button, FilterBar, Input, PageHeader, Section, Toolbar } from '@/components/ui'

export function AdminHeroSection({ headerContent, filters }) {
    return (
        <Section spacing="md" className="stack-m">
            <PageHeader
                eyebrow={headerContent.eyebrow}
                title={headerContent.title}
                description={headerContent.description}
                meta={
                    <div className="cluster">
                        {headerContent.meta.map((item) => (
                            <Badge key={item} variant="subtle">
                                {item}
                            </Badge>
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

            <Toolbar
                leading={<Input placeholder="Rechercher un membre..." inputClassName="showcase-toolbar__input" />}
                trailing={
                    <div className="cluster">
                        <Button size="sm" variant="ghost">
                            Bulk edit
                        </Button>
                        <Button size="sm" variant="ghost">
                            Permissions
                        </Button>
                    </div>
                }
            />

            <FilterBar
                filters={filters}
                resultsCount={128}
                resetLabel="Reset filters"
                onReset={() => {}}
            />
        </Section>
    )
}
