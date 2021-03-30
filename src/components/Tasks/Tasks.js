import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import style from "./style.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
export default class Tasks extends Component {
  handleChange = () => {
    const { task, toggleTask } = this.props;
    toggleTask(task._id);
  };
  render() {
    const { task, selectedTasks, deleteTask, selected } = this.props;

    return (
      <Card key={task._id} className={`${selected ? style.selected : ""}`}>
        <Card.Header>
          <input
            checked={selected}
            type="checkbox"
            onChange={() => this.handleChange(task._id)}
            className="m-1"
          />
          {task.title}
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>{task.description}</Card.Text>
          <Col>
            <Button
              variant="warning"
              className="m-2"
              disabled={!!selectedTasks.size}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              onClick={() => deleteTask(task._id)}
              disabled={!!selectedTasks.size}
              variant="danger"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Col>
        </Card.Body>
      </Card>
    );
  }
}
Tasks.propTypes = {
  task: PropTypes.object.isRequired,
  selectedTasks: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
