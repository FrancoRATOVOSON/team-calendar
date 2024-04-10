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
    <div className='min-h-screen w-full p-6 space-y-6'>
      <h1 className='font-semibold text-4xl'>Admin Page</h1>
      <div className='space-y-4'>
      <Admin
        actions={actions}
        users={users}
      />
      </div>
    </div>
  )
}
