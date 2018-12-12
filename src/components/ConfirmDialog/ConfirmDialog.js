import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ConfirmDialog extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isVisible}
          toggle={this.props.closeAction}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.closeAction}>
            {this.props.confirmTitle}
          </ModalHeader>
          <ModalBody>{this.props.confirmQuestion}</ModalBody>
          <ModalFooter>
            <Button
              color={this.props.confirmButtonClass}
              onClick={this.props.submitAction}
            >
              {this.props.confirmButtonMessage}
            </Button>{" "}
            <Button color="secondary" onClick={this.props.closeAction}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmDialog;
