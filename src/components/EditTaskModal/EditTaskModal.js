import React, { PureComponent } from "react";
import { InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utility/utility";
import { connect } from "react-redux";
import { handleSaveTask } from "../../store/actions";
class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    const { date } = props.editModal;
    this.state = {
      ...props.editModal,
      date: date ? new Date(date) : new Date(),
    };
  }

  handleChang = (event) => {
    // save to state  input values

    const { name, value } = event.target;

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

    this.props.handleSaveTask({
      _id: this.state._id,
      title,
      description,
      date: formatDate(this.state.date.toISOString()),
    });
  };
  handleChangDate = (value) => {
    // save new Task Data
    this.setState({ date: value || new Date() });
  };
  render() {
    const { editTask } = this.props;
    const { title, description } = this.state;
    return (
      <Modal
        show={true}
        onHide={editTask}
        size="lg"
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Edit Task Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Title"
              value={title}
              name="title"
              onChange={this.handleChang}
              onKeyDown={this.handleKeyDown}
            />
          </InputGroup>
          <Form.Control
            as="textarea"
            placeholder="Description"
            value={description}
            name="description"
            onChange={this.handleChang}
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
            variant="success"
            onClick={this.handleSubmit}
          >
            Save
          </Button>
          <Button variant="primary" onClick={editTask}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
EditTaskModal.propTypes = {
  openNewTaskModal: PropTypes.func.isRequired,
  editModal: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
};
const mapDespatchToProps = {
  handleSaveTask,
};
export default connect(null, mapDespatchToProps)(EditTaskModal);
