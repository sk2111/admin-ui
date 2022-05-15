//libs
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//component
import Table from "./Table";
//mock data
import { mockUsers } from "redux/mocks/mock.data";

describe("Table", () => {
  it("should render the table with user info", () => {
    const handleUsersEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUsersEdit={handleUsersEdit}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />,
    );

    const nameNodeList = screen.getAllByTestId("name");
    const emailNodeList = screen.getAllByTestId("email");
    const roleNodeList = screen.getAllByTestId("role");

    nameNodeList.forEach((nameNode, idx) => {
      expect(nameNode.textContent).toEqual(mockUsers.entities[idx + 1].name);
    });
    emailNodeList.forEach((emailNode, idx) => {
      expect(emailNode.textContent).toEqual(mockUsers.entities[idx + 1].email);
    });
    roleNodeList.forEach((roleNodeList, idx) => {
      expect(roleNodeList.textContent).toEqual(
        mockUsers.entities[idx + 1].role,
      );
    });
  });
});
