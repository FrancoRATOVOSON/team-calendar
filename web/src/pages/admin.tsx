import {LoaderFunction} from 'react-router-dom'
import {getUsers,getActionTypes} from '@/services/admin'
import { Admin, useAdminLoaderData } from '@/app/admin'

export const Loader:LoaderFunction = async () => {
  const {users} = await getUsers()
  const {actions} = await getActionTypes()

  return {users, actions}
}

export default function Page() {
  const {users, actions} = useAdminLoaderData()
  return (
    <Admin
      actions={actions}
      users={users}
    />
  )
}
