import {
  Button,
  FormControlLabel,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const task = JSON.parse(localStorage.getItem("task"));
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [descError, setDescError] = useState(false);

  const [taskDetails, setTaskDetails] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const editTask = () => {
    if (taskDetails.title && taskDetails.description && taskDetails.id) {
      setLoading(true);
      axios
        .put(`http://46.100.46.149:8069/api/tasks/${task.id}`, taskDetails)
        .then((res) => {
          dispatch({
            type: "editTask",
            payload: { id: task.id, task: { ...taskDetails } },
          });
          window.location.href = "/";
        })
        .catch((e) => console.log(e, "e"))
        .finally(() => setLoading(false));
    } else {
      toast.success("لطفا فیلدها را پر کنید", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    setTaskDetails({ ...task });
  }, []);
  return (
    <div>
      {loading && <LinearProgress />}
      <TextField
        id="outlined-basic"
        label="id"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        error={idError}
        style={{ marginBottom: "50px" }}
        value={taskDetails.id}
        onChange={(value) => {
          if (value.target.value === "") {
            setIdError(true);
          } else {
            setIdError(false);
          }
          setTaskDetails({
            ...taskDetails,
            id: +value.target.value,
          });
        }}
      />
      <TextField
        id="outlined-basic"
        label="نام"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        error={nameError}
        style={{ marginBottom: "50px" }}
        value={taskDetails.title}
        onChange={(value) => {
          if (value.target.value === "") {
            setNameError(true);
          } else {
            setNameError(false);
          }
          setTaskDetails({
            ...taskDetails,
            title: value.target.value,
          });
        }}
      />
      <TextField
        id="outlined-basic"
        label="توضیحات"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        error={descError}
        value={taskDetails.description}
        style={{ marginBottom: "50px" }}
        onChange={(value) => {
          if (value.target.value === "") {
            setDescError(true);
          } else {
            setDescError(false);
          }
          setTaskDetails({
            ...taskDetails,
            description: value.target.value,
          });
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            value={taskDetails.completed}
            checked={taskDetails.completed}
            onChange={(value) =>
              setTaskDetails({
                ...taskDetails,
                completed: value.target.checked,
              })
            }
          />
        }
        label="completed"
      />
      <Button variant="contained" onClick={editTask}>
        edit task
      </Button>
    </div>
  );
};
export default Edit;
