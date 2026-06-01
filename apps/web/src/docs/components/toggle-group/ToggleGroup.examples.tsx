import { useState } from 'react'
import { ToggleGroup } from '@monority/ui/toggle-group'

const formatItems = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' },
]

const alignItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

const viewItems = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'table', label: 'Table' },
]

export function ToggleGroupSinglePreview() {
  const [value, setValue] = useState<string>('')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
      <ToggleGroup items={alignItems} type="single" value={value} onValueChange={setValue} />
      <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
        Selected: {value || 'none'}
      </span>
    </div>
  )
}

export function ToggleGroupMultipleExample() {
  const [value, setValue] = useState<string[]>([])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
      <ToggleGroup items={formatItems} type="multiple" value={value} onValueChange={setValue} />
      <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
        Selected: {value.length > 0 ? value.join(', ') : 'none'}
      </span>
    </div>
  )
}

export function ToggleGroupDisabledExample() {
  const itemsWithDisabled = [
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List', disabled: true },
    { value: 'table', label: 'Table' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-3)' }}>
      <ToggleGroup items={itemsWithDisabled} type="single" />
      <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)' }}>
        "List" is individually disabled
      </span>
    </div>
  )
}

export function ToggleGroupVerticalExample() {
  return <ToggleGroup items={viewItems} type="single" orientation="vertical" />
}

export function ToggleGroupVariantsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-4)' }}>
      <div>
        <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)', display: 'block', marginBottom: 'var(--mr-space-2)' }}>Default</span>
        <ToggleGroup items={alignItems} variant="default" />
      </div>
      <div>
        <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)', display: 'block', marginBottom: 'var(--mr-space-2)' }}>Outline</span>
        <ToggleGroup items={alignItems} variant="outline" />
      </div>
    </div>
  )
}

export function ToggleGroupSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-space-4)' }}>
      <div>
        <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)', display: 'block', marginBottom: 'var(--mr-space-2)' }}>Small</span>
        <ToggleGroup items={alignItems} size="sm" />
      </div>
      <div>
        <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)', display: 'block', marginBottom: 'var(--mr-space-2)' }}>Medium</span>
        <ToggleGroup items={alignItems} size="md" />
      </div>
      <div>
        <span style={{ fontSize: 'var(--mr-text-sm)', color: 'var(--mr-fg-muted)', display: 'block', marginBottom: 'var(--mr-space-2)' }}>Large</span>
        <ToggleGroup items={alignItems} size="lg" />
      </div>
    </div>
  )
}
