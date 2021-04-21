import React, { PureComponent } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Tasks from "../Tasks/Tasks";
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class Todo extends PureComponent {
  state = {
    tasks: [],
    showConfirm: false,
    selectedTasks: new Set(),
    showNewTaskModal: false,
    editModal: null,
  };
  componentDidMount() {
    fetch("http://localhost:3001/task", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong !");
          }
        }
        this.setState({
          tasks: res,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  }
  ////////////////////////////////////////////////////
  addTask = (newTask) => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong !");
          }
        }
        const tasks = [...this.state.tasks, res];
        this.setState({
          tasks,
          showNewTaskModal: false,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  };
  deleteTask = (taskId) => {
    // delete task

    fetch(`http://localhost:3001/task/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong !");
          }
        }

        const todo = this.state.tasks.filter((task) => taskId !== task._id);
        this.setState({
          tasks: todo,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  };
  toggleTask = (taskId) => {
    // add to state all checked tasks
    const selectedTasks = new Set(this.state.selectedTasks);

    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId);
    } else {
      selectedTasks.add(taskId);
    }
    this.setState({
      selectedTasks,
    });
  };
  deleteSelect = () => {
    // delete all checked tasks
    const { selectedTasks, tasks } = this.state;
    const body = { tasks: [...selectedTasks] };
    fetch("http://localhost:3001/task", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong !");
          }
        }
        const newTasks = tasks.filter((task) => {
          if (selectedTasks.has(task._id)) {
            return false;
          }
          return true;
        });
        this.setState({
          tasks: newTasks,
          selectedTasks: new Set(),
          showConfirm: false,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  };
  toggleConfirm = () => {
    // open and close modal for delete
    this.setState({ showConfirm: !this.state.showConfirm });
  };
  selectAll = () => {
    // select all tasks
    const { tasks } = this.state;
    const id = tasks.map((task) => task._id);
    this.setState({
      selectedTasks: new Set(id),
    });
  };
  deselectAll = () => {
    // deselect all tasks
    this.setState({
      selectedTasks: new Set(),
    });
  };
  openNewTaskModal = () => {
    // open modal for add new task
    this.setState({ showNewTaskModal: !this.state.showNewTaskModal });
  };
  editTask = (editModal) => {
    this.setState({ editModal: editModal });
  };
  handleSaveTask = (editedTask) => {
    fetch(`http://localhost:3001/task/${editedTask._id}`, {
      method: "PUT",
      body: JSON.stringify(editedTask),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("Something went wrong !");
          }
        }
        const task = [...this.state.tasks];
        const foundIndex = task.findIndex(
          (tasks) => tasks._id === editedTask._id
        );
        task[foundIndex] = editedTask;
        this.setState({
          tasks: task,
          editModal: null,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  };

  render() {
    const {
      tasks,
      selectedTasks,
      showConfirm,
      showNewTaskModal,
      editModal,
    } = this.state;
    let list = tasks.map((task) => {
      return (
        <Col
          xl={2}
          lg={3}
          md={4}
          sm={6}
          xs={12}
          style={{ margin: "  5px  0px" }}
          key={task._id}
        >
          <Tasks
            task={task}
            selectedTasks={selectedTasks}
            toggleTask={this.toggleTask}
            deleteTask={this.deleteTask}
            selected={selectedTasks.has(task._id)}
            editTask={this.editTask}
          />
        </Col>
      );
    });

    return (
      <div>
        <Container>
          <Row>
            <Col>
              {/* <h1>Todo list App</h1> */}
              <NewTask
                showNewTaskModal={showNewTaskModal}
                selectedTasks={selectedTasks}
                addTask={this.addTask}
                openNewTaskModal={this.openNewTaskModal}
              />
            </Col>
          </Row>
          <Col className="mb-5">
            <Button
              disabled={!!selectedTasks.size}
              onClick={this.openNewTaskModal}
              variant="primary "
              // className="m-4"
            >
              Add Task
            </Button>
            <Button
              onClick={this.selectAll}
              variant="warning"
              disabled={tasks.length > 1 ? false : true}
              className="m-5"
            >
              Select all
            </Button>
            <Button
              className="m-5"
              onClick={this.deselectAll}
              disabled={!selectedTasks.size}
              variant="success"
            >
              Deselect All
            </Button>

            <Button
              onClick={this.toggleConfirm}
              variant="danger"
              disabled={!selectedTasks.size}
              className="m-5"
            >
              Delete Select
            </Button>
          </Col>

          <Row>{list}</Row>
        </Container>
        {showConfirm && (
          <Confirm
            onClose={this.toggleConfirm}
            onConfirm={this.deleteSelect}
            selectedTasks={selectedTasks.size}
          />
        )}
        {editModal && (
          <EditTaskModal
            openNewTaskModal={this.openNewTaskModal}
            editModal={editModal}
            editTask={() => this.editTask(null)}
            saveEdit={this.handleSaveTask}
          />
        )}
      </div>
    );
  }
}
