import React from 'react'
import {Calendar, dateFnsLocalizer} from 'react-big-calendar'
import {be} from 'date-fns/locale'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useLoadData } from '@/lib/hooks'
import { getUserEvents } from '@/services'

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

export default function UserPage() {
  const {data,loading,error,reloadData} = useLoadData(getUserEvents)

  return (
    <div className='h-screen p-6'>
      <div className='w-full h-full'>
        <Calendar
          localizer={localizer}
          // components={}
          events={data}
        />
      </div>
    </div>
  )
}
