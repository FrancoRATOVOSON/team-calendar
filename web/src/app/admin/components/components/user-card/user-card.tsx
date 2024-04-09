import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { UserType } from '@/lib/types'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

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
          variant={'destructive'}
          size={'icon'}
          onClick={() => setopen(true)}
        >
          <TrashIcon className='size-4'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change action name :</DialogTitle>
        </DialogHeader>
        <div className='text-wrap'>
          {`Are you sure you want to delete the user ${name} with the email ${email} ?`}
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

interface UserCardProps extends UserType {
  onSelectedChange: (state:boolean, id: number) => void
  selected?: boolean
}

export default function UserCard({id, name, email, onSelectedChange, selected}:UserCardProps) {
  const handleCheckChange = React.useCallback(
    (check:CheckedState) => {
      if(check === true) onSelectedChange(true,id)
      else onSelectedChange(false,id)
    },[id, onSelectedChange]
  )
  
  return (
    <Card className='flex items-center'>
      <div className='size-9 grid content-center'>
        <Checkbox id={email} checked={selected} onCheckedChange={handleCheckChange}/>
      </div>
      <div className='space-y-1'>
        <label htmlFor={email} className='font-medium leading-none'>
          {name}
        </label>
        <div className='text-sm text-muted-foreground'>{email}</div>
      </div>
      <div className='ml-auto'>
        <EditUser id={id} name={name} email={email}/>
        <DeleteUser id={id} name={name} email={email}/>
      </div>
    </Card>
  )
}
