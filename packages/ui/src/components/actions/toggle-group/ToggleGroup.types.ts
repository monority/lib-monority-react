export interface ToggleGroupItem {
  value: string
  label: string
  disabled?: boolean
}

export type ToggleGroupType = 'single' | 'multiple'
export type ToggleGroupOrientation = 'horizontal' | 'vertical'
export type ToggleGroupVariant = 'default' | 'outline'
export type ToggleGroupSize = 'sm' | 'md' | 'lg'

export interface ToggleGroupProps {
  type?: ToggleGroupType
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  orientation?: ToggleGroupOrientation
  variant?: ToggleGroupVariant
  size?: ToggleGroupSize
  items: ToggleGroupItem[]
  className?: string
}
