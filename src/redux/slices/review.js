import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchReviews = createAsyncThunk(
  "/reviews/fetchReviews",
  async () => {
    const { data } = await axios.get("/reviews");
    return data;
  }
);

export const fetchRemoveReview = createAsyncThunk(
  "/reviews/fetchRemoveReviews",
  async (id) => {
    await axios.delete(`/reviews/${id}`);
  }
);

const initialState = {
  reviews: {
    items: [],
    status: "loading",
  },
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.reviews.status = "loading";
        state.reviews.items = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews.items = action.payload;
        state.reviews.status = "loaded";
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviews.status = "error";
        state.reviews.items = null;
      })
      .addCase(fetchRemoveReview.pending, (state, action) => {
        state.reviews.routes.items = state.reviews.routes.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      });
  },
});

export const reviewReducer = reviewsSlice.reducer;
