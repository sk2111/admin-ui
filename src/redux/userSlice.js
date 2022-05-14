//libs
import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
//constants
import { pagination } from "config/constants";

const { pageOffset, recordsPerPage } = pagination;

//initialState for user reducer
const initialState = {
  searchTerm: "",
  currentPage: 1,
  users: {
    loading: false,
    error: "",
    ids: [],
    entities: {},
  },
};

//async thunk actions
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (url) => {
  const ids = [];
  const entities = {};
  const response = await fetch(url);
  const users = await response.json();
  users.forEach((user) => {
    user.editable = false;
    user.selected = false;
    ids.push(user.id);
    entities[user.id] = user;
  });
  return {
    ids,
    entities,
  };
});

//reducer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = initialState.currentPage;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.ids = action.payload.ids;
        state.users.entities = action.payload.entities;
        state.users.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = action.error.message;
      });
  },
});

//actions
export const userActions = userSlice.actions;

//reducer
export default userSlice.reducer;

//helpers
const getDisplayUsers = (currentPage, users) => {
  const entities = {};
  const startIdx = (currentPage - pageOffset) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const ids = users.ids.slice(startIdx, endIdx);
  ids.forEach((id) => (entities[id] = users.entities[id]));
  return { ids, entities };
};

//selectors
const selectuser = (state) => state.user;

export const selectSearchTerm = createDraftSafeSelector(
  selectuser,
  (state) => state.searchTerm,
);

export const selectCurrentPage = createDraftSafeSelector(
  selectuser,
  (state) => state.currentPage,
);

export const selectDisplayUsers = createDraftSafeSelector(
  selectuser,
  ({ searchTerm, currentPage, users }) => {
    return {
      ...getDisplayUsers(currentPage, users),
      totalPages: Math.ceil(users.ids.length / recordsPerPage),
    };
  },
);
