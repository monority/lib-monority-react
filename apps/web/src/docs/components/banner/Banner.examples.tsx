import { Banner, Button } from '@monority/ui'

export function BannerBasicExample() {
  return <Banner>Scheduled maintenance starts tonight at 23:00 CET.</Banner>
}

export function BannerTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner tone="info" title="Release note" description="The command palette now supports scoped search across docs and components." />
      <Banner tone="success" title="Deployment complete" description="Version 2.4.0 is live in production." />
      <Banner tone="warning" title="Action required" description="Rotate staging credentials before Friday to avoid failed previews." />
      <Banner tone="danger" title="Sync paused" description="Background imports are blocked until the queue catches up." />
    </div>
  )
}

export function BannerWithActionsExample() {
  return (
    <Banner
      tone="info"
      title="New version available"
      description="Version 2.4.0 includes the new navigation shell and updated typography scale."
      actions={
        <>
          <Button size="sm" variant="secondary">View changes</Button>
          <Button size="sm">Update now</Button>
        </>
      }
    />
  )
}

export function BannerWithEyebrowExample() {
  return (
    <Banner
      tone="success"
      eyebrow="Deployment"
      title="Build succeeded"
      description="The latest release passed checks and is now serving production traffic."
    />
  )
}
