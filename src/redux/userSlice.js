//libs
import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
//helpers
import { getDisplayUsers, getFilteredUsers } from "./helpers";

//initialState for user reducer
const initialState = {
  searchTerm: "",
  currentPage: 1,
  toastMessage: "",
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
    updateUserEdit: (state, action) => {
      const { id, value } = action.payload;
      state.users.entities[id].editable = value;
    },
    updateUserSave: (state, action) => {
      const { id, value, name, email, role } = action.payload;
      state.users.entities[id].editable = value;
      state.users.entities[id].name = name;
      state.users.entities[id].email = email;
      state.users.entities[id].role = role;
    },
    updateUsersSelect: (state, action) => {
      const { ids, value } = action.payload;
      ids.forEach((id) => {
        state.users.entities[id].selected = value;
      });
    },
    deleteUsers: (state, action) => {
      const usersToDelete = action.payload;
      usersToDelete.forEach((userToDelete) => {
        delete state.users.entities[userToDelete];
        const idx = state.users.ids.findIndex((id) => id === userToDelete);
        state.users.ids.splice(idx, 1);
      });
    },
    updateToastMessage: (state, action) => {
      state.toastMessage = action.payload;
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

export const selectDeleteBtnActive = createDraftSafeSelector(
  selectuser,
  (state) => {
    const { ids, entities } = state.users;
    return ids.some((id) => entities[id].selected);
  },
);

export const selectDisplayUsers = createDraftSafeSelector(
  selectuser,
  ({ searchTerm, currentPage, users }) => {
    return getDisplayUsers(currentPage, getFilteredUsers(searchTerm, users));
  },
);

export const selectToastMessage = createDraftSafeSelector(
  selectuser,
  (state) => {
    return state.toastMessage;
  },
);
