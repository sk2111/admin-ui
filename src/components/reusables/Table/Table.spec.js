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
    const offsetIdx = 2;
    const handleUserEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUserSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUserEdit={handleUserEdit}
        handleUserSave={handleUserSave}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />,
    );

    const [firstNameNode, ...nameNodeList] = screen.getAllByTestId("name");
    const [firstEmailNode, ...emailNodeList] = screen.getAllByTestId("email");
    const [firstRoleNode, ...roleNodeList] = screen.getAllByTestId("role");

    expect(firstNameNode).not.toBeNull();
    expect(firstEmailNode).not.toBeNull();
    expect(firstRoleNode).not.toBeNull();

    nameNodeList.forEach((nameNode, idx) => {
      expect(nameNode.textContent).toEqual(
        mockUsers.entities[idx + offsetIdx].name,
      );
    });
    emailNodeList.forEach((emailNode, idx) => {
      expect(emailNode.textContent).toEqual(
        mockUsers.entities[idx + offsetIdx].email,
      );
    });
    roleNodeList.forEach((roleNode, idx) => {
      expect(roleNode.textContent).toEqual(
        mockUsers.entities[idx + offsetIdx].role,
      );
    });
  });

  it("should select all the users", async () => {
    const handleUserEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUserSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUserEdit={handleUserEdit}
        handleUserSave={handleUserSave}
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
    const handleUserEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUserSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUserEdit={handleUserEdit}
        handleUserSave={handleUserSave}
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

  it("should invoke edit, save, cancel, delete actions", async () => {
    const handleUserEdit = jest.fn();
    const handleUsersDelete = jest.fn();
    const handleUsersSelect = jest.fn();
    const handleUserSave = jest.fn();

    render(
      <Table
        users={mockUsers}
        allSelected={false}
        handleUserEdit={handleUserEdit}
        handleUserSave={handleUserSave}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />,
    );

    const saveImgList = screen.queryAllByAltText("save");
    const editImgList = screen.queryAllByAltText("edit");
    const cancelImgList = screen.queryAllByAltText("cancel");
    const deleteImgList = screen.queryAllByAltText("delete");

    expect(saveImgList).not.toBeNull();
    expect(editImgList).not.toBeNull();
    expect(deleteImgList).not.toBeNull();
    expect(cancelImgList).not.toBeNull();

    const [editImg] = editImgList;
    const [saveImg] = saveImgList;
    const [deleteImg] = deleteImgList;
    const [cancelImg] = cancelImgList;

    await userEvent.click(editImg);
    await userEvent.click(saveImg);
    await userEvent.click(deleteImg);

    expect(handleUserEdit).toBeCalledTimes(1);
    expect(handleUserEdit).toBeCalledWith(2, true);
    expect(handleUserSave).toBeCalledTimes(1);
    expect(handleUserSave).toBeCalledWith({
      email: "aaron@mailinator.com",
      id: 1,
      name: "Aaron Miles",
      role: "member",
      value: false,
    });
    expect(handleUsersDelete).toBeCalledTimes(1);
    expect(handleUsersDelete).toBeCalledWith([1]);

    await userEvent.click(cancelImg);
    expect(handleUserEdit).toBeCalledTimes(2);
    expect(handleUserEdit).toBeCalledWith(1, false);
  });
});
