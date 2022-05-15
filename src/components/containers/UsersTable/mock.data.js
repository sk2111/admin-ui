export const getMockFetchUsers = () => {
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

export const mockUsersTableProps = {
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
