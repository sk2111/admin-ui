//libs
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
//component
import UsersTable from "./UsersTable";
//redux
import userReducer from "redux/userSlice";
import { fetchUsers } from "redux/userSlice";
//mock data
import { mockUsersTableProps, getMockFetchUsers } from "./mock.data";

describe("UsersTable", () => {
  let store;

  beforeEach(async () => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return {
        json: jest.fn().mockResolvedValue(getMockFetchUsers()),
      };
    });
  });

  it("should render the users table & fire selection action", async () => {
    render(
      <Provider store={store}>
        <UsersTable users={mockUsersTableProps} currentPage={1} />
      </Provider>,
    );

    await store.dispatch(fetchUsers());
    const [checkbox] = screen.getAllByRole("checkbox");
    await userEvent.click(checkbox);
    const { user } = store.getState();
    user.users.ids.forEach((id) => {
      const entity = user.users.entities[id];
      expect(entity.selected).toBe(true);
    });
  });

  it("should invoke the delete action selected id", async () => {
    render(
      <Provider store={store}>
        <UsersTable users={mockUsersTableProps} currentPage={1} />
      </Provider>,
    );
    await store.dispatch(fetchUsers());
    const [deleteNode] = screen.getAllByAltText("delete");
    await userEvent.click(deleteNode);
    const { user } = store.getState();
    expect(user.users.ids).toStrictEqual([2]);
  });

  it("should invoke the edit action with selected id", async () => {
    render(
      <Provider store={store}>
        <UsersTable users={mockUsersTableProps} currentPage={1} />
      </Provider>,
    );

    await store.dispatch(fetchUsers());
    const [editNode] = screen.getAllByAltText("edit");
    await userEvent.click(editNode);
    const { user } = store.getState();
    const [id] = user.users.ids;
    expect(user.users.entities[id].editable).toBe(true);
  });
});