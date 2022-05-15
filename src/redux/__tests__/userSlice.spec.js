import { redux } from "redux/mocks/mock.data";
import userReducer, { userActions } from "redux/userSlice";

const { initialState, mockUsersState } = redux;

describe("user reducer", () => {
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
      mockUsersState,
      userActions.updateUsersEdit({ id: 1, value: true }),
    );
    expect(actual.users.entities[1].editable).toEqual(true);
  });

  it("should handle users select", () => {
    const actual = userReducer(
      mockUsersState,
      userActions.updateUsersSelect({ ids: [1], value: true }),
    );
    expect(actual.users.entities[1].selected).toEqual(true);
  });

  it("should handle delete users", () => {
    const actual = userReducer(mockUsersState, userActions.deleteUsers([1, 2]));
    expect(actual.users.ids.length).toEqual(0);
    expect(actual.users.entities).toEqual({});
  });
});
