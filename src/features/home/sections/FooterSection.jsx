import { Link } from 'react-router-dom'
import { Badge, Card, Grid, Section, Text, Title } from '@/components/ui'

function FooterColumn({ column }) {
    return (
        <Card padding="md" className="stack-m home-footer-card">
            <Title as="h3" size="sm">
                {column.title}
            </Title>
            {column.links ? (
                <div className="stack-s">
                    {column.links.map((item) =>
                        item.to ? (
                            <Link key={item.label} to={item.to} className="home-footer-link">
                                {item.label}
                            </Link>
                        ) : (
                            <a key={item.label} href={item.href} className="home-footer-link">
                                {item.label}
                            </a>
                        ),
                    )}
                </div>
            ) : (
                <div className="stack-s">
                    {column.items.map((item) => (
                        <Text key={item} tone="base" size="sm" className="home-footer-item">
                            {item}
                        </Text>
                    ))}
                </div>
            )}
        </Card>
    )
}

export function FooterSection({ content }) {
    return (
        <Section id="footer" spacing="md" surface className="stack-m">
            <div className="cluster between">
                <Title as="h2" size="md">
                    {content.title}
                </Title>
                <Badge>{content.badge}</Badge>
            </div>
            <Text tone="base">{content.description}</Text>
            <Grid cols={3} gap="md" className="feature-grid">
                {content.columns.map((column) => (
                    <FooterColumn key={column.title} column={column} />
                ))}
            </Grid>
        </Section>
    )
}
