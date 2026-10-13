import { Badge } from '@monority/ui/badge'
import { Card } from '@monority/ui/card'

export interface DocTagListProps {
    title: string
    tags: string[]
}

export function DocTagList({ title, tags }: DocTagListProps) {
    if (tags.length === 0) return null

    return (
        <Card padding="md">
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Content>
                <div className="docs-tag-list">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                            <code>{tag}</code>
                        </Badge>
                    ))}
                </div>
            </Card.Content>
        </Card>
    )
}
