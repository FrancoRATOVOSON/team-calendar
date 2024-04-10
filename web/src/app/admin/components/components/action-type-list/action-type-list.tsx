import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ActionTypeListType } from '@/lib/types'
import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'
import ActionType from '../action-type/action-type'

function CreateActionType() {
  const [value,setvalue] = React.useState('')
  const [open,setopen] = React.useState(false)

  const handleConfirm = React.useCallback(() => {
    setopen(false)
  },[])

  return (
    <Dialog
      open={open}
      onOpenChange={setopen}
      defaultOpen={false}
    >
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          onClick={() => setopen(true)}
        >
          <PlusIcon className='size-4 mr-2' />
          Create Action Type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New action category name :</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={value}
            onChange={e => setvalue(e.target.value)}
          />
        </div>
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
      </DialogContent>
    </Dialog>
  )
}

interface ActionTypeListProps {
  list: ActionTypeListType
}

export default function ActionTypeList({list}:ActionTypeListProps) {
  return (
    <div className='space-y-4'>
      <CreateActionType/>
      <div className='flex justify-start items-center flex-wrap gap-4'>
        {list.map(actionType => (
          <ActionType
            {...actionType}
            key={`action-type-${actionType.name}`}
            className='flex-none w-48 justify-between'
          />
        ))}
      </div>
    </div>
  )
}
