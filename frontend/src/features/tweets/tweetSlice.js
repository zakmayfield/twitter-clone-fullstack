import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tweetService from './tweetService';

const initialState = {
  tweets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const likeTweet = createAsyncThunk(
  'tweets/likeTweet',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tweetService.likeTweet(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTweets = createAsyncThunk(
  'tweets/getTweets',
  async (token, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tweetService.getTweets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTweet = createAsyncThunk(
  'tweets/createTweet',
  async (tweetBody, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tweetService.createTweet(tweetBody, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTweet = createAsyncThunk(
  'tweets/deleteTweet',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await tweetService.deleteTweet(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getTweets
      .addCase(getTweets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tweets = action.payload;
      })
      .addCase(getTweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tweets = [];
      })
      // createTweet
      .addCase(createTweet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tweets.unshift(action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // deleteTweet
      .addCase(deleteTweet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tweets = state.tweets.filter(
          (tweet) => tweet._id !== action.payload._id
        );
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // likeTweet
      .addCase(likeTweet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeTweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(likeTweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tweetSlice.actions;
export default tweetSlice.reducer;
