//libs
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
//styles
import styles from "./UsersTable.module.css";
//components
import Table from "components/reusables/Table/Table";
import Button, { buttonThemes } from "components/reusables/Button/Button";
import PaginationList from "components/reusables/PaginationList/PaginationList";
//redux
import { userActions, selectDeleteBtnActive } from "redux/userSlice";

const { danger, dangerDisabled } = buttonThemes;

const UsersTable = ({ users, currentPage }) => {
  const dispatch = useDispatch();
  const deleteBtnActive = useSelector(selectDeleteBtnActive);

  const deleteBtnTheme = deleteBtnActive ? danger : dangerDisabled;

  const handleUsersSelect = (ids, value) => {
    dispatch(userActions.updateUsersSelect({ ids, value }));
  };

  const handleUserEdit = (id, value) => {
    dispatch(userActions.updateUserEdit({ id, value }));
  };

  const handleUserSave = (id, value) => {
    dispatch(userActions.updateUserEdit({ id, value }));
  };

  const handleUsersDelete = (usersToDelete) => {
    dispatch(userActions.deleteUsers(usersToDelete));
  };

  const handleUsersDeleteInBulk = () => {
    const usersToDelete = users.ids.filter((id) => users.entities[id].selected);
    handleUsersDelete(usersToDelete);
  };

  const handlePageChange = (goToPage) => {
    dispatch(userActions.updateCurrentPage(goToPage));
  };

  return (
    <>
      <Table
        users={users}
        allSelected={users.allSelected}
        handleUserEdit={handleUserEdit}
        handleUserSave={handleUserSave}
        handleUsersDelete={handleUsersDelete}
        handleUsersSelect={handleUsersSelect}
      />
      <div className={styles.bottom}>
        <Button
          theme={deleteBtnTheme}
          handleClick={() => handleUsersDeleteInBulk()}
        >
          Delete Selected
        </Button>
        <PaginationList
          currentPage={currentPage}
          totalPages={users.totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default UsersTable;
