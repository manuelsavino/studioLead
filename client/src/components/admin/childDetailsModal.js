import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class ChildDetailsModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        {/* {console.log("is open", this.props.isOpen)} */}
        <ModalHeader>test</ModalHeader>
        <ModalBody>test</ModalBody>
        <ModalFooter>
          <Button color="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
