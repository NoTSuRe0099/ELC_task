import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Entry, FormState } from './type';


const initialState: FormState = {
  entries: [],
  filteredEntries: [],
  searchTerm: '',
  filterOption: 'email',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addEntry: (state, action: { payload: Entry; }) => {
      state.entries.push(action.payload);
      state.filteredEntries.push(action.payload);
    },
    filterEntries: (state, action: { payload: { searchTerm: string; filterOption: 'name' | 'email' | 'message'; }; }) => {
      state.searchTerm = action.payload.searchTerm;
      state.filterOption = action.payload.filterOption;
      state.filteredEntries = state.entries.filter((entry) =>
        entry[state.filterOption].toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredEntries = state.entries;
    },
  },
});

export const { addEntry, filterEntries, clearSearch } = formSlice.actions;

export default formSlice.reducer;