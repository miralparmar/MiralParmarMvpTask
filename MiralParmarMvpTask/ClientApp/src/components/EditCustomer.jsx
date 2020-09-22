import React, { Component } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import $ from "jquery";

export default class EditCustomer extends Component {
  // Popup state
  state = { open: false };
  constructor(props) {
    super(props);
    this.state = {
      // Existing Data
      name: this.props.editData.name,
      address: this.props.editData.address,
      // Button Visibility
      disabled: true,
    };
  }
  // Show Popup
  show = () => this.setState({ open: true, disabled: true });
  // When Cancel is clicked, Close Popup
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        {/* Edit Button */}
        <Button onClick={this.show} color="yellow" icon size="small">
          <Icon name="edit" />
          &nbsp;&nbsp; EDIT
        </Button>
        {/* Popup */}
        <Confirm
          id="myPopup"
          open={this.state.open}
          header="Edit Customer"
          size="small"
          // Edit Form
          content={this.renderEditForm}
          // Cancel Button
          cancelButton={this.renderCancelButton}
          // Edit Button
          confirmButton={this.renderEditButton}
        />
      </div>
    );
  }
  // Edit Button in Popup
  renderEditButton = () => {
    return (
      <Button
        onClick={this.handleEditClick}
        color="green"
        disabled={this.state.disabled}
        icon
        labelPosition="right"
      >
        <Icon name="check" />
        Edit
      </Button>
    );
  };
  // Cancel button in Popup
  renderCancelButton = () => {
    return (
      <Button onClick={this.handleCancel} color="black">
        Cancel
      </Button>
    );
  };

  // When Edit button in Popup is clicked
  handleEditClick = () => {
    // Close Popup
    this.setState({ open: false });

    // Object to Update in Database
    var formData = {
      Id: this.props.editData.id,
      Name: this.state.name,
      Address: this.state.address,
    };
    // AJAX Request for PUT
    $.ajax({
      type: "PUT",
      url: `Customers/PutCustomer/${this.props.editData.id}`,
      data: JSON.stringify(formData),
      dataType: "json",
      contentType: "application/json",
      success: (data, textStatus, jqXHR) => {
        //  Update Table
        this.props.getDataCallEdit();
      },
      error: (jqXHR, textStatus, errorThrown) => {},
    });
  };
  // Edit Form inside Popup
  renderEditForm = () => {
    return (
      <div>
        <Form id="myForm" size="large">
          {/* Name */}
          <Form.Field>
            <br />
            <label>Name</label>
            <br />
            <input
              defaultValue={this.props.editData.name}
              // Save data and activate edit button
              onChange={(e) =>
                this.setState({ name: e.target.value, disabled: false })
              }
            />
          </Form.Field>
          {/* Address */}
          <Form.Field>
            <label>Address</label>
            <br />
            <input
              defaultValue={this.props.editData.address}
              // Save data and activate edit button
              onChange={(e) =>
                this.setState({ address: e.target.value, disabled: false })
              }
            />
          </Form.Field>
        </Form>
      </div>
    );
  };
}
