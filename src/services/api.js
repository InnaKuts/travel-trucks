import axios from "axios";

// API base configuration
const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);

      // Customize error messages based on status
      switch (status) {
        case 404:
          error.message = "Resource not found";
          break;
        case 500:
          error.message = "Internal server error";
          break;
        case 503:
          error.message = "Service unavailable";
          break;
        default:
          error.message = data?.message || "An error occurred";
      }
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.request);
      error.message = "Network error - please check your connection";
    } else {
      // Something else went wrong
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// API service methods
export const campersAPI = {
  // Fetch all campers with optional filters and pagination
  fetchCampers: async (filters = {}, page = 1, limit = 4) => {
    try {
      const params = {
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      };

      const response = await apiClient.get("/campers", { params });

      // Normalize response data structure
      let data = response.data;
      if (!Array.isArray(data)) {
        data = data.items || [];
      }

      return { data, page, limit };
    } catch (error) {
      // Handle 404 as empty results, not an error
      if (error.response?.status === 404) {
        return { data: [], page, limit };
      }
      throw error;
    }
  },

  // Fetch single camper by ID
  fetchCamperById: async (id) => {
    try {
      const response = await apiClient.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`Camper with ID ${id} not found`);
      }
      throw error;
    }
  },

  // Future API methods can be added here
  // updateCamper: async (id, data) => { ... },
  // deleteCamper: async (id) => { ... },
  // createBooking: async (bookingData) => { ... },
};

// Export the axios instance for direct use if needed
export { apiClient };

// Export default as campersAPI for convenience
export default campersAPI;
