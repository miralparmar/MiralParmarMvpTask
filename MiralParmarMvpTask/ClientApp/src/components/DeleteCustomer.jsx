import React, { Component } from "react";
import { Button, Confirm, Icon, Form } from "semantic-ui-react";
import $ from "jquery";

export default class DeleteCustomer extends Component {
  // Popup state
  state = { open: false };
  constructor(props) {
    super(props);
  }
  // Show Popup
  show = () => this.setState({ open: true });
  // When Cancel is clicked, close Popup
  handleCancel = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* Delete Button */}
        <Button onClick={this.show} color="red" icon size="small">
          <Icon name="trash" />
          &nbsp;&nbsp; DELETE
        </Button>
        {/* Popup */}
        <Confirm
          id="myPopup"
          open={this.state.open}
          header="Delete Customer"
          size="tiny"
          // Cancel Button
          cancelButton={this.renderCancelButton}
          // Delete Button
          confirmButton={this.renderDeleteButton}
          // Delete Form
          content={this.renderDeleteForm}
        />
      </div>
    );
  }
  // Delete Form
  renderDeleteForm = () => {
    return (
      <Form id="myForm" size="large">
        <br />
        <label id="areyousure">Are you sure?</label>
      </Form>
    );
  };
  // Delete Button inside Popup
  renderDeleteButton = () => {
    return (
      <Button
        onClick={this.handleDeleteClick}
        color="red"
        icon
        labelPosition="right"
      >
        <Icon name="cancel" />
        Delete
      </Button>
    );
  };
  // Cancel Button inside Popup

  renderCancelButton = () => {
    return (
      <Button onClick={this.handleCancel} color="black">
        Cancel
      </Button>
    );
  };

  // When Delete is clicked inside Popup
  handleDeleteClick = () => {
    // Close Popup
    this.setState({ open: false });
    // AJAX request for DELETE
    $.ajax({
      type: "DELETE",
      url: `Customers/DeleteCustomer/${this.props.deleteID}`,

      dataType: "json",
      contentType: "application/json",
      success: (data, textStatus, jqXHR) => {
        // Update Table
        this.props.getDataCallDelete();
      },
      error: (jqXHR, textStatus, errorThrown) => {},
    });
  };
}
