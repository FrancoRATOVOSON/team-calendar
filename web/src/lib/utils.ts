import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CONFIG from "./config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = axios.create({
  baseURL: CONFIG.base_url,
  headers: {
    Authorization: CONFIG.Authorization
  }
})