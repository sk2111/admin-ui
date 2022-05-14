import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  users: {
    loading: false,
    error: "",
    ids: [],
    entities: {},
  },
};

//async thunk actions
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (url) => {
  const response = await fetch(url);
  const rawData = await response.json();
  const users = rawData.map((user) => {
    user.editable = false;
    user.selected = false;
    return user;
  });
  return {
    ids: users.map((user) => user.id),
    entities: users,
  };
});

//reducer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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

//selectors
const selectuser = (state) => state.user;
export const selectSearchTerm = createDraftSafeSelector(
  selectuser,
  (state) => state.searchTerm,
);

//reducer
export default userSlice.reducer;
