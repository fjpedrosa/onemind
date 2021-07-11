import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";

const List = ({ data, animal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [users, setUsers] = useState(data);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <div className={"list"}>
      <Table
        users={users.slice(10 * activeIndex, 10 * activeIndex + 10)}
        activeIndex={activeIndex}
        animal={animal}
        setUsers={setUsers}
      />
      <Pagination
        users={users}
        activeIndex={activeIndex}
        onClick={setActiveIndex}
        setActiveIndex={setActiveIndex}
        animal={animal}
      />
    </div>
  );
};

export default List;
