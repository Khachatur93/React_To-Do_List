import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { formatDate, textTruncate, titleTruncate } from "../../utility/utility";
import { connect } from "react-redux";
import { getTask, deleteTasks } from "../../store/actions";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";

class SingleTask extends Component {
  state = {
    openEditModal: false,
  };

  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    this.props.getTask(taskId);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.editSuccess && this.props.editSuccess) {
      this.setState({
        openEditModal: false,
      });
      return;
    }
  }
  deleteTask = () => {
    //delete task  in back and close task
    const taskId = this.props.task._id;

    this.props.deleteTasks(taskId, "single");
  };

  toggleEditModal = () => {
    this.setState({ openEditModal: !this.state.openEditModal });
  };
  render() {
    const { openEditModal } = this.state;
    const { task } = this.props;
    return (
      <div style={{ padding: "14% 35%" }}>
        <>
          {task ? (
            <Card>
              <Card.Header>{titleTruncate(task.title)}</Card.Header>
              <Card.Body>
                <Card.Title>{formatDate(task.date)}</Card.Title>
                <Card.Text> {textTruncate(task.description)}</Card.Text>
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
            editModal={task}
            editTask={this.toggleEditModal}
            from="single"
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    task: state.task,
    modalState: state.modalState,
    deleteTaskSuccess: state.deleteTaskSuccess,
    editSuccess: state.editSuccess,
  };
};

const mapDespatchToProps = {
  getTask,
  deleteTasks,
};
export default connect(mapStateToProps, mapDespatchToProps)(SingleTask);
