import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "../assets/images/editIcon.svg";

const List = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const tasks = useSelector((state) => state.tasks);
  console.log(tasks, "tasks");
  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://46.100.46.149:8069/api/tasks")
      .then((res) => dispatch({ type: "setAllTasks", payload: res.data }))
      .catch((e) => console.log(e, "e"))
      .finally(() => setLoading(false));
  };

  const deleteTask = (id) => {
    console.log(id, "deleteid");
    dispatch({ type: "deleteTask", payload: +id });
    console.log();

    axios
      .delete(`http://46.100.46.149:8069/api/tasks/${id}`)
      .then((res) => {
        console.log("okkk");
        fetchData();
      })
      .catch((e) => console.log(e, "e"))
      .finally(() => setLoading(false));
  };

  const goToEdit = (task) => {
    localStorage.setItem("task", JSON.stringify(task));
    setEdit(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button variant="contained" to="/create" component={Link}>
        create new task
      </Button>
      {loading && <LinearProgress />}
      {edit && <Navigate to="/edit" replace={true} />}
      <Table>
        <TableBody>
          {tasks.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <DeleteIcon onClick={() => deleteTask(row.id)} />
              </TableCell>
              <TableCell align="right">
                <img src={EditIcon} onClick={() => goToEdit(row)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default List;
