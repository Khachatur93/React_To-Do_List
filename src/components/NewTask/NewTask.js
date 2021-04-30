import React, { PureComponent } from "react";
import { InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utility/utility";
import { connect } from "react-redux";
import { newTask } from "../../store/actions";
class NewTask extends PureComponent {
  state = {
    title: "",
    description: "",
    date: new Date(),
  };
  handleChang = (value, name) => {
    // save to state  input values

    this.setState({
      [name]: value,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    // add task
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    if (!title) {
      return;
    }
    const { date } = this.state;
    const newTask = {
      title: title,
      description: description,
      date: formatDate(date.toISOString()),
    };
    this.setState({
      title: "",
      description: "",
    });

    this.props.newTask(newTask);
  };
  handleChangDate = (value) => {
    // save new Task Data
    this.setState({ date: value || new Date() });
  };

  render() {
    const { showNewTaskModal, openNewTaskModal } = this.props;
    return (
      <Modal
        show={showNewTaskModal}
        onHide={openNewTaskModal}
        size="lg"
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-center">
            Add new task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Title"
              onChange={(event) =>
                this.handleChang(event.target.value, "title")
              }
              onKeyDown={this.handleKeyDown}
            />
          </InputGroup>

          <Form.Control
            as="textarea"
            placeholder="Description"
            onChange={(event) =>
              this.handleChang(event.target.value, "description")
            }
            rows={5}
          />
          <DatePicker
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.handleChangDate}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Add
          </Button>
          <Button variant="success" onClick={openNewTaskModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
NewTask.propTypes = {
  showNewTaskModal: PropTypes.bool.isRequired,
  openNewTaskModal: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    modalState: state.modalState,
  };
};

const mapDespatchToProps = {
  newTask,
};

export default connect(mapStateToProps, mapDespatchToProps)(NewTask);
