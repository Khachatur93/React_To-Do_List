import request from "../helpers/request.js";
import * as types from "./types";
import { history } from "../helpers/history";
import { saveToken } from "../helpers/auth";
import requestWithoutToken from "../helpers/auth";

const apiHost = process.env.REACT_APP_API_HOST;
export function getTasks(params = {}) {
  return (despatch) => {
    const query = Object.entries(params)
      .map(([key, status]) => `${key}=${status}`)
      .join("&");

    despatch({ type: types.PENDING });

    request(`${apiHost}/task?${query}`, "GET")
      .then((tasks) => {
        if (!tasks) return;
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

    request(`${apiHost}/task/${taskId}`, "GET")
      .then((task) => {
        if (!task) return;

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

    request(`${apiHost}/task`, "POST", newTask)
      .then((res) => {
        if (!res) return;

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

    request(`${apiHost}/task`, "PATCH", {
      tasks: [...taskIds],
    })
      .then((res) => {
        if (!res) return;

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

    request(`${apiHost}/task/${taskId}`, "DELETE")
      .then((res) => {
        if (!res) return;

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

    request(`${apiHost}/task/${editedTask._id}`, "PUT", editedTask)
      .then((value) => {
        if (!value) return;

        despatch({
          type: types.EDIT_TASKS,
          value: value,
          from,
          status: editedTask.status,
        });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}

export function message(values) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request(`${apiHost}/form`, "POST", values)
      .then((res) => {
        if (!res) return;

        despatch({ type: types.MESSAGE, mess: true });
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
export function register(values) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    requestWithoutToken(`${apiHost}/user`, "POST", values)
      .then(() => {
        despatch({ type: types.REGISTER, reg: true });
        history.push("/login");
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
export function login(values) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    requestWithoutToken(`${apiHost}/user/sign-in`, "POST", values)
      .then((res) => {
        saveToken(res);

        despatch({ type: types.LOGIN, log: true });
        history.push("/");
      })
      .catch((error) => {
        despatch({ type: types.ERROR, error: error.message });
      });
  };
}
