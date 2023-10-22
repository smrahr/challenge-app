import {
  Button,
  FormControlLabel,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Create = () => {
  const tasks = useSelector((state) => state.tasks);
  console.log(tasks, "tasks");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const createTask = () => {
    console.log(taskDetails, "create.detail");
    setLoading(true);
    dispatch({ type: "addTask", payload: { ...taskDetails } });
    axios
      .post("http://46.100.46.149:8069/api/tasks", { ...taskDetails })
      .then((res) => {})
      .catch((e) => console.log(e, "e"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <TextField
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
        label="توضیحات"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        value={taskDetails.description}
        style={{ marginBottom: "50px" }}
        onChange={(value) =>
          setTaskDetails({
            ...taskDetails,
            description: value.target.value,
          })
        }
      />
      <FormControlLabel
        control={
          <Checkbox
            value={taskDetails.completed}
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
      <Button variant="contained" onClick={createTask}>
        create new task
      </Button>
    </div>
  );
};
export default Create;
