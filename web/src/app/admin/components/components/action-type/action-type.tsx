import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ActionTypeType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'

function ActionTypeEdit({name}:ActionTypeType) {
  const [value,setvalue] = React.useState(name)
  const [open,setopen] = React.useState(false)

  const handleConfirm = React.useCallback(() => {
    setopen(false)
  },[])

  return (
    <Dialog
      open={open}
      onOpenChange={setopen}
    >
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => setopen(true)}
        >
          <Pencil1Icon className='size-4'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change action name :</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={value}
            onChange={e => setvalue(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogFooter>
        <Button
          onClick={handleConfirm}
        >
          Save
        </Button>
        <DialogClose asChild>
          <Button
            variant={'outline'}
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  )
}

function ActionTypeDelete({name}:ActionTypeType) {
  const [open,setopen] = React.useState(false)

  const handleConfirm = React.useCallback(() => {
    setopen(false)
  },[])

  return (
    <Dialog
      open={open}
      onOpenChange={setopen}
    >
      <DialogTrigger asChild>
        <Button
          variant={'destructive'}
          size={'icon'}
          onClick={() => setopen(true)}
        >
          <TrashIcon className='size-4'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm delete action category :</DialogTitle>
        </DialogHeader>
        <div className='text-wrap'>
          {`Are you sure you want to delete the ${name} action category ?`}
        </div>
      </DialogContent>
      <DialogFooter>
        <Button
          variant={'destructive'}
          onClick={handleConfirm}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button
            variant={'outline'}
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  )
}

interface ActionTypeProps extends ActionTypeType {}

export default function ActionType({id,name}:ActionTypeProps) {
  return (
    <Card>
      <ActionTypeEdit id={id} name={name}/>
      <p>{name}</p>
      <ActionTypeDelete id={id} name={name}/>
    </Card>
  )
}
