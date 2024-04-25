import { TEvent, TNewEventFormData } from "../@types/events";

export function createNewEventApiService(data: TNewEventFormData) {
  const previousData = getAllEventsApiService();
  return localStorage.setItem(
    "events",
    JSON.stringify([...previousData.data, data])
  );
}

export function getAllEventsApiService() {
  const data = localStorage.getItem("events");
  if (data) return { data: JSON.parse(data) };
  return { data: [] };
}
