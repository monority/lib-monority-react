import { FilterBar } from '@monority/ui'
import { Input } from '@monority/ui'
import { Button } from '@monority/ui'

export function FilterBarBasicExample() {
  return (
    <>
      <FilterBar>Example</FilterBar>
    </>
  )
}

export function FilterBarWithControlsExample() {
  return (
    <FilterBar>
      <Input placeholder="Search..." style={{ maxWidth: 200 }} />
      <Button variant="secondary" size="sm">Apply filters</Button>
    </FilterBar>
  )
}

export function FilterBarWithResetExample() {
  return (
    <FilterBar>
      <span style={{ fontSize: '0.875rem', color: 'var(--mr-fg-muted)' }}>3 filters active</span>
      <Button variant="ghost" size="sm">Reset</Button>
    </FilterBar>
  )
}
