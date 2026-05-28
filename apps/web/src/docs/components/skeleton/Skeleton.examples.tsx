import { Skeleton } from '@monority/ui'

export function SkeletonBasicExample() {
  return <Skeleton width="200px" height="20px" />
}

export function SkeletonCardExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 300 }}>
      <Skeleton style={{ width: '100%', height: 160 }} />
      <Skeleton style={{ width: '80%', height: 16 }} />
      <Skeleton style={{ width: '60%', height: 16 }} />
    </div>
  )
}

export function SkeletonListExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} style={{ width: `${60 + Math.random() * 40}%`, height: 20 }} />
      ))}
    </div>
  )
}

export function SkeletonCircleExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Skeleton shape="circle" style={{ width: 40, height: 40 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton style={{ width: 120, height: 14 }} />
        <Skeleton style={{ width: 80, height: 12 }} />
      </div>
    </div>
  )
}
