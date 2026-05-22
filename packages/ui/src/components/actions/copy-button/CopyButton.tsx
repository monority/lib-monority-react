import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, type ButtonProps } from '@/components/actions/button/Button'

interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> { value: string; label?: string; copiedLabel?: string; duration?: number }

export function CopyButton({ value, label = 'Copier', copiedLabel = 'Copie !', duration = 2000, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)
  useEffect(() => { return () => { if (timerRef.current) clearTimeout(timerRef.current) } }, [])
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(value) } catch {
      const textarea = document.createElement('textarea')
      textarea.value = value; textarea.style.position = 'fixed'; textarea.style.opacity = '0'
      document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); document.body.removeChild(textarea)
    }
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setCopied(false), duration)
  }, [value, duration])
  return <Button variant="subtle" size="sm" onClick={handleCopy} aria-live="polite" {...props}>{copied ? copiedLabel : label}</Button>
}
