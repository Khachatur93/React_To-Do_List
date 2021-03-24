import React, { Component } from "react";

import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import idGenerator from "./idGenerator";
///////////////     ////////////////////     /////////////////////////////         ///////////////////////
export default class Todo extends Component {
  state = {
    inputValue: "",
    tasks: [],
    selectedTasks: new Set(),
  };
  handleChang = (event) => {
    // save to state  input values
    this.setState({
      inputValue: event.target.value,
    });
  };
  addTask = () => {
    // add task
    const inputValue = this.state.inputValue.trim();
    const { tasks } = this.state;
    if (!inputValue) {
      return;
    }
    const newTask = {
      _id: idGenerator(),
      title: inputValue,
    };
    this.setState({
      tasks: [...tasks, newTask],
      inputValue: "",
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
    });
  };

  render() {
    const { tasks, inputValue, selectedTasks } = this.state;
    let list = tasks.map((task) => {
      return (
        <Col
          xl={2}
          lg={3}
          md={4}
          sm={6}
          xs={12}
          style={{ margin: "  5px  0px" }}
        >
          <Card key={task._id}>
            <Card.Header>
              <input
                type="checkbox"
                onClick={() => this.toggleTask(task._id)}
                style={{ marginRight: "8px" }}
              />
              {task.title}
            </Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>Some quick</Card.Text>
              <Button
                onClick={() => this.deleteTask(task._id)}
                variant="danger"
              >
                Delete
              </Button>
              <Button
                variant="warning"
                style={{ marginLeft: "5px", padding: "6px 22px" }}
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>Todo list</h1>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter task name"
                  onChange={this.handleChang}
                  value={inputValue}
                />
                <InputGroup.Append>
                  <Button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.addTask}
                  >
                    Add task
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Button
            onClick={this.deleteSelect}
            variant="danger"
            disabled={!selectedTasks.size}
          >
            delete select
          </Button>
          <Row>{list}</Row>
        </Container>
      </div>
    );
  }
}
