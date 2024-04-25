import { TEvent, TNewEventFormData } from "../@types/events";

export function createNewEventApiService(data: TNewEventFormData) {
  const previousData = getAllEventsApiService();
  const eventData: TEvent = {
    ...data,
    id: previousData.data.length
      ? previousData.data[previousData.data.length - 1].id + 1
      : 1,
  };
  return localStorage.setItem(
    "events",
    JSON.stringify([...previousData.data, eventData])
  );
}

export function getAllEventsApiService() {
  const data = localStorage.getItem("events");
  if (data) return { data: JSON.parse(data) };
  return { data: [] };
}

export function deleteEventApiService(id: number) {
  const response = getAllEventsApiService();
  const rest = response.data.filter((d: TEvent) => d.id !== id);
  return localStorage.setItem("events", JSON.stringify(rest));
}
