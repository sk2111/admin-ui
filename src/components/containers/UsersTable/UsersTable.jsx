//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./UsersTable.module.css";
//components
import CheckBox from "components/reusables/CheckBox/CheckBox";
import RenderView from "components/reusables/RenderView/RenderView";
//assests
import editImgSrc from "assests/edit.png";
import deleteImgSrc from "assests/delete.png";
import saveImgSrc from "assests/save.png";

const UsersTable = ({
  users,
  allSelected,
  handleUsersDelete,
  handleUsersSelect,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.checkboxCol}>
            <CheckBox
              checked={allSelected}
              handleChange={(value) => handleUsersSelect(users.ids, value)}
            />
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
            <tr key={id} className={user.selected ? styles.highlight : null}>
              <td className={styles.minpad}>
                <CheckBox
                  checked={user.selected}
                  handleChange={(value) => handleUsersSelect([id], value)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <RenderView renderIftrue={user.editable}>
                  <img className={styles.action} src={saveImgSrc} alt="save" />
                </RenderView>
                <RenderView renderIftrue={!user.editable}>
                  <img
                    className={styles.action}
                    src={editImgSrc}
                    alt="edit"
                    onClick={() => handleUsersDelete([id])}
                  />
                </RenderView>
                <img
                  className={styles.action}
                  src={deleteImgSrc}
                  alt="delete"
                  onClick={() => handleUsersDelete([id])}
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
  allSelected: PropTypes.bool.isRequired,
  handleUsersDelete: PropTypes.func.isRequired,
  handleUsersSelect: PropTypes.func.isRequired,
};

export default UsersTable;
