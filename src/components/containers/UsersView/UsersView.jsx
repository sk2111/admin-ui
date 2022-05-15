//libs
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//css
import styles from "./UsersView.module.css";
//components
import SearchBar from "components/reusables/SearchBar/SearchBar";
import UsersTable from "components/containers/UsersTable/UsersTable";
import RenderView from "components/reusables/RenderView/RenderView";
//actions
import { userActions } from "redux/userSlice";
//selectors
import {
  selectSearchTerm,
  selectCurrentPage,
  selectDisplayUsers,
} from "redux/userSlice";
//
import { app } from "config/constants";

const UsersView = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const currentPage = useSelector(selectCurrentPage);
  const users = useSelector(selectDisplayUsers);

  useEffect(() => {
    if (users.totalPages && currentPage > users.totalPages) {
      dispatch(userActions.updateCurrentPage(users.totalPages));
    }
  }, [currentPage, users.totalPages, dispatch]);

  const handleSearchTermChange = (value) => {
    dispatch(userActions.updateSearchTerm(value));
  };

  return (
    <section>
      <SearchBar
        placeholder="Search by name, email or role"
        debounceTimeInMs={app.debounceTimeInMs}
        value={searchTerm}
        handleChange={handleSearchTermChange}
      />
      <RenderView renderIftrue={!users.totalPages}>
        <h1 className={styles.info}>No results found!</h1>
      </RenderView>
      <RenderView renderIftrue={users.totalPages}>
        <div className={styles.middle}>
          <UsersTable users={users} currentPage={currentPage} />
        </div>
      </RenderView>
    </section>
  );
};

UsersView.propTypes = {};

export default UsersView;
