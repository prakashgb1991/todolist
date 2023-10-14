import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
const TodosList = (props) => {
  const [todos, setTodos] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const todosRef = useRef();

  todosRef.current = todos;

 useEffect(() => {
 (async () => {
 const todos = await axios.get(
 "https://jsonplaceholder.typicode.com/todos"
 );
 setTodos(todos.data);
 })();
 }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Task Name",
        accessor: "name",
      },
      {
        Header: "Task Description",
        accessor: "description",
      },
      {
        Header: "Task start Date",
        accessor: "startDate",
      },
      {
        Header: "Task End Date",
        accessor: "endDate",
       },
       {
        Header: "Status",
        accessor: "status",
        },
        {
         Header: "Total Effort Required",
         accessor: "effortRequired",
         }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSortBy
  } = useTable({
    columns,
    data: todos,
     initialState: {
                sortBy: [
                    {
                        id: 'effortRequired',
                        desc: true
                    }
                ]
            }
  }, useSortBy);

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr data-testid='todo' {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodosList;
