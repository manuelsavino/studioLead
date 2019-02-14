import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function MyModal(props) {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>{props.modalTitle}</ModalHeader>
      <ModalBody>{props.modalBody}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.modalAction}>
          Yes
        </Button>{" "}
        <Button color="secondary" onClick={props.handleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
