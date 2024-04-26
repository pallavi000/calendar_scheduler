import { TNewEventFormData } from "../@types/events";
import axiosInstance from "./axiosInstance";

export function getAllEventsApiService() {
  return axiosInstance.get("/events");
}

export function createNewEventApiService(data: TNewEventFormData) {
  return axiosInstance.post("/events", data);
}

export function updateEventApiService(id: number, newData: TNewEventFormData) {
  return axiosInstance.put(`/events/${id}`, newData);
}

export function deleteEventApiService(id: number) {
  return axiosInstance.delete(`/events/${id}`);
}

export function clearEventNotificationApiService(id: string) {
  return axiosInstance.delete(`/events/schedule/${id}`);
}
