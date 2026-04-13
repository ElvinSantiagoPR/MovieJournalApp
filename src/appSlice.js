import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  searchTermHistory: [],
  resultsPerPage: 10,
  currentPage: 1,
  results: [],
  resultsCount: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addSearchTermHistory: (state, action) => {
      state.searchTermHistory.push(action.payload);
    },
    setResultsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setResultsCount: (state, action) => {
      state.resultsCount = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  addSearchTermHistory,
  setResultsPerPage,
  setCurrentPage,
  setResults,
  setResultsCount,
} = appSlice.actions;

export default appSlice.reducer;
