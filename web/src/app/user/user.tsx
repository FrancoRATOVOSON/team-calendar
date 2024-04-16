import React from 'react'
import {Calendar, dateFnsLocalizer, Views} from 'react-big-calendar'
import {be} from 'date-fns/locale'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useLoadData } from '@/lib/hooks'
import { getUserEvents } from '@/services'
import CreateEvent from './components/create-event'
import { toast } from 'sonner'

const locales = {
  'be': be,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const ColoredDateCellWrapper = ({ children }:React.PropsWithChildren) =>
  <div className='bg-cyan-500'>{children}</div>

export default function UserPage() {
  const {data,loading,error,reloadData} = useLoadData(getUserEvents)
  const { components, defaultDate, views } = React.useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      views: Object.values(Views),
    }),
    []
  )

  React.useEffect(() => {
    if(loading) toast.loading('Loading your events')
    else if(error) toast.error('Error when loading your datas')
  },[loading,error])

  return (
    <div className='min-h-screen p-6 space-y-2'>
      <CreateEvent onEventCreated={reloadData}/>
      <div className='w-full h-screen'>
        <Calendar
          localizer={localizer}
          components={components}
          defaultDate={defaultDate}
          views={views}
          events={data}
        />
      </div>
    </div>
  )
}
