import { ActionTypes, Users } from './components'
import { UserListType } from '@/lib/types'

interface AdminProps {
  users: UserListType
}

export default function Admin({users}:AdminProps) {
  return (
    <>
      <ActionTypes/>
      <Users users={users}/>
    </>
  )
}
