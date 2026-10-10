export interface DocTagListProps {
    title: string
    tags: string[]
}

export function DocTagList({ title, tags }: DocTagListProps) {
    if (tags.length === 0) return null

    return (
        <div className="docs-card">
            <h3>{title}</h3>
            <div className="docs-tag-list">
                {tags.map((tag) => (
                    <span key={tag} className="docs-tag">
                        <code>{tag}</code>
                    </span>
                ))}
            </div>
        </div>
    )
}
