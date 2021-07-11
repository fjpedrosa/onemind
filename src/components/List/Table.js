import React from "react";

const Table = ({ users, activeIndex, animal, setUsers }) => {
  const header = ["Position", "Name", "Animal", "Points", "Actions"];
  return (
    <table id="users" className={"table"}>
      <tbody>
        <tr>
          {header.map((key) => {
            return <th key={key}>{key.toUpperCase()}</th>;
          })}
        </tr>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td className={"table__cell"}>{10 * activeIndex + index}</td>
              <td
                className={"table__long-cell"}
              >{`${user.name.given} ${user.name.surname}`}</td>
              <td className={"table__cell"}>{animal}</td>
              <td className={"table__cell"}>{user.points}</td>
              <td className={"table__cell"}>
                <button
                  className={"table__delete-button"}
                  onClick={() =>
                    setUsers((s) => s.filter((u) => u.id !== user.id))
                  }
                >
                  <span>&#128465;</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
