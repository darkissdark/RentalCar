import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars, type FetchCarsResponse } from "../../services/CarService";
import type { Car, FetchCarsParams } from "../../types/car";

interface CarsState {
  cars: Car[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCars: number;
  hasMorePages: boolean;
}

const initialState: CarsState = {
  cars: [],
  loading: false,
  loadingMore: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalCars: 0,
  hasMorePages: false,
};

export const fetchCarsAsync = createAsyncThunk<
  FetchCarsResponse,
  { params?: FetchCarsParams; page?: number; append?: boolean },
  { rejectValue: string }
>("cars/fetchCars", async ({ params = {}, page = 1 }, { rejectWithValue }) => {
  try {
    const fetchParams = { ...params, page };
    const response = await fetchCars(fetchParams);
    return response;
  } catch {
    return rejectWithValue("Failed to fetch cars");
  }
});

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    resetCars: (state) => {
      state.cars = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalCars = 0;
      state.hasMorePages = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsAsync.pending, (state, action) => {
        if (action.meta.arg.append) {
          state.loadingMore = true;
        } else {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchCarsAsync.fulfilled, (state, action) => {
        const { cars, totalCars, page, totalPages } = action.payload;

        if (action.meta.arg.append) {
          state.cars = [...state.cars, ...cars];
        } else {
          state.cars = cars;
        }

        state.currentPage = page;
        state.totalPages = totalPages;
        state.totalCars = totalCars;
        state.hasMorePages = page < totalPages;
        state.loading = false;
        state.loadingMore = false;
      })
      .addCase(fetchCarsAsync.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cars";
        state.loading = false;
        state.loadingMore = false;
      });
  },
});

export const { resetCars, clearError } = carsSlice.actions;
export default carsSlice.reducer;
