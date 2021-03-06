export const mockUsers = {
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  entities: {
    1: {
      id: 1,
      name: "Aaron Miles",
      email: "aaron@mailinator.com",
      role: "member",
      editable: true,
      selected: true,
    },
    2: {
      id: 2,
      name: "Aishwarya Naik",
      email: "aishwarya@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    3: {
      id: 3,
      name: "Arvind Kumar",
      email: "arvind@mailinator.com",
      role: "admin",
      editable: false,
      selected: false,
    },
    4: {
      id: 4,
      name: "Caterina Binotto",
      email: "caterina@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    5: {
      id: 5,
      name: "Chetan Kumar",
      email: "chetan@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    6: {
      id: 6,
      name: "Jim McClain",
      email: "jim@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    7: {
      id: 7,
      name: "Mahaveer Singh",
      email: "mahaveer@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    8: {
      id: 8,
      name: "Rahul Jain",
      email: "rahul@mailinator.com",
      role: "admin",
      editable: false,
      selected: false,
    },
    9: {
      id: 9,
      name: "Rizan Khan",
      email: "rizan@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    10: {
      id: 10,
      name: "Sarah Potter",
      email: "sarah@mailinator.com",
      role: "admin",
      editable: false,
      selected: false,
    },
    11: {
      id: 11,
      name: "Keshav Muddaiah",
      email: "keshav@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    12: {
      id: 12,
      name: "Nita Ramesh",
      email: "nita@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    13: {
      id: 13,
      name: "Julia Hunstman",
      email: "julia@mailinator.com",
      role: "member",
      editable: false,
      selected: false,
    },
    14: {
      id: 14,
      name: "Juan Alonso",
      email: "juan@mailinator.com",
      role: "admin",
      editable: false,
      selected: true,
    },
  },
};

export const test = {
  email: "aaron@mailinator.com",
  name: "Sarah Potter",
  roleAdmin: "admin",
  roleMember: "member",
  roleAdminCount: 4,
  roleMemberCount: 10,
  currentPage: 1,
  totalPages: 2,
};

export const redux = {
  initialState: {
    searchTerm: "",
    currentPage: 1,
    toastMessage: "",
    users: {
      loading: false,
      error: "",
      ids: [],
      entities: {},
    },
  },
  mockUsersState: () => {
    return {
      searchTerm: "",
      currentPage: 1,
      toastMessage: "",
      users: {
        loading: false,
        error: "",
        ids: [1, 2],
        entities: {
          1: {
            name: "test-name",
            email: "test-email",
            role: "test-role",
            editable: false,
            selected: false,
          },
          2: {
            name: "test-name2",
            email: "test-email2",
            role: "test-role2",
            editable: false,
            selected: false,
          },
        },
      },
    };
  },
};

export const mockFetchUsers = [
  {
    id: 1,
    name: "name1",
    email: "email1",
    role: "role1",
  },
  {
    id: 2,
    name: "name2",
    email: "email2",
    role: "role2",
  },
];
