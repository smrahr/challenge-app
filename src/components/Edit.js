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

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const task = JSON.parse(localStorage.getItem("task"));
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [nameError, setNameError] = useState(false);
  const [idError, setIdError] = useState(false);
  console.log(tasks, "tasks");

  const [taskDetails, setTaskDetails] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });

  const editTask = () => {
    setLoading(true);
    dispatch({
      type: "editTask",
      payload: { id: task.id, task: { ...taskDetails } },
    });
    axios
      .put(`http://46.100.46.149:8069/api/tasks/${task.id}`, taskDetails)
      .then((res) => {})
      .catch((e) => console.log(e, "e"))
      .finally(() => setLoading(false));
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
        style={{ marginBottom: "50px" }}
        value={taskDetails.id}
        onChange={(value) =>
          setTaskDetails({
            ...taskDetails,
            id: +value.target.value,
          })
        }
      />
      <TextField
        id="outlined-basic"
        label="نام"
        variant="outlined"
        fullWidth
        required
        autoComplete="off"
        style={{ marginBottom: "50px" }}
        value={taskDetails.title}
        onChange={(value) =>
          setTaskDetails({
            ...taskDetails,
            title: value.target.value,
          })
        }
      />
      <TextField
        id="outlined-basic"
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
