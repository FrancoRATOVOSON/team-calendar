import { ActionTypes, Users } from './components'
import { ActionTypeListType, UserListType } from '@/lib/types'

interface AdminProps {
  actions: ActionTypeListType
  users: UserListType
}

export default function Admin({actions,users}:AdminProps) {
  return (
    <div className='min-h-screen w-full p-6'>
      <ActionTypes actions={actions}/>
      <Users users={users}/>
    </div>
  )
}
