import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for API calls
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ filters = {}, page = 1, limit = 4 }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${queryParams}`
      );

      if (!response.ok) {
        // Treat 404 as empty results, not an error
        if (response.status === 404) {
          return { data: [], page, limit };
        }
        throw new Error("Failed to fetch campers");
      }

      let data = await response.json();
      if (!Array.isArray(data)) {
        data = data.items || [];
      }

      return { data, page, limit };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch camper details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    // Data
    campers: [],
    currentCamper: null,

    // Loading states
    loading: false,
    loadingMore: false,
    loadingCamper: false,

    // Error handling
    error: null,
    camperError: null,

    // Pagination
    pagination: {
      page: 1,
      limit: 4,
      hasMore: true,
      total: 0,
    },
  },
  reducers: {
    // Reset campers list (for new search)
    resetCampers: (state) => {
      state.campers = [];
      state.pagination.page = 1;
      state.pagination.hasMore = true;
      state.error = null;
    },

    // Clear current camper
    clearCurrentCamper: (state) => {
      state.currentCamper = null;
      state.camperError = null;
    },

    // Clear all errors
    clearErrors: (state) => {
      state.error = null;
      state.camperError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch campers
    builder
      .addCase(fetchCampers.pending, (state, action) => {
        const isLoadMore = action.meta.arg.page > 1;
        if (isLoadMore) {
          state.loadingMore = true;
        } else {
          state.loading = true;
          state.campers = [];
        }
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const { data, page } = action.payload;

        state.loading = false;
        state.loadingMore = false;

        if (page === 1) {
          state.campers = data;
        } else {
          state.campers = [...state.campers, ...data];
        }
        state.pagination.page = page;

        state.pagination.hasMore = data.length === state.pagination.limit;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload;
      });

    // Fetch camper by ID
    builder
      .addCase(fetchCamperById.pending, (state) => {
        state.loadingCamper = true;
        state.camperError = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loadingCamper = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loadingCamper = false;
        state.camperError = action.payload;
      });
  },
});

export const { resetCampers, clearCurrentCamper, clearErrors } =
  campersSlice.actions;

export default campersSlice.reducer;

// Selectors
export const selectCampers = (state) => state.campers.campers;
export const selectCurrentCamper = (state) => state.campers.currentCamper;
export const selectCampersLoading = (state) => state.campers.loading;
export const selectCampersLoadingMore = (state) => state.campers.loadingMore;
export const selectCamperLoading = (state) => state.campers.loadingCamper;
export const selectCampersError = (state) => state.campers.error;
export const selectCamperError = (state) => state.campers.camperError;
export const selectCurrentPage = (state) => state.campers.pagination.page;
export const selectHasMore = (state) => state.campers.pagination.hasMore;
export const selectTotalPages = (state) =>
  Math.ceil(state.campers.pagination.total / state.campers.pagination.limit);
export const selectPagination = (state) => state.campers.pagination;
