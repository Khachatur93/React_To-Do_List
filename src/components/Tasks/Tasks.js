import React, { PureComponent } from "react";
import { Card, Button, Col } from "react-bootstrap";
import style from "./style.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utility/utility";
import { Link } from "react-router-dom";
import { textTruncate, titleTruncate } from "../../utility/utility";

export default class Tasks extends PureComponent {
  handleChange = () => {
    const { task, toggleTask } = this.props;
    toggleTask(task._id);
  };
  render() {
    const { task, selectedTasks, deleteTask, selected, editTask } = this.props;

    return (
      <Card
        key={task._id}
        className={`${selected ? style.selected : ""}`}
        style={{ height: "100%", boxShadow: "5px 5px 4px grey" }}
      >
        <div className={style.tas}>
          <Card.Header>
            <input
              checked={selected}
              type="checkbox"
              onChange={() => this.handleChange(task._id)}
              className="m-1"
            />
            <Link style={{ textDecoration: "none" }} to={`/task/${task._id}`}>
              {titleTruncate(task.title)}
            </Link>
          </Card.Header>
          <Card.Body>
            <Card.Text>Data: {formatDate(task.date)}</Card.Text>
            <Card.Title style={{ minHeight: "3vh" }}>
              {textTruncate(task.description)}
            </Card.Title>
            <Col>
              <Button
                variant="warning"
                className="m-2"
                disabled={!!selectedTasks.size}
                onClick={() => editTask(task)}
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
        </div>
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
