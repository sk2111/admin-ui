//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./UsersTable.module.css";
//components
import CheckBox from "components/reusables/CheckBox/CheckBox";
//assests
import editImgSrc from "assests/edit.png";
import deleteImgSrc from "assests/delete.png";

const UsersTable = ({ users, handleDelete, handleUserSelect }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.checkboxCol}>
            <CheckBox />
          </th>
          <th className={styles.nameCol}>Name</th>
          <th className={styles.emailCol}>Email</th>
          <th className={styles.roleCol}>Role</th>
          <th className={styles.actionCol}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.ids.map((id) => {
          const user = users.entities[id];
          return (
            <tr key={id}>
              <td>
                <CheckBox
                  checked={user.selected}
                  handleChange={(value) => handleUserSelect(id, value)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <img className={styles.action} src={editImgSrc} alt="edit" />
                <img
                  className={styles.action}
                  src={deleteImgSrc}
                  alt="delete"
                  onClick={() => handleDelete([id])}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUserSelect: PropTypes.func.isRequired,
};

export default UsersTable;
