import { Badge, Button, EmptyState } from '@monority/ui'

export function EmptyStateBasicExample() {
  return (
    <EmptyState
      title="No matching components"
      description="Try a broader keyword, or browse by category to keep exploring the library."
    />
  )
}

export function EmptyStateWithActionExample() {
  return (
    <EmptyState
      title="No releases published"
      description="Create a first release note to document what changed for your team."
      action={<Button>Create release</Button>}
    />
  )
}

export function EmptyStateWithIconExample() {
  return (
    <EmptyState
      icon={<Badge variant="secondary">Draft</Badge>}
      title="Review queue clear"
      description="All component updates have been triaged. New feedback will appear here."
    />
  )
}

export function EmptyStateWithSecondaryActionExample() {
  return (
    <EmptyState
      title="No search results"
      description="Clear active filters or jump back to the full component index."
      action={<Button>Clear filters</Button>}
      secondaryAction={<Button variant="ghost">Open index</Button>}
    />
  )
}
