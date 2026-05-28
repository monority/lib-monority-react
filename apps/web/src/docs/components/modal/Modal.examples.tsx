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

export function ModalWithFormExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit profile</Button>
      <Modal open={open} title="Edit profile" onClose={() => setOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem' }}>Name</span>
            <input className="mr-input" placeholder="Your name" />
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function ModalScrollableExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Long content</Button>
      <Modal open={open} title="Terms of Service" onClose={() => setOpen(false)}>
        <div style={{ maxHeight: '300px', overflow: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginBottom: '0.75rem' }}>
              Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </Modal>
    </>
  )
}
