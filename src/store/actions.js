import request from "../helpers/request.js";
import * as types from "./types";
import { history } from "../helpers/history";
const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
  return (despatch) => {
    const query = Object.entries(params)
      .map(([key, status]) => `${key}=${status}`)
      .join("&");

    despatch({ type: types.PENDING });

    request(`${apiHost}/task?${query}`, "GET")
      .then((tasks) => {
        despatch({ type: types.GET_TASKS, tasks: tasks });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}

export function getTask(taskId) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request(`http://localhost:3001/task/${taskId}`, "GET")
      .then((task) => {
        despatch({ type: types.GET_TASK, task: task });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
export function newTask(newTask) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request("http://localhost:3001/task", "POST", newTask)
      .then((res) => {
        despatch({ type: types.ADD_TASKS, res: res });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
export function deleteSelect(taskIds) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request("http://localhost:3001/task", "PATCH", {
      tasks: [...taskIds],
    })
      .then(() => {
        despatch({ type: types.DELETE_SELECTED_TASKS, taskIds });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
export function deleteTasks(taskId, from) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request(`http://localhost:3001/task/${taskId}`, "DELETE")
      .then(() => {
        despatch({ type: types.DELETE_TASKS, taskId: taskId, from });

        if (from === "single") {
          history.push("/");
        }
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
export function handleSaveTask(editedTask, from) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request(`http://localhost:3001/task/${editedTask._id}`, "PUT", editedTask)
      .then((value) => {
        despatch({ type: types.EDIT_TASKS, value: value, from });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}

export function message(values) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request("http://localhost:3001/form", "POST", values)
      .then(() => {
        despatch({ type: types.MESSAGE, mess: true });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
