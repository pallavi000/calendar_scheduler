import { TLoginInputs, TRegisterInputs } from "../@types/auth";
import axiosInstance from "./axiosInstance";

export function loginApiService(data: TLoginInputs) {
  return axiosInstance.post("/auth/login", data);
}

export function registerApiService(data: TRegisterInputs) {
  return axiosInstance.post("/auth/signup", data);
}

export function getCurrentUserApiService() {
  return axiosInstance.get("/auth/me");
}
