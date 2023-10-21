import {
  Button,
  FormControlLabel,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const [taskDetails, setTaskDetails] = useState({
    id: 0,
    title: "",
    description: "",
    completed: false,
  });

  const createTask = () => {
    setLoading(true);
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
        error={errorText}
        style={{ marginBottom: "50px" }}
        value={taskDetails.id}
        onChange={(value) => {
          console.log(value.target.value === "");
          if (value.target.value === "") {
            setErrorText(true);
          } else {
            setErrorText(false);
          }
          setTaskDetails({
            ...taskDetails,
            id: value.target.value,
          });
        }}
      />
      <TextField
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
