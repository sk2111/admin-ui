export const app = {
  usersDataUrl:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
  debounceTimeInMs: 450,
  toastDurationInMs: 2000,
  emptyFieldError: "Field value cannot be empty ! Please enter a valid value",
};

export const pagination = {
  firstPageText: "<<",
  previousPageText: "<",
  nextPageText: ">",
  lastPageText: ">>",
  pageOffset: 1,
  firstPage: 1,
  state: {
    active: "active",
    disabled: "disabled",
    none: "none",
  },
  recordsPerPage: 10,
};
