import { useEffect, type ComponentType } from 'react'
import { DocToc } from './DocToc'

export function DocPageWithToc({ DocComponent }: { DocComponent: ComponentType }) {
  // Reset scroll position on page navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='docs-page-layout'>
      <div className='docs-page-content'>
        <DocComponent />
      </div>
      <aside className='docs-page-toc'>
        <DocToc />
      </aside>
    </div>
  )
}
