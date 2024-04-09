import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { UserType } from '@/lib/types'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Button } from '@/components/ui/button'

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
        <Button variant='outline' size='icon'>
          <Pencil1Icon className='size-4' />
        </Button>
        <Button variant='outline' size='icon'>
          <TrashIcon className='size-5' />
        </Button>
      </div>
    </Card>
  )
}
