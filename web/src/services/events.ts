import { EventInputType, EventListType, EventType } from "@/lib/types";
import { api, getAPIHeader } from "@/lib/utils";

export async function getUserEvents(): Promise<EventListType> {
  const response = await api
    .get<{ events: EventListType }>("/event", getAPIHeader())
    .catch((err) => {
      throw err;
    });

  return Promise.resolve(
    response.data.events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: event.end && new Date(event.end)
    }))
  );
}

export function createUserEvent(event: Omit<EventType, "id">) {
  return api.post("/event", event, getAPIHeader());
}

export function updateEvent(id: number, data: EventInputType) {
  return api.patch(`/event/${id}`, data, getAPIHeader());
}

export function deleteEvent(id: number) {
  return api.delete(`/event/${id}`, getAPIHeader());
}
