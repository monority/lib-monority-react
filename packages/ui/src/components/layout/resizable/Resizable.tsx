import { forwardRef, createContext, useContext, useState, useRef, useCallback, useEffect, useId } from 'react'
import { cn } from '@/lib/cn'
import type { ResizablePanelGroupProps, ResizablePanelProps, ResizableHandleProps } from './Resizable.types'

// --- Context ---
interface PanelMeta {
  defaultSize: number
  minSize: number
  maxSize: number
  currentSize: number
}

interface PanelContextValue {
  direction: 'horizontal' | 'vertical'
  panelMeta: Map<string, PanelMeta>
  registerPanel: (id: string, defaultSize: number, minSize: number, maxSize: number) => void
  updatePanelSize: (id: string, size: number) => void
  isDragging: boolean
  setIsDragging: (v: boolean) => void
  panelIds: string[]
  setPanelIds: (fn: (prev: string[]) => string[]) => void
}

const PanelContext = createContext<PanelContextValue | null>(null)

const usePanelContext = () => {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('ResizablePanel must be inside ResizablePanelGroup')
  return ctx
}

// --- ResizablePanelGroup ---
export const ResizablePanelGroup = forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  function ResizablePanelGroup({ direction = 'horizontal', children, className, ...props }, ref) {
    const [panelMeta, setPanelMeta] = useState<Map<string, PanelMeta>>(new Map())
    const [isDragging, setIsDragging] = useState(false)
    const [panelIds, setPanelIds] = useState<string[]>([])

    const registerPanel = useCallback((id: string, defaultSize: number, minSize: number, maxSize: number) => {
      setPanelIds(prev => (prev.includes(id) ? prev : [...prev, id]))
      setPanelMeta(prev => {
        const next = new Map(prev)
        if (!next.has(id)) {
          next.set(id, { defaultSize, minSize, maxSize, currentSize: defaultSize })
        }
        return next
      })
    }, [])

    const updatePanelSize = useCallback((id: string, size: number) => {
      setPanelMeta(prev => {
        const next = new Map(prev)
        const meta = next.get(id)
        if (meta) {
          const clamped = Math.max(meta.minSize, Math.min(meta.maxSize, size))
          next.set(id, { ...meta, currentSize: clamped })
        }
        return next
      })
    }, [])

    return (
      <PanelContext.Provider
        value={{
          direction,
          panelMeta,
          registerPanel,
          updatePanelSize,
          isDragging,
          setIsDragging,
          panelIds,
          setPanelIds,
        }}
      >
        <div
          ref={ref}
          className={cn(
            'mr-resizable',
            `mr-resizable--${direction}`,
            isDragging && 'mr-resizable--dragging',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </PanelContext.Provider>
    )
  },
)

// --- ResizablePanel ---
export const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  function ResizablePanel({ defaultSize = 50, minSize = 10, maxSize = 90, children, className, style, ...props }, ref) {
    const panelId = useId()
    const ctx = usePanelContext()
    const registeredRef = useRef(false)

    useEffect(() => {
      if (!registeredRef.current) {
        ctx.registerPanel(panelId, defaultSize, minSize, maxSize)
        registeredRef.current = true
      }
    }, [panelId, defaultSize, minSize, maxSize, ctx])

    const meta = ctx.panelMeta.get(panelId)
    const size = meta?.currentSize ?? defaultSize

    return (
      <div
        ref={ref}
        className={cn('mr-resizable__panel', className)}
        data-size={size}
        style={{
          flexBasis: `${size}%`,
          minWidth: `${minSize}%`,
          maxWidth: `${maxSize}%`,
          overflow: 'hidden',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

// --- ResizableHandle ---
export const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  function ResizableHandle({ withHandle = false, className, ...props }, ref) {
    const ctx = usePanelContext()
    const handleRef = useRef<HTMLDivElement>(null)
    const startPos = useRef({ x: 0, y: 0 })
    const startSizes = useRef<Map<string, number>>(new Map())
    const ctxRef = useRef(ctx)
    ctxRef.current = ctx
    const handleIndexRef = useRef(-1)

    const handleRefCallback = useCallback(
      (node: HTMLDivElement | null) => {
        handleRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref],
    )

    const getHandleIndex = useCallback(() => {
      const handleEl = handleRef.current
      if (!handleEl?.parentElement) return -1
      const allHandles = Array.from(handleEl.parentElement.querySelectorAll('.mr-resizable__handle'))
      return allHandles.indexOf(handleEl)
    }, [])

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        ctx.setIsDragging(true)
        startPos.current = { x: e.clientX, y: e.clientY }
        handleIndexRef.current = getHandleIndex()

        // Snapshot current sizes
        const snapshot = new Map<string, number>()
        for (const [id, meta] of ctx.panelMeta) {
          snapshot.set(id, meta.currentSize)
        }
        startSizes.current = snapshot
      },
      [ctx, getHandleIndex],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const idx = getHandleIndex()
        if (idx < 0) return
        const panelIdBefore = ctx.panelIds[idx]
        const panelIdAfter = ctx.panelIds[idx + 1]
        if (!panelIdBefore || !panelIdAfter) return

        const metaBefore = ctx.panelMeta.get(panelIdBefore)
        const metaAfter = ctx.panelMeta.get(panelIdAfter)
        if (!metaBefore || !metaAfter) return

        const step = e.shiftKey ? 10 : 1
        const direction = ctx.direction

        if (
          (direction === 'horizontal' && (e.key === 'ArrowLeft' || e.key === 'ArrowUp')) ||
          (direction === 'vertical' && (e.key === 'ArrowLeft' || e.key === 'ArrowUp'))
        ) {
          ctx.updatePanelSize(panelIdBefore, metaBefore.currentSize - step)
          ctx.updatePanelSize(panelIdAfter, metaAfter.currentSize + step)
        } else if (
          (direction === 'horizontal' && (e.key === 'ArrowRight' || e.key === 'ArrowDown')) ||
          (direction === 'vertical' && (e.key === 'ArrowRight' || e.key === 'ArrowDown'))
        ) {
          ctx.updatePanelSize(panelIdBefore, metaBefore.currentSize + step)
          ctx.updatePanelSize(panelIdAfter, metaAfter.currentSize - step)
        }
      },
      [ctx, getHandleIndex],
    )

    useEffect(() => {
      if (!ctx.isDragging) return

      const handleMouseMove = (e: MouseEvent) => {
        const idx = handleIndexRef.current
        if (idx < 0) return

        const c = ctxRef.current
        const panelIdBefore = c.panelIds[idx]
        const panelIdAfter = c.panelIds[idx + 1]
        if (!panelIdBefore || !panelIdAfter) return

        const metaBefore = startSizes.current.get(panelIdBefore)
        const metaAfter = startSizes.current.get(panelIdAfter)
        if (metaBefore === undefined || metaAfter === undefined) return

        const container = handleRef.current?.closest('.mr-resizable')
        if (!container) return

        const rect = container.getBoundingClientRect()
        const totalSize = c.direction === 'horizontal' ? rect.width : rect.height
        if (totalSize <= 0) return

        const delta =
          c.direction === 'horizontal'
            ? e.clientX - startPos.current.x
            : e.clientY - startPos.current.y

        const deltaPercent = (delta / totalSize) * 100

        const beforeMeta = c.panelMeta.get(panelIdBefore)
        const afterMeta = c.panelMeta.get(panelIdAfter)
        if (!beforeMeta || !afterMeta) return

        const newBefore = metaBefore + deltaPercent
        const newAfter = metaAfter - deltaPercent

        const minBefore = beforeMeta.minSize ?? 0
        const maxBefore = beforeMeta.maxSize ?? 100
        const minAfter = afterMeta.minSize ?? 0
        const maxAfter = afterMeta.maxSize ?? 100

        const clampedBefore = Math.max(minBefore, Math.min(maxBefore, newBefore))
        const clampedAfter = Math.max(minAfter, Math.min(maxAfter, newAfter))

        const actualDelta = clampedBefore - metaBefore

        if (Math.abs(actualDelta) < 0.01) return

        c.updatePanelSize(panelIdBefore, clampedBefore)
        c.updatePanelSize(panelIdAfter, clampedAfter)
      }

      const handleMouseUp = () => {
        ctxRef.current.setIsDragging(false)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }, [ctx.isDragging, ctx.direction])

    const currentIdx = getHandleIndex()
    const prevPanelId = currentIdx >= 0 ? ctx.panelIds[currentIdx] : null
    const prevMeta = prevPanelId ? ctx.panelMeta.get(prevPanelId) : null
    const ariaValue = prevMeta ? Math.round(prevMeta.currentSize) : 50

    return (
      <div
        ref={handleRefCallback}
        role="separator"
        aria-orientation={ctx.direction}
        aria-valuenow={ariaValue}
        aria-label={`Resize panel. Current size: ${ariaValue}%`}
        tabIndex={0}
        className={cn(
          'mr-resizable__handle',
          `mr-resizable__handle--${ctx.direction}`,
          ctx.isDragging && 'mr-resizable__handle--active',
          className,
        )}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {withHandle && (
          <div className="mr-resizable__handle-indicator">
            {ctx.direction === 'horizontal' ? (
              <svg width="4" height="16" viewBox="0 0 4 16" fill="none" aria-hidden="true">
                <circle cx="2" cy="4" r="1" fill="currentColor" />
                <circle cx="2" cy="8" r="1" fill="currentColor" />
                <circle cx="2" cy="12" r="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="4" viewBox="0 0 16 4" fill="none" aria-hidden="true">
                <circle cx="4" cy="2" r="1" fill="currentColor" />
                <circle cx="8" cy="2" r="1" fill="currentColor" />
                <circle cx="12" cy="2" r="1" fill="currentColor" />
              </svg>
            )}
          </div>
        )}
      </div>
    )
  },
)

export type { ResizablePanelGroupProps, ResizablePanelProps, ResizableHandleProps } from './Resizable.types'
