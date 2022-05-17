//libs
import React, { createRef, useRef } from "react";
import PropTypes from "prop-types";
//css
import styles from "./Table.module.css";
//components
import CheckBox from "components/reusables/CheckBox/CheckBox";
import RenderView from "components/reusables/RenderView/RenderView";
import EditableInput from "../EditableInput/EditableInput";
//assests
import editImgSrc from "assests/edit.png";
import deleteImgSrc from "assests/delete.png";
import saveImgSrc from "assests/save.png";
import cancelImgSrc from "assests/cancel.png";

const Table = ({
  users,
  allSelected,
  handleUserEdit,
  handleUserSave,
  handleUsersDelete,
  handleUsersSelect,
}) => {
  const nameRefs = useRef({});
  const emailRefs = useRef({});
  const roleRefs = useRef({});

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
          const { selected, name, email, role, editable } = users.entities[id];
          nameRefs.current[id] = nameRefs.current[id] ?? createRef();
          emailRefs.current[id] = emailRefs.current[id] ?? createRef();
          roleRefs.current[id] = roleRefs.current[id] ?? createRef();

          return (
            <tr key={id} className={selected ? styles.highlight : null}>
              <td className={styles.minpad}>
                <CheckBox
                  checked={selected}
                  handleChange={(value) => handleUsersSelect([id], value)}
                />
              </td>
              <td data-testid="name">
                <EditableInput
                  ref={nameRefs.current[id]}
                  editable={editable}
                  value={name}
                />
              </td>
              <td data-testid="email">
                <EditableInput
                  ref={emailRefs.current[id]}
                  editable={editable}
                  value={email}
                />
              </td>
              <td data-testid="role">
                <EditableInput
                  ref={roleRefs.current[id]}
                  editable={editable}
                  value={role}
                />
              </td>
              <td>
                <RenderView renderIftrue={editable}>
                  <img
                    className={styles.action}
                    src={saveImgSrc}
                    alt="save"
                    onClick={() =>
                      handleUserSave({
                        id,
                        value: false,
                        name: nameRefs.current[id].current.value,
                        email: emailRefs.current[id].current.value,
                        role: roleRefs.current[id].current.value,
                      })
                    }
                  />
                  <img
                    className={styles.action}
                    src={cancelImgSrc}
                    alt="cancel"
                    onClick={() => handleUserEdit(id, false)}
                  />
                </RenderView>
                <RenderView renderIftrue={!editable}>
                  <img
                    className={styles.action}
                    src={editImgSrc}
                    alt="edit"
                    onClick={() => handleUserEdit(id, true)}
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

Table.propTypes = {
  users: PropTypes.object.isRequired,
  allSelected: PropTypes.bool.isRequired,
  handleUserEdit: PropTypes.func.isRequired,
  handleUsersDelete: PropTypes.func.isRequired,
  handleUsersSelect: PropTypes.func.isRequired,
};

export default Table;
