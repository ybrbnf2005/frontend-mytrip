import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRoutes = createAsyncThunk("/routes/fetchRoutes", async () => {
  const { data } = await axios.get("/");
  return data;
});

export const fetchRemoveRoute = createAsyncThunk(
  "/routes/fetchRemoveRoutes",
  async (id) => {
    axios.delete(`/route/${id}`);
  }
);

const initialState = {
  routes: {
    items: [],
    status: "loading",
  },
};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.routes.items = [];
        state.routes.status = "loading";
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.routes.items = action.payload;
        state.routes.status = "loaded";
      })
      .addCase(fetchRoutes.rejected, (state) => {
        state.routes.items = [];
        state.routes.status = "error";
      })
      .addCase(fetchRemoveRoute.pending, (state, action) => {
        state.routes.items = state.routes.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});
export const routesReducer = routesSlice.reducer;
