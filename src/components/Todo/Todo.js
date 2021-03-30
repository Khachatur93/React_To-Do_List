import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Tasks from "../Tasks/Tasks";
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class Todo extends Component {
  state = {
    tasks: [],
    showConfirm: false,
    selectedTasks: new Set(),
    showNewTaskModal: false,
  };

  addTask = (newTask) => {
    const { tasks } = this.state;

    this.setState({
      tasks: [...tasks, newTask],
      showNewTaskModal: false,
    });
  };
  deleteTask = (taskId) => {
    // delete task
    const { tasks } = this.state;
    const todo = tasks.filter((task) => taskId !== task._id);
    this.setState({
      tasks: todo,
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
  render() {
    const { tasks, selectedTasks, showConfirm, showNewTaskModal } = this.state;
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
          />
        </Col>
      );
    });

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>Todo list App</h1>
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
              disabled={!!selectedTasks.size}
              className="m-5"
            >
              Select all
            </Button>
            <Button
              className="m-5"
              onClick={this.deselectAll}
              disabled={selectedTasks.size === 0}
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
      </div>
    );
  }
}
