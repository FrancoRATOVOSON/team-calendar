import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ActionTypeListType } from '@/lib/types'
import { ActionTypeList } from './components'

interface ActionTypesProps {
  actions: ActionTypeListType
}

export default function ActionTypes({actions}:ActionTypesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Action categories management
        </CardTitle>
        <CardDescription>
          Here you can create, modify or delete action categories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ActionTypeList list={actions} />
      </CardContent>
    </Card>
  )
}
