import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchAllCities = createAsyncThunk("cities/fetchAll", async () => {
  const response = await fetch("http://localhost:8080/api/cities/all");
  if (!response.ok) throw new Error(`Error en la red: ${response.status}`);
  const data = await response.json();
  return data.response;
});

export const fetchCityById = createAsyncThunk(
  "cities/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cities/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data.response;
    } catch (err) {
      console.error("Error fetching city:", err);
      return rejectWithValue(err.message);
    }
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    destinations: [],
    currentCity: null,
    loading: false,
    error: null,
    searchTerm: "",
    filteredCities: [],
    currentIndex: 0,
  },
  reducers: {
    searchCities: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredCities = state.destinations.filter((city) =>
        city.title.toLowerCase().startsWith(action.payload.toLowerCase())
      );
    },
    clearCurrentCity: (state) => {
      state.currentCity = null;
      state.error = null;
    },
    nextSlide: (state) => {
      state.currentIndex =
        (state.currentIndex + 1) % Math.ceil(state.destinations.length / 4);
    },
    prevSlide: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + Math.ceil(state.destinations.length / 4)) %
        Math.ceil(state.destinations.length / 4);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
        state.filteredCities = action.payload;
        state.error = null;
        state.currentIndex = 0; // Reinicia el índice al cargar nuevas ciudades
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCity = action.payload;
        state.error = null;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Maneja el error aquí
      });
  },
});

export const { searchCities, nextSlide, prevSlide, clearCurrentCity } =
  citiesSlice.actions;
export default citiesSlice.reducer;
