//libs
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//css
import styles from "./UsersView.module.css";
//components
import SearchBar from "components/reusables/SearchBar/SearchBar";
import UsersTable from "components/containers/UsersTable/UsersTable";
import RenderView from "components/reusables/RenderView/RenderView";
import ToastMessage from "components/reusables/ToastMessage/ToastMessage";
//redux
import {
  userActions,
  selectSearchTerm,
  selectCurrentPage,
  selectDisplayUsers,
  selectToastMessage,
} from "redux/userSlice";
//constants
import { app } from "config/constants";

const UsersView = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const currentPage = useSelector(selectCurrentPage);
  const users = useSelector(selectDisplayUsers);
  const toastMessage = useSelector(selectToastMessage);

  useEffect(() => {
    if (users.totalPages && currentPage > users.totalPages) {
      dispatch(userActions.updateCurrentPage(users.totalPages));
    }
  }, [currentPage, users.totalPages, dispatch]);

  const handleSearchTermChange = (value) => {
    dispatch(userActions.updateSearchTerm(value));
  };

  const updateToastMessage = (message) => {
    dispatch(userActions.updateToastMessage(message));
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
      <RenderView renderIftrue={toastMessage}>
        <ToastMessage
          message={toastMessage}
          clearAfterMs={app.toastDurationInMs}
          updateToastMessage={updateToastMessage}
        />
      </RenderView>
    </section>
  );
};

UsersView.propTypes = {};

export default UsersView;
