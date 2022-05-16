import { redux, mockFetchUsers } from "redux/mocks/mock.data";
import { store } from "redux/store";
import userReducer, { userActions, fetchUsers } from "redux/userSlice";

const { initialState, mockUsersState } = redux;

describe("user reducer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle search term update", () => {
    const actual = userReducer(
      initialState,
      userActions.updateSearchTerm("admin"),
    );
    expect(actual.searchTerm).toEqual("admin");
  });

  it("should handle current page update", () => {
    const actual = userReducer(initialState, userActions.updateCurrentPage(3));
    expect(actual.currentPage).toEqual(3);
  });

  it("should handle users edit", () => {
    const actual = userReducer(
      mockUsersState(),
      userActions.updateUserEdit({ id: 1, value: true }),
    );
    expect(actual.users.entities[1].editable).toEqual(true);
  });

  it("should handle users save", () => {
    const userId = 1;
    const actual = userReducer(
      mockUsersState(),
      userActions.updateUserSave({
        id: userId,
        value: false,
        name: "name",
        email: "email",
        role: "role",
      }),
    );
    expect(actual.users.entities[userId].editable).toEqual(false);
    expect(actual.users.entities[userId].name).toEqual("name");
    expect(actual.users.entities[userId].email).toEqual("email");
    expect(actual.users.entities[userId].role).toEqual("role");
  });

  it("should handle users select", () => {
    const actual = userReducer(
      mockUsersState(),
      userActions.updateUsersSelect({ ids: [1], value: true }),
    );
    expect(actual.users.entities[1].selected).toEqual(true);
  });

  it("should handle delete users", () => {
    const actual = userReducer(
      mockUsersState(),
      userActions.deleteUsers([1, 2]),
    );
    expect(actual.users.ids.length).toEqual(0);
    expect(actual.users.entities).toEqual({});
  });

  it("Should fetch users and store in redux", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return {
        json: jest.fn().mockResolvedValue(mockFetchUsers),
      };
    });

    await store.dispatch(fetchUsers());
    const state = store.getState();
    expect(state.user.users.ids).toStrictEqual([1, 2]);
    expect(state.user.users.error).toBe("");
  });

  it("Should not fetch users and store error in redux", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return {
        json: jest.fn().mockRejectedValue("error"),
      };
    });

    await store.dispatch(fetchUsers());
    const state = store.getState();
    expect(state.user.users.ids).toStrictEqual([1, 2]);
    expect(state.user.users.error).toBe("error");
  });
});
