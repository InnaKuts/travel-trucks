// Store
export { store } from "./store";

// Campers slice
export {
  fetchCampers,
  fetchCamperById,
  resetCampers,
  clearCurrentCamper,
  clearErrors,
  selectCampers,
  selectCurrentCamper,
  selectCampersLoading,
  selectCampersLoadingMore,
  selectCamperLoading,
  selectCampersError,
  selectCamperError,
  selectCurrentPage,
  selectHasMore,
  selectTotalPages,
  selectPagination,
} from "./slices/campersSlice";

// Filters slice
export {
  setLocationFilter,
  toggleEquipmentFilter,
  setFormFilter,
  clearFilters,
  clearLocationFilter,
  clearEquipmentFilters,
  clearFormFilter,
  setFilters,
  selectFilters,
  selectLocationFilter,
  selectEquipmentFilters,
  selectFormFilter,
  selectActiveFilters,
  selectAPIFilters,
} from "./slices/filtersSlice";

// Favorites slice
export {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
  setFavorites,
  loadFavorites,
  selectFavoriteIds,
  selectIsFavorite,
  selectFavoritesCount,
  selectFavoriteCampers,
} from "./slices/favoritesSlice";
