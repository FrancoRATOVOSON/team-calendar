import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { UserType } from '@/lib/types'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function EditUser({name, email}:UserType) {
  const [userName,setUserName] = React.useState(name)
  const [userMail,setUserMail] = React.useState(email)
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
          <label htmlFor={`edit-user-${email}-name`}>Name :</label>
          <Input
            id={`edit-user-${email}-name`}
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`edit-user-${email}-email`} ></label>
          <Input
            id={`edit-user-${email}-email`}
            value={userMail}
            onChange={e => setUserMail(e.target.value)}
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

function DeleteUser({name, email}:UserType) {
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
          variant={'ghost'}
          size={'icon'}
          onClick={() => setopen(true)}
        >
          <TrashIcon className='size-4 text-destructive'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change action name :</DialogTitle>
        </DialogHeader>
        <div className='text-wrap'>
          {`Are you sure you want to delete the user ${name} with the email ${email} ?`}
        </div>
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
      </DialogContent>
    </Dialog>
  )
}

interface UserCardProps extends UserType {
  onSelectedChange: (state:boolean, id: number) => void
  selected?: boolean
  className?: string
}

export default function UserCard({id, name, email, onSelectedChange, selected, className}:UserCardProps) {
  const handleCheckChange = React.useCallback(
    (check:CheckedState) => {
      if(check === true) onSelectedChange(true,id)
      else onSelectedChange(false,id)
    },[id, onSelectedChange]
  )
  
  return (
    <Card
      className={cn(
        'p-4',
        'flex items-center',
        className
      )}
    >
      <div className='size-9 grid content-center ml-2'>
        <Checkbox id={email} checked={selected} onCheckedChange={handleCheckChange}/>
      </div>
      <label
        htmlFor={email}
        className={cn(
          'flex flex-col gap-1',
          'font-medium leading-none',
          'cursor-pointer'
        )}
      >
          <span className='font-semibold'>{name}</span>
        <span className='text-sm text-muted-foreground'>{email}</span>
      </label>
      <div className='ml-auto flex justify-end items-center gap-2'>
        <EditUser id={id} name={name} email={email}/>
        <DeleteUser id={id} name={name} email={email}/>
      </div>
    </Card>
  )
}
