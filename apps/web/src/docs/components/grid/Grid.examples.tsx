import { Grid } from '@monority/ui'

export function GridBasicExample() {
  return (
    <>
      <Grid>Example</Grid>
    </>
  )
}

export function GridColumnsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Grid columns={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ background: 'var(--mr-bg-control)', padding: '1rem', textAlign: 'center' }}>
            2 cols - Item {i + 1}
          </div>
        ))}
      </Grid>
      <Grid columns={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ background: 'var(--mr-bg-control)', padding: '1rem', textAlign: 'center' }}>
            3 cols - Item {i + 1}
          </div>
        ))}
      </Grid>
      <Grid columns={4}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ background: 'var(--mr-bg-control)', padding: '1rem', textAlign: 'center' }}>
            4 cols - Item {i + 1}
          </div>
        ))}
      </Grid>
    </div>
  )
}
