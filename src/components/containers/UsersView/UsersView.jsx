//libs
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//css
import styles from "./UsersView.module.css";
//components
import SearchBar from "components/reusables/SearchBar/SearchBar";
import Button from "components/reusables/Button/Button";
import PaginationList from "components/reusables/PaginationList/PaginationList";
import UsersTable from "components/containers/UsersTable/UsersTable";
import RenderView from "components/reusables/RenderView/RenderView";
//actions
import { userActions } from "redux/userSlice";
//selectors
import {
  selectSearchTerm,
  selectCurrentPage,
  selectDisplayUsers,
  selectDeleteBtnActive,
} from "redux/userSlice";
//
import { app } from "config/constants";
import { buttonThemes } from "components/reusables/Button/Button";

const { danger, dangerDisabled } = buttonThemes;

const UsersView = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const currentPage = useSelector(selectCurrentPage);
  const users = useSelector(selectDisplayUsers);
  const deleteBtnActive = useSelector(selectDeleteBtnActive);

  const deleteBtnTheme = deleteBtnActive ? danger : dangerDisabled;

  useEffect(() => {
    if (users.totalPages && currentPage > users.totalPages) {
      dispatch(userActions.updateCurrentPage(users.totalPages));
    }
  }, [currentPage, users.totalPages, dispatch]);

  const handlePageChange = (goToPage) => {
    dispatch(userActions.updateCurrentPage(goToPage));
  };

  const handleUsersSelect = (ids, value) => {
    dispatch(userActions.updateUsersSelect({ ids, value }));
  };

  const handleUsersDelete = (usersToDelete) => {
    dispatch(userActions.deleteUsers(usersToDelete));
  };

  const handleUsersDeleteInBulk = () => {
    const usersToDelete = users.ids.filter((id) => users.entities[id].selected);
    handleUsersDelete(usersToDelete);
  };

  return (
    <section>
      <SearchBar
        placeholder="Search by name, email or role"
        debounceTimeInMs={app.debounceTimeInMs}
        value={searchTerm}
        handleChange={(value) => dispatch(userActions.updateSearchTerm(value))}
      />
      <RenderView renderIftrue={!users.totalPages}>
        <h1 className={styles.info}>No results found!</h1>
      </RenderView>
      <RenderView renderIftrue={users.totalPages}>
        <div className={styles.middle}>
          <UsersTable
            users={users}
            allSelected={users.allSelected}
            handleUsersDelete={handleUsersDelete}
            handleUsersSelect={handleUsersSelect}
          />
        </div>
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
      </RenderView>
    </section>
  );
};

UsersView.propTypes = {};

export default UsersView;
