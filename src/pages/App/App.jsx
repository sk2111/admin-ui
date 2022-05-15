import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
//styles
import styles from "./App.module.css";
//components
import UsersView from "components/containers/UsersView/UsersView";
//actions
import { fetchUsers } from "redux/userSlice";
//constants
import { app } from "config/constants";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(app.usersDataUrl));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Admin UI</h1>
      </header>
      <main className={styles.main}>
        <UsersView />
      </main>
    </div>
  );
};

export default App;
