export interface FileListItem {
  name: string
  size?: number
  type?: string
}

export interface FileListProps {
  files: FileListItem[]
  onRemove?: (index: number) => void
  showSize?: boolean
  showRemove?: boolean
  disabled?: boolean
  className?: string
}
