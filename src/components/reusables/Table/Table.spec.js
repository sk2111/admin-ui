//libs
import React from "react";
import { render, screen } from "@testing-library/react";
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
    const handleUsersSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUsersEdit={handleUsersEdit}
        handleUsersSave={handleUsersSave}
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

  it("should select all the users", async () => {
    const handleUsersEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUsersSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUsersEdit={handleUsersEdit}
        handleUsersSave={handleUsersSave}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />,
    );

    const [checkboxNode] = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxNode);

    expect(handleUsersSelect).toBeCalledTimes(1);
    expect(handleUsersSelect).toBeCalledWith(mockUsers.ids, true);
  });

  it("should select individual users", async () => {
    const handleUsersEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUsersSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUsersEdit={handleUsersEdit}
        handleUsersSave={handleUsersSave}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />,
    );

    const [checkboxNode, firstUserNode] = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxNode);

    expect(handleUsersSelect).toBeCalledTimes(1);
    expect(handleUsersSelect).lastCalledWith(mockUsers.ids, true);
    await userEvent.click(firstUserNode);
    expect(handleUsersSelect).toBeCalledTimes(2);
    expect(handleUsersSelect).lastCalledWith([mockUsers.ids[0]], false);
  });

  it("should invoke edit, save, delete actions", async () => {
    const handleUsersEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUsersSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUsersEdit={handleUsersEdit}
        handleUsersSave={handleUsersSave}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />,
    );

    const saveImgList = screen.queryAllByTestId("save");
    const editImgList = screen.queryAllByTestId("edit");
    const deleteImgList = screen.queryAllByTestId("delete");

    expect(saveImgList).not.toBeNull();
    expect(editImgList).not.toBeNull();
    expect(deleteImgList).not.toBeNull();

    const [editImg] = editImgList;
    const [saveImg] = saveImgList;
    const [deleteImg] = deleteImgList;

    await userEvent.click(editImg);
    await userEvent.click(saveImg);
    await userEvent.click(deleteImg);

    expect(handleUsersEdit).toBeCalledTimes(1);
    expect(handleUsersEdit).toBeCalledWith(2, true);
    expect(handleUsersSave).toBeCalledTimes(1);
    expect(handleUsersSave).toBeCalledWith(1, false);
    expect(handleUsersDelete).toBeCalledTimes(1);
    expect(handleUsersDelete).toBeCalledWith([1]);
  });
});
