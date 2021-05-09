import React, { PureComponent } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Tasks from "../Tasks/Tasks";
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { connect } from "react-redux";
import { getTasks, deleteSelect, deleteTasks } from "../../store/actions";
import Search from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faSearch,
  faCheck,
  faPlusSquare,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
class Todo extends PureComponent {
  state = {
    showConfirm: false,
    selectedTasks: new Set(),
    showNewTaskModal: false,
    editModal: null,
    search: false,
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
  searchState = () => {
    this.setState({ search: !this.state.search });
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
  myReplace = () => {
    this.props.getTasks();
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
          <Container
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={8}
            style={{ margin: "5%  0%" }}
          >
            <Row>
              <Col>
                <Button
                  disabled={!!selectedTasks.size}
                  onClick={this.openNewTaskModal}
                  variant="primary "
                  // className="m-4"
                >
                  Add Task <FontAwesomeIcon icon={faPlusSquare} />
                </Button>
              </Col>

              <Col>
                <Button
                  disabled={this.props.tasks.length < 2}
                  onClick={this.selectAll}
                  variant="warning"
                >
                  Select all <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={this.deselectAll}
                  disabled={!selectedTasks.size}
                  variant="success"
                >
                  <p>
                    Deselect All <FontAwesomeIcon icon={faTimes} />
                  </p>
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={this.toggleConfirm}
                  variant="danger"
                  disabled={!selectedTasks.size}
                >
                  Delete Select <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </Col>
              <Col>
                <Button onClick={this.searchState} variant="warning">
                  Search <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Col>
              <Col>
                <Button onClick={this.myReplace} variant="primary">
                  Replace <FontAwesomeIcon icon={faUndo} />
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
        {search && <Search searchToggle={this.searchState} search={search} />}
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

const mapDespatchToProps = {
  getTasks,
  deleteSelect,
  deleteTasks,
};

export default connect(mapStateToProps, mapDespatchToProps)(Todo);
