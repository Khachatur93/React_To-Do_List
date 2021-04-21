import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { propTypes } from "react-bootstrap/esm/Image";

export default function Confirm(props) {
  return (
    <Modal
      show={true}
      onHide={() => {
        props.onClose();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-center">
          Are you sure want to remove {props.selectedTasks} ! task
          {props.selectedTasks > 1 ? "s" : ""}
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="danger" onClick={props.onConfirm}>
          {/* <FontAwesomeIcon icon={["trash-alt"]} /> */}
          Delete
        </Button>
        <Button variant="success" onClick={props.onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
Confirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  selectedTasks: PropTypes.number.isRequired,
};
