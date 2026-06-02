import { Skeleton } from '@monority/ui'

export function SkeletonBasicExample() {
  return <Skeleton width="14rem" height="1rem" />
}

export function SkeletonCardExample() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Skeleton style={{ width: '100%', height: 168 }} />
      <Skeleton style={{ width: '72%', height: 16 }} />
      <Skeleton style={{ width: '100%', height: 12 }} />
      <Skeleton style={{ width: '88%', height: 12 }} />
    </div>
  )
}

export function SkeletonListExample() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Skeleton style={{ width: '96%', height: 18 }} />
      <Skeleton style={{ width: '82%', height: 18 }} />
      <Skeleton style={{ width: '90%', height: 18 }} />
      <Skeleton style={{ width: '68%', height: 18 }} />
    </div>
  )
}

export function SkeletonCircleExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Skeleton rounded style={{ width: 44, height: 44 }} />
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <Skeleton style={{ width: 132, height: 14 }} />
        <Skeleton style={{ width: 92, height: 12 }} />
      </div>
    </div>
  )
}
