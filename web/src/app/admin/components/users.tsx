import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserListType } from '@/lib/types'
import { UserList } from './components'

interface UsersProps {
  users: UserListType
}

export default function Users({users}:UsersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          User management
        </CardTitle>
        <CardDescription>
          Here you can create, modify or delete users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserList list={users} />
      </CardContent>
    </Card>
  )
}
