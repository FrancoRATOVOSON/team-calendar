import { UserListType } from '@/lib/types'
import useList from './useList'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { UserCard } from '../user-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
    pageCount
  } = useList(list)

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <div>
            {`${selectedUsers.size} of ${list.length} user(s) selected.`}
          </div>
          {selectedUsers.size > 0 && (
            <Button
              variant='destructive'
            >
              Delete selected users
            </Button>
          )}
        </div>
        <div>
          <div>Rows per page</div>
          <Select
            value={`${pageSize}`}
            onValueChange={value => changePageSize(Number(value))}
          >
            <SelectTrigger>
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
      <div>
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
        className={cn(
          'flex justify-start items-center gap-2'
        )}
      >
        <Button
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon className='size-4 mr-2'/>
          Previous
        </Button>
        <div className='text-muted-foreground'>
          {`Page ${currentPage} of ${pageCount}`}
        </div>
        <Button
          onClick={nextPage}
          disabled={currentPage >= pageCount}
        >
          Next
          <ChevronRightIcon className='size-4 ml-2'/>
        </Button>
      </div>
    </div>
  )
}
