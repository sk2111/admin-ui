//constants
import { pagination } from "config/constants";

const { pageOffset, recordsPerPage } = pagination;

const checkStringIncludes = (str, toMatch) => {
  return str.toLowerCase().includes(toMatch.toLowerCase());
};

export const getFilteredUsers = (searchTerm, users) => {
  const entities = {};
  const ids = users.ids.filter((id) => {
    const { name, email, role } = users.entities[id];
    const nameMatch = checkStringIncludes(name, searchTerm);
    const emailMatch = checkStringIncludes(email, searchTerm);
    const roleMatch = checkStringIncludes(role, searchTerm);
    return nameMatch || emailMatch || roleMatch;
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
  return {
    ids,
    entities,
    totalPages: Math.ceil(users.ids.length / recordsPerPage),
  };
};
