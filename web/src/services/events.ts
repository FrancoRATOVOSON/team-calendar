import { EventInputType, EventListType, EventType } from "@/lib/types";
import { api } from "@/lib/utils";

export async function getUserEvents():Promise<EventListType> {
  const response = await  api.get<{events: EventListType}>('/event').catch(err => {
    throw err
  })

  return Promise.resolve(
    response.data.events.map(
      event => ({
        ...event,
        start: new Date(event.start),
        end: event.end && new Date(event.end)
      })
    )
  )
}

export function createUserEvent(event:Omit<EventType, 'id'>) {
  return api.post('/event', event)
}

export function updateEvent(id:number,data:EventInputType) {
  return api.patch(`/event/${id}`,data)
}

export function deleteEvent(id:number) {
  return api.delete(`/event/${id}`)
}