import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CharacterState, StoreState} from '../../types/redux-states';
import ApiService from '../../services/api';

const initialState: CharacterState = {
  items: [],
  selectedItem: null,
  status: 'idle',
  next: null,
  prev: null,
  count: 0,
  pages: 0,
  page: 1,
  error: null
}

export const fetchCharacters = createAsyncThunk(
  'character/fetchCharacters',
  (page: number) => ApiService.retrieveCharacters(page)
);

export const characterSlice = createSlice({
  name: 'character',
  initialState: initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.status = 'idle';
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCharacters.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload.results || [];
      state.prev = (action.payload.info && action.payload.info.prev) || null;
      state.next = (action.payload.info && action.payload.info.next) || null;
      state.count = (action.payload.info && action.payload.info.count) || 0;
      state.pages = (action.payload.info && action.payload.info.pages) || 0;
    });

    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message
    });
  }
});

export const characterActions = characterSlice.actions;
export const characterReducer = characterSlice.reducer;
export const selectAllCharacters = (state: StoreState) => state.character.items;
export default characterReducer;
