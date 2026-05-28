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

export function AlertDialogDefaultToneExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Discard changes</Button>
      <AlertDialog open={open} title="Discard changes?" description="Your unsaved changes will be lost." tone="default" confirmLabel="Discard" onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} />
    </>
  )
}

export function AlertDialogCustomLabelsExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="danger">Sign out</Button>
      <AlertDialog open={open} title="Sign out?" description="Are you sure you want to sign out?" confirmLabel="Yes, sign out" cancelLabel="Stay signed in" onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} />
    </>
  )
}
