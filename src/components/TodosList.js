import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import axios from "axios";
const TodosList = (props) => {
  const [todos, setTodos] = useState([]);
  const[userId, setUserId] = useState("test");
  const [searchTitle, setSearchTitle] = useState("");
  const todosRef = useRef();
 const history = useHistory();
  todosRef.current = todos;
  

const setData = async () => {   
    await Auth.currentUserInfo()
      .then(async (data) => {
        setUserId(data.attributes.name);
        console.log(`DATA: ${JSON.stringify(data)}`);
        getToken();
         const todos = await axios.get(
         "http://localhost:5000/4962f78d-e33f-4eb0-b6cc-058330ab54b4"
         );
          setTodos(todos.data);
      })
      .catch(error => console.log(`Error: ${error.message}`));
  };


async function getToken() {
  try {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();
    console.log('ID Token:', idToken);
  } catch (error) {
    console.error('Error getting token:', error);
  }
}

// Call getToken() when needed


 useEffect(() => {

 setData();
 });

 const handleLogout = async () => {
     try {
       await Auth.signOut();
       Toast("Success!!", "Logged out successfully!", "success");
       history.push("/signin");
     } catch (error) {
       Toast("Error!!", error.message, "danger");
     }
   };

   

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
    setSortBy,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data: todos,
     initialState: {
                pageSize: 5,
                pageIndex: 0,
                sortBy: [
                    {
                        id: 'effortRequired',
                        desc: true
                    }
                ]
            }
  }, useSortBy, usePagination);

  return (
    <div className="list row">
    <h4>Welcome {userId}!</h4>
       <div className="col-md-12" style={{marginTop: '10px'}} >
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Logout
        </button>
       </div>
    </div>
  );
};

export default TodosList;
