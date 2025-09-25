import axios from "axios";
import type { Car, FetchCarsParams } from "../types/car";

const API_URL = "https://car-rental-api.goit.global/";

const api = axios.create({
  baseURL: API_URL,
});

export const fetchBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>("brands");
  return response.data;
};

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const fetchCars = async (
  params: FetchCarsParams
): Promise<FetchCarsResponse> => {
  const response = await api.get<FetchCarsResponse>("cars", { params });
  return response.data;
};
