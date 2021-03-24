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
  };
  handleChang = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  addTask = () => {
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
    const { tasks } = this.state;
    const todo = tasks.filter((task) => taskId !== task._id);
    this.setState({
      tasks: todo,
    });
  };

  render() {
    const { tasks, inputValue } = this.state;

    let list = tasks.map((el) => {
      return (
        <Col
          xl={2}
          lg={3}
          md={4}
          sm={6}
          xs={12}
          style={{ margin: "  5px  0px" }}
        >
          <Card key={el._id}>
            <Card.Header>{el.title}</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>Some quick</Card.Text>
              <Button onClick={() => this.deleteTask(el._id)} variant="danger">
                delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );

      // <li key={index}> {el}</li>;
    });

    return (
      <div>
        <h1>Todo list</h1>

        <Container>
          <Row>
            <Col>
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

          <Row>{list}</Row>
        </Container>
      </div>
    );
  }
}
