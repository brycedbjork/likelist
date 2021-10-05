import { auth } from "@/firebase";
import axios, { AxiosRequestConfig } from "axios";

export default function api(config?: Partial<AxiosRequestConfig>) {
  return axios.create({
    baseURL: "/api",
    timeout: 8000,
    ...config,
  });
}
