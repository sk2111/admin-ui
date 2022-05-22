//libs
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
//component
import UsersView from "./UsersView";
//redux
import userReducer, { fetchUsers, userActions } from "redux/userSlice";
//mock
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

describe("UsersView", () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the users table & fire selection action", async () => {
    const searchTerm = "admin";

    render(
      <Provider store={store}>
        <UsersView />
      </Provider>,
    );

    await userEvent.type(
      screen.getByPlaceholderText("Search by name, email or role"),
      searchTerm,
    );

    await waitFor(
      function () {
        const { user } = store.getState();
        return expect(user.searchTerm).toEqual(searchTerm);
      },
      {
        timeout: 2000,
      },
    );
  });

  it("should reset the pagination to total pages", async () => {
    render(
      <Provider store={store}>
        <UsersView />
      </Provider>,
    );

    await act(async () => {
      await store.dispatch(fetchUsers());
      await store.dispatch(userActions.updateCurrentPage(3));
    });

    await waitFor(
      function () {
        const { user } = store.getState();
        return expect(user.currentPage).toBe(1);
      },
      { timeout: 2000 },
    );
  });

  it("should clear the toast message", async () => {
    render(
      <Provider store={store}>
        <UsersView />
      </Provider>,
    );

    await act(async () => {
      await store.dispatch(userActions.updateToastMessage("Invalid field"));
    });

    await waitFor(
      function () {
        const { user } = store.getState();
        return expect(user.toastMessage).toBe("");
      },
      { timeout: 5000 },
    );
  });
});
