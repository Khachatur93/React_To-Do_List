import React, { PureComponent } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Tasks from "../Tasks/Tasks";
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { connect } from "react-redux";
import { getTasks, deleteSelect, deleteTasks } from "../../store/actions";
import Search from "../Search/Search";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Todo extends PureComponent {
  state = {
    showConfirm: false,
    selectedTasks: new Set(),
    showNewTaskModal: false,
    editModal: null,
    search: true,
  };
  componentDidMount() {
    this.props.getTasks();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.modalState && this.props.modalState) {
      this.setState({ showNewTaskModal: false });
      return;
    }
    if (!prevProps.deleteTaskSuccess && this.props.deleteTaskSuccess) {
      this.setState({
        selectedTasks: new Set(),
        showConfirm: false,
      });
      return;
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.editTask();
      return;
    }
  }
  deleteTask = (taskId) => {
    this.props.deleteTasks(taskId);
  };
  ////////////////////////////////////////////////////

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
    const { selectedTasks } = this.state;
    this.props.deleteSelect(selectedTasks);
  };
  toggleConfirm = () => {
    // open and close modal for delete
    this.setState({ showConfirm: !this.state.showConfirm });
  };
  selectAll = () => {
    // select all tasks
    const { tasks } = this.props;
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

  render() {
    const {
      selectedTasks,
      showConfirm,
      showNewTaskModal,
      editModal,
      search,
    } = this.state;

    const { tasks } = this.props;

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
            deleteTask={this.props.deleteTasks}
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
              <NewTask
                showNewTaskModal={showNewTaskModal}
                selectedTasks={selectedTasks}
                // addTask={this.props.newTask}
                openNewTaskModal={this.openNewTaskModal}
              />
            </Col>
          </Row>
          <Container style={{ margin: "5%  0%" }}>
            <Row>
              <Col>
                <Button
                  disabled={!!selectedTasks.size}
                  onClick={this.openNewTaskModal}
                  variant="primary "
                  // className="m-4"
                >
                  Add Task
                </Button>
              </Col>

              <Col>
                <Button onClick={this.selectAll} variant="warning">
                  Select all
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={this.deselectAll}
                  disabled={!selectedTasks.size}
                  variant="success"
                >
                  Deselect All
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={this.toggleConfirm}
                  variant="danger"
                  disabled={!selectedTasks.size}
                >
                  Delete Select
                </Button>
              </Col>
            </Row>
          </Container>
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
          />
        )}
        {search ? <Search /> : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    modalState: state.modalState,
    deleteTaskSuccess: state.deleteTaskSuccess,
    editTaskSuccess: state.editTaskSuccess,
  };
};
// const mapDespatchToProps = (despatch) => {
//   return {
//     getTasks: () => {
//       request("http://localhost:3001/task").then((tasks) => {
//         despatch({ type: "GET_TASKS", tasks: tasks });
//       });
//     },
//   };
// };
const mapDespatchToProps = {
  getTasks,
  deleteSelect,
  deleteTasks,
};

export default connect(mapStateToProps, mapDespatchToProps)(Todo);
