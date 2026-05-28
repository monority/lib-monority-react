import { Banner } from '@monority/ui'

export function BannerBasicExample() {
  return <Banner>We're experiencing higher than usual wait times.</Banner>
}

export function BannerTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner tone="info" title="Info" description="This is an informational banner." />
      <Banner tone="success" title="Success" description="Your changes have been saved." />
      <Banner tone="warning" title="Warning" description="Your session will expire soon." />
      <Banner tone="danger" title="Error" description="Something went wrong." />
    </div>
  )
}

export function BannerWithActionsExample() {
  return (
    <Banner
      tone="info"
      title="New version available"
      description="A new version of the app is ready to install."
      actions={<button style={{ padding: '4px 12px', cursor: 'pointer' }}>Update now</button>}
    />
  )
}

export function BannerWithEyebrowExample() {
  return (
    <Banner
      tone="success"
      eyebrow="Deployment"
      title="Build succeeded"
      description="Your latest commit has been deployed successfully."
    />
  )
}
