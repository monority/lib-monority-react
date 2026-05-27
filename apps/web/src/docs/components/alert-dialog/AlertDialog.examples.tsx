import { AlertDialog } from '@monority/ui'
import { useState } from 'react'
import { Button } from '@monority/ui'

export function AlertDialogBasicExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="danger">Delete item</Button>
      <AlertDialog open={open} title="Delete item?" description="This action cannot be undone." onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} />
    </>
  )
}
