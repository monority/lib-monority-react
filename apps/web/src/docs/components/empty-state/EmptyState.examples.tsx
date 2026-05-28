import { EmptyState } from '@monority/ui'
import { Button } from '@monority/ui'

export function EmptyStateBasicExample() {
  return <EmptyState title="No results" description="Try adjusting your search." />
}

export function EmptyStateWithActionExample() {
  return (
    <EmptyState
      title="No projects yet"
      description="Get started by creating your first project."
      action={<Button>Create project</Button>}
    />
  )
}

export function EmptyStateWithIconExample() {
  return (
    <EmptyState
      icon={<span style={{ fontSize: '2rem' }}>{'\uD83D\uDCE6'}</span>}
      title="Inbox empty"
      description="You're all caught up!"
    />
  )
}

export function EmptyStateWithSecondaryActionExample() {
  return (
    <EmptyState
      title="No search results"
      description="Try a different search term or browse categories."
      action={<Button>Clear filters</Button>}
      secondaryAction={<Button variant="ghost">Browse all</Button>}
    />
  )
}
