import { UserListType } from '@/lib/types'
import useList from './useList'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { UserCard } from '../user-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface UserListProps {
  list: UserListType
}

export default function UserList({list}:UserListProps) {
  const {
    users,
    handleUserSelect,
    changePageSize,
    nextPage,
    prevPage,
    pageSize,
    selectedUsers,
    currentPage,
    pageCount,
    toggleSelectAll
  } = useList(list)

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          {selectedUsers.size > 0 && (
            <Button
              variant='destructive'
            >
              Delete selected users
            </Button>
          )}
        </div>
        <div
          className='flex justify-end gap-2 items-center'
        >
          <div className='text-muted-foreground text-nowrap'>Rows per page</div>
          <Select
            value={`${pageSize}`}
            onValueChange={value => changePageSize(Number(value))}
          >
            <SelectTrigger className='w-16'>
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side='bottom'>
              {[5,10,15,20,30,50].map(size => (
                <SelectItem key={`pageSize-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='space-y-4'>
        {users.map(user => (
          <UserCard
            {...user}
            key={user.email}
            selected={selectedUsers.has(user.id)}
            onSelectedChange={handleUserSelect}
          />
        ))}
      </div>
      <div
        className='flex justify-between items-center'
      >
        <div className='flex justify-start items-center gap-4'>
          <div className='flex gap-2 justify-start items-center'>
            <Checkbox
              checked={selectedUsers.size > 0}
              onCheckedChange={toggleSelectAll}
              id='all-users-selection'
            />
            <label
              className='text-muted-foreground cursor-pointer'
              htmlFor='all-users-selection'
            >
              {selectedUsers.size > 0
                ? `Unselect all`
                : `Select all`
              }
            </label>
          </div>
          <p>{`${selectedUsers.size} of ${list.length} user(s) selected.`}</p>
        </div>
        <div
          className={cn(
            'flex justify-start items-center gap-2'
          )}
        >
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className='size-4'/>
          </Button>
          <div className='text-muted-foreground'>
            {`Page ${currentPage} of ${pageCount}`}
          </div>
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={nextPage}
            disabled={currentPage >= pageCount}
          >
            <ChevronRightIcon className='size-4'/>
          </Button>
        </div>
      </div>
    </div>
  )
}
