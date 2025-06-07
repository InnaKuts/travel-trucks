import { createSlice } from "@reduxjs/toolkit";

// LocalStorage key for favorites
const FAVORITES_STORAGE_KEY = "travel-trucks-favorites";

// Helper functions for localStorage
const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Failed to load favorites from localStorage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favoriteIds) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  } catch (error) {
    console.warn("Failed to save favorites to localStorage:", error);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteIds: loadFavoritesFromStorage(),
  },
  reducers: {
    // Add a camper to favorites
    addToFavorites: (state, action) => {
      const camperId = action.payload;
      if (!state.favoriteIds.includes(camperId)) {
        state.favoriteIds.push(camperId);
        saveFavoritesToStorage(state.favoriteIds);
      }
    },

    // Remove a camper from favorites
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      const index = state.favoriteIds.indexOf(camperId);
      if (index !== -1) {
        state.favoriteIds.splice(index, 1);
        saveFavoritesToStorage(state.favoriteIds);
      }
    },

    // Toggle favorite status
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.favoriteIds.indexOf(camperId);

      if (index !== -1) {
        // Remove from favorites
        state.favoriteIds.splice(index, 1);
      } else {
        // Add to favorites
        state.favoriteIds.push(camperId);
      }

      saveFavoritesToStorage(state.favoriteIds);
    },

    // Clear all favorites
    clearFavorites: (state) => {
      state.favoriteIds = [];
      saveFavoritesToStorage([]);
    },

    // Set favorites (for initial load or sync)
    setFavorites: (state, action) => {
      state.favoriteIds = action.payload;
      saveFavoritesToStorage(state.favoriteIds);
    },

    // Load favorites from localStorage (manual sync)
    loadFavorites: (state) => {
      state.favoriteIds = loadFavoritesFromStorage();
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
  setFavorites,
  loadFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;

// Selectors
export const selectFavoriteIds = (state) => state.favorites.favoriteIds;
export const selectIsFavorite = (camperId) => (state) =>
  state.favorites.favoriteIds.includes(camperId);
export const selectFavoritesCount = (state) =>
  state.favorites.favoriteIds.length;

// Helper selector to get favorite campers from campers data
export const selectFavoriteCampers = (state) => {
  const { favoriteIds } = state.favorites;
  const { campers } = state.campers;

  return campers.filter((camper) => favoriteIds.includes(camper.id));
};
