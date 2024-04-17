import React from 'react'

interface EventDialogProps {
  open: boolean
  eventId: string
  onSave?: () => void
  onDelete?: () => void
  onCancel?: () => void
}

export default function EventDialog({open,eventId}:EventDialogProps) {
  return (
    <div>EventDialog</div>
  )
}
