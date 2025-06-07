import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    // Location filter
    location: "",

    // Equipment filters
    equipment: {
      AC: false,
      automatic: false,
      kitchen: false,
      TV: false,
      bathroom: false,
      water: false,
      gas: false,
      radio: false,
      refrigerator: false,
      microwave: false,
    },

    // Form type filter
    form: "", // "alcove" | "fullyIntegrated" | "panelTruck" | ""

    // Active filters for display/tracking
    activeFilters: [],
  },
  reducers: {
    // Set location filter
    setLocationFilter: (state, action) => {
      state.location = action.payload;
      updateActiveFilters(state);
    },

    // Toggle equipment filter
    toggleEquipmentFilter: (state, action) => {
      const equipment = action.payload;
      state.equipment[equipment] = !state.equipment[equipment];
      updateActiveFilters(state);
    },

    // Set form type filter
    setFormFilter: (state, action) => {
      state.form = action.payload;
      updateActiveFilters(state);
    },

    // Clear all filters
    clearFilters: (state) => {
      state.location = "";
      state.equipment = {
        AC: false,
        automatic: false,
        kitchen: false,
        TV: false,
        bathroom: false,
        water: false,
        gas: false,
        radio: false,
        refrigerator: false,
        microwave: false,
      };
      state.form = "";
      state.activeFilters = [];
    },

    // Clear specific filter type
    clearLocationFilter: (state) => {
      state.location = "";
      updateActiveFilters(state);
    },

    clearEquipmentFilters: (state) => {
      state.equipment = {
        AC: false,
        automatic: false,
        kitchen: false,
        TV: false,
        bathroom: false,
        water: false,
        gas: false,
        radio: false,
        refrigerator: false,
        microwave: false,
      };
      updateActiveFilters(state);
    },

    clearFormFilter: (state) => {
      state.form = "";
      updateActiveFilters(state);
    },

    // Set multiple filters at once (for URL params or saved filters)
    setFilters: (state, action) => {
      const { location, equipment, form } = action.payload;

      if (location !== undefined) {
        state.location = location;
      }

      if (equipment !== undefined) {
        state.equipment = { ...state.equipment, ...equipment };
      }

      if (form !== undefined) {
        state.form = form;
      }

      updateActiveFilters(state);
    },
  },
});

// Helper function to update active filters array
function updateActiveFilters(state) {
  const activeFilters = [];

  // Add location filter
  if (state.location.trim()) {
    activeFilters.push({
      type: "location",
      label: `Location: ${state.location}`,
      value: state.location,
    });
  }

  // Add equipment filters
  Object.entries(state.equipment).forEach(([key, value]) => {
    if (value) {
      activeFilters.push({
        type: "equipment",
        label: key,
        value: key,
      });
    }
  });

  // Add form filter
  if (state.form) {
    const formLabels = {
      alcove: "Alcove",
      fullyIntegrated: "Fully Integrated",
      panelTruck: "Panel Truck",
    };

    activeFilters.push({
      type: "form",
      label: formLabels[state.form] || state.form,
      value: state.form,
    });
  }

  state.activeFilters = activeFilters;
}

export const {
  setLocationFilter,
  toggleEquipmentFilter,
  setFormFilter,
  clearFilters,
  clearLocationFilter,
  clearEquipmentFilters,
  clearFormFilter,
  setFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// Selectors
export const selectFilters = (state) => state.filters;
export const selectLocationFilter = (state) => state.filters.location;
export const selectEquipmentFilters = (state) => state.filters.equipment;
export const selectFormFilter = (state) => state.filters.form;
export const selectActiveFilters = (state) => state.filters.activeFilters;

// Helper selector to get API-ready filter object
export const selectAPIFilters = (state) => {
  const filters = {};

  // Add location filter
  if (state.filters.location.trim()) {
    filters.location = state.filters.location;
  }

  // Add equipment filters
  Object.entries(state.filters.equipment).forEach(([key, value]) => {
    if (value) {
      filters[key] = true;
    }
  });

  // Add form filter
  if (state.filters.form) {
    filters.form = state.filters.form;
  }

  return filters;
};
