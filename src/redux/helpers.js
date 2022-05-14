//constants
import { pagination } from "config/constants";

const { pageOffset, recordsPerPage } = pagination;

const checkStringIncludes = (str, toMatch) => {
  return str.trim().toLowerCase().includes(toMatch.trim().toLowerCase());
};

export const getFilteredUsers = (searchTerm, users) => {
  const entities = {};
  const ids = users.ids.filter((id) => {
    const { name, email, role } = users.entities[id];
    return (
      checkStringIncludes(name, searchTerm) ||
      checkStringIncludes(email, searchTerm) ||
      checkStringIncludes(role, searchTerm)
    );
  });
  ids.forEach((id) => (entities[id] = users.entities[id]));
  return { ids, entities };
};

export const getDisplayUsers = (currentPage, users) => {
  const entities = {};
  const startIdx = (currentPage - pageOffset) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const ids = users.ids.slice(startIdx, endIdx);
  ids.forEach((id) => (entities[id] = users.entities[id]));
  const allSelected = ids.every((id) => entities[id].selected);
  return {
    ids,
    entities,
    allSelected,
    totalPages: Math.ceil(users.ids.length / recordsPerPage),
  };
};
