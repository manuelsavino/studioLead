import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import API from "../../utils/API";

export default class MyModal extends Component {
  constructor() {
    super();
    this.state = {
      type: "",
      modalbody: "",
      modalTitle: "",
      modalAction: "",
      data: ""
    };
  }

  componentDidUpdate() {
    if (this.props.modalOptions.modalType === "lead") {
      const { data } = this.props.modalOptions;
      // console.log("data", data);
      API.getOneLead(data).then(lead => {
        console.log("lead:", lead.data);
        this.props.modalOptions.modalType = "";
        this.setState({ data: lead.data });
      });
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader>{this.props.modalOptions.modalTitle}</ModalHeader>
        <ModalBody>{this.props.modalOptions.modalBody}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.modalOptions.modalAction}>
            {this.props.modalOptions.modalActionText}
          </Button>{" "}
          <Button
            color="secondary"
            onClick={e => {
              this.props.handleModal(e);
              this.setState({ data: "" });
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
