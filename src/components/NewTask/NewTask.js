import React, { Component } from "react";
import { InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import idGenerator from "../../helpers/idGenerator";
import PropTypes from "prop-types";

export default class NewTask extends Component {
  state = {
    title: "",
    description: "",
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
    const newTask = {
      _id: idGenerator(),
      title: title,
      description: description,
    };
    this.setState({
      title: "",
      description: "",
    });

    this.props.addTask(newTask);
  };
  // changeDescription = (event) => {
  //   this.setState({
  //     description: event.target.value,
  //   });
  // };
  render() {
    const { description } = this.state;
    const { showNewTaskModal, openNewTaskModal } = this.props;
    return (
      <Modal
        show={showNewTaskModal}
        onHide={openNewTaskModal}
        size="lg"
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header closeButton>
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
  addTask: PropTypes.func.isRequired,
  showNewTaskModal: PropTypes.bool.isRequired,
  openNewTaskModal: PropTypes.func.isRequired,
};
