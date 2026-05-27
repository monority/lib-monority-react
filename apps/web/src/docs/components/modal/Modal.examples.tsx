import { Button } from '@monority/ui/button'
import { Modal } from '@monority/ui/modal'
import { useState } from 'react'

export function ModalBasicExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} title="Confirm action" onClose={() => setOpen(false)}>
        Dialog content
      </Modal>
    </>
  )
}
