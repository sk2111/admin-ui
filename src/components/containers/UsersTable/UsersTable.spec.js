//libs
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
//component
import UsersTable from "./UsersTable";
//redux
import userReducer, { fetchUsers } from "redux/userSlice";
//mock data

const getMockFetchUsers = () => {
  return [
    {
      id: 1,
      name: "Aaron Miles",
      email: "aaron@mailinator.com",
      role: "member",
    },
    {
      id: 2,
      name: "Aishwarya Naik",
      email: "aishwarya@mailinator.com",
      role: "member",
    },
  ];
};

const mockUsersTableProps = {
  ids: [1, 2],
  entities: {
    1: {
      id: 1,
      name: "Aaron Miles",
      email: "aaron@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    2: {
      id: 2,
      name: "Aishwarya Naik",
      email: "aishwarya@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
  },
  allSelected: false,
  totalPages: 5,
};

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
    const expectedMatch = [2];

    render(
      <Provider store={store}>
        <UsersTable users={mockUsersTableProps} currentPage={1} />
      </Provider>,
    );
    await store.dispatch(fetchUsers());
    const [deleteNode] = screen.getAllByAltText("delete");
    const bulkDelete = screen.getByText(/delete selected/i);
    await userEvent.click(deleteNode);
    await userEvent.click(bulkDelete);
    const { user } = store.getState();
    expect(user.users.ids).toStrictEqual(expectedMatch);
    expect(user.users.ids).toStrictEqual(expectedMatch);
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

  it("should invoke page change on pagination item click", async () => {
    const secondPage = 2;

    render(
      <Provider store={store}>
        <UsersTable users={mockUsersTableProps} currentPage={1} />
      </Provider>,
    );

    const paginationNode = screen.getByText(secondPage);
    await userEvent.click(paginationNode);
    const { user } = store.getState();
    expect(user.currentPage).toBe(secondPage);
  });
});
