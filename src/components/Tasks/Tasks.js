import React, { PureComponent } from "react";
import { Card, Button, Col } from "react-bootstrap";
import style from "./style.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faCheck,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utility/utility";
import { Link } from "react-router-dom";
import { textTruncate, titleTruncate } from "../../utility/utility";
import { connect } from "react-redux";
import { handleSaveTask } from "../../store/actions";

class Tasks extends PureComponent {
  handleChange = () => {
    const { task, toggleTask } = this.props;
    toggleTask(task._id);
  };

  render() {
    const {
      task,
      selectedTasks,
      deleteTask,
      selected,
      handleSaveTask,
      editTask,
    } = this.props;

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
            <Card.Title style={{ minHeight: "15vh" }}>
              {textTruncate(task.description)}
            </Card.Title>
            <br />
            <Card.Text>
              Data: {formatDate(task.date)}
              <br />
              Status: {task.status}
            </Card.Text>

            <Col>
              {task.status === "active" ? (
                <Button
                  variant="success"
                  disabled={!!selectedTasks.size}
                  onClick={() =>
                    handleSaveTask({
                      status: "done",
                      _id: task._id,
                      statusFrom: true,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  disabled={!!selectedTasks.size}
                  onClick={() =>
                    handleSaveTask({
                      status: "active",
                      _id: task._id,
                      statusFrom: true,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faUndo} />
                </Button>
              )}

              <Button
                variant="warning"
                disabled={!!selectedTasks.size}
                onClick={() => editTask(task)}
                style={{ margin: "5px" }}
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

const mapDespatchToProps = {
  handleSaveTask,
};

export default connect(null, mapDespatchToProps)(Tasks);
