import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  carIds: string[];
}

const loadFavoritesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem("favoriteCarIds");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (carIds: string[]) => {
  try {
    localStorage.setItem("favoriteCarIds", JSON.stringify(carIds));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
};

const initialState: FavoritesState = {
  carIds: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      const carId = action.payload;
      if (!state.carIds.includes(carId)) {
        state.carIds.push(carId);
        saveFavoritesToStorage(state.carIds);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const carId = action.payload;
      state.carIds = state.carIds.filter((id) => id !== carId);
      saveFavoritesToStorage(state.carIds);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const carId = action.payload;
      const existingIndex = state.carIds.indexOf(carId);

      if (existingIndex >= 0) {
        state.carIds.splice(existingIndex, 1);
      } else {
        state.carIds.push(carId);
      }

      saveFavoritesToStorage(state.carIds);
    },
    clearFavorites: (state) => {
      state.carIds = [];
      saveFavoritesToStorage(state.carIds);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
