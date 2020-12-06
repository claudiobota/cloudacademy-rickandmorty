import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {EpisodeState, StoreState} from '../../types/redux-states';
import ApiService from '../../services/api';

const initialState: EpisodeState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchAllEpisodes = createAsyncThunk(
  'episode/fetchAllEpisodes',
  () => ApiService.retrieveAllEpisodes()
);

export const episodeSlice = createSlice({
  name: 'episode',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchAllEpisodes.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(fetchAllEpisodes.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload || [];
    });

    builder.addCase(fetchAllEpisodes.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message
    });
  }
});

export const episodeActions = episodeSlice.actions;
export const episodeReducer = episodeSlice.reducer;
export const selectAllEpisodes = (state: StoreState) => state.episode.items;
export default episodeReducer;
