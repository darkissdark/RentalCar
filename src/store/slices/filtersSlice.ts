import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FetchCarsParams } from "../../types/car";

interface FiltersState {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

const initialState: FiltersState = {};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (_state, action: PayloadAction<FetchCarsParams>) => {
      return { ...action.payload };
    },
    setBrand: (state, action: PayloadAction<string | undefined>) => {
      state.brand = action.payload;
    },
    setRentalPrice: (state, action: PayloadAction<string | undefined>) => {
      state.rentalPrice = action.payload;
    },
    setMileageRange: (
      state,
      action: PayloadAction<{ min?: string; max?: string }>
    ) => {
      state.minMileage = action.payload.min;
      state.maxMileage = action.payload.max;
    },
  },
});

export const { setFilters, setBrand, setRentalPrice, setMileageRange } =
  filtersSlice.actions;
export default filtersSlice.reducer;
