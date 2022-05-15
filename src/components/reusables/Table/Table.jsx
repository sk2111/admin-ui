//libs
import React from "react";
import PropTypes from "prop-types";
//css
import styles from "./Table.module.css";
//components
import CheckBox from "components/reusables/CheckBox/CheckBox";
import RenderView from "components/reusables/RenderView/RenderView";
//assests
import editImgSrc from "assests/edit.png";
import deleteImgSrc from "assests/delete.png";
import saveImgSrc from "assests/save.png";

const Table = ({
  users,
  allSelected,
  handleUsersEdit,
  handleUsersSave,
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
              <td data-testid="name">{user.name}</td>
              <td data-testid="email">{user.email}</td>
              <td data-testid="role">{user.role}</td>
              <td>
                <RenderView renderIftrue={user.editable}>
                  <img
                    data-testid="save"
                    className={styles.action}
                    src={saveImgSrc}
                    alt="save"
                    onClick={() => handleUsersSave(id, false)}
                  />
                </RenderView>
                <RenderView renderIftrue={!user.editable}>
                  <img
                    data-testid="edit"
                    className={styles.action}
                    src={editImgSrc}
                    alt="edit"
                    onClick={() => handleUsersEdit(id, true)}
                  />
                </RenderView>
                <img
                  data-testid="delete"
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

Table.propTypes = {
  users: PropTypes.object.isRequired,
  allSelected: PropTypes.bool.isRequired,
  handleUsersEdit: PropTypes.func.isRequired,
  handleUsersDelete: PropTypes.func.isRequired,
  handleUsersSelect: PropTypes.func.isRequired,
};

export default Table;
