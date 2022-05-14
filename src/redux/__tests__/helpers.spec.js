import { mockUsers, test } from "../mocks/mock.data";
import {
  checkStringIncludes,
  getFilteredUsers,
  getDisplayUsers,
} from "redux/helpers";

describe("helpers", () => {
  it("Should compare two string without case sensitivity & trim whitespace", () => {
    const result = checkStringIncludes("   test  ", "   TEST");
    expect(result).toBe(true);
  });

  it("Should compare two string without case sensitivity & return match true", () => {
    const result = checkStringIncludes("test", "TEST");
    expect(result).toBe(true);
  });

  it("Should compare two string without case sensitivity & return match false", () => {
    const result = checkStringIncludes("test", "mock  ");
    expect(result).toBe(false);
  });

  it("should return the user list filtered by search term email", () => {
    const filteredList = getFilteredUsers(test.email, mockUsers);

    expect(filteredList.ids.length).toEqual(1);
    const [id] = filteredList.ids;
    expect(filteredList.entities[id].email).toEqual(test.email);
  });

  it("should return the user list filtered by search term name", () => {
    const filteredList = getFilteredUsers(test.name, mockUsers);

    expect(filteredList.ids.length).toEqual(1);
    const [id] = filteredList.ids;
    expect(filteredList.entities[id].name).toEqual(test.name);
  });

  it("should return the user list filtered by search term role admin", () => {
    const filteredList = getFilteredUsers(test.roleAdmin, mockUsers);

    expect(filteredList.ids.length).toEqual(3);
    filteredList.ids.forEach((id) => {
      expect(filteredList.entities[id].role).toEqual(test.roleAdmin);
    });
  });

  it("should return the user list filtered by search term role member", () => {
    const filteredList = getFilteredUsers(test.roleMember, mockUsers);

    expect(filteredList.ids.length).toEqual(7);
    filteredList.ids.forEach((id) => {
      expect(filteredList.entities[id].role).toEqual(test.roleMember);
    });
  });
});
