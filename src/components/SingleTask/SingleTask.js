import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { formatDate, textTruncate, titleTruncate } from "../../utility/utility";

import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
export default class SingleTask extends Component {
  state = {
    tasks: null,
    openEditModal: false,
  };
  componentDidMount() {
    const taskId = this.props.match.params.taskId;

    fetch(`http://localhost:3001/task/${taskId}`, {
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
        console.log("res", res);
        this.setState({
          tasks: res,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  }
  deleteTask = () => {
    //delete task  in back and clos task
    const taskId = this.state.tasks._id;

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

        this.props.history.push("/");
      })

      .catch((error) => {
        console.log(error, "error");
      });
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
        this.setState({
          tasks: res,
          openEditModal: false,
        });
      })

      .catch((error) => {
        console.log(error, "error");
      });
  };
  toggleEditModal = () => {
    this.setState({ openEditModal: !this.state.openEditModal });
  };
  render() {
    const { tasks, openEditModal } = this.state;
    return (
      <div style={{ padding: "14% 35%" }}>
        <>
          {tasks ? (
            <Card>
              <Card.Header>{titleTruncate(tasks.title)}</Card.Header>
              <Card.Body>
                <Card.Title>{formatDate(tasks.date)}</Card.Title>
                <Card.Text> {textTruncate(tasks.description)}</Card.Text>
                <Col>
                  <Button
                    variant="warning"
                    className="m-2"
                    onClick={this.toggleEditModal}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    onClick={this.deleteTask}
                    disabled={""}
                    variant="danger"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          ) : (
            "Task date  note exist !"
          )}
        </>
        {openEditModal && (
          <EditTaskModal
            openNewTaskModal={this.toggleEditModal}
            editModal={tasks}
            editTask={this.toggleEditModal}
            saveEdit={this.handleSaveTask}
          />
        )}
      </div>
    );
  }
}
