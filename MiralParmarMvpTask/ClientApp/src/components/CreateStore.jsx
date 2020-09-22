import React, { Component } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { Form, Icon } from "semantic-ui-react";
import $ from "jquery";

export default class CreateStore extends Component {
  //Popup state
  state = { open: false };
  constructor(props) {
    super(props);
    this.state = {
      //Data to be posted in database
      name: "",
      address: "",
      //Button visibility
      disabled: true,
    };
  }
  //Show Popup
  show = () =>
    this.setState({ open: true, disabled: true, name: "", address: "" });
  //When cancel is clicked, close Popup
  handleCancel = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* Create Button */}
        <Button primary onClick={this.show}>
          {this.props.buttonText}
        </Button>
        {/* Popup */}
        <Confirm
          id="myPopup"
          open={this.state.open}
          header="Create Store"
          size="small"
          // Input Form
          content={this.renderInputForm()}
          // Cancel Button
          cancelButton={this.renderCancelButton}
          // Create Button
          confirmButton={this.renderCreateButton}
        />
      </div>
    );
  }
  // Create Button
  renderCreateButton = () => {
    //console.log(this.state.disabled);
    return (
      <Button
        onClick={this.handleCreateClick}
        color="green"
        disabled={this.state.disabled}
        icon
        labelPosition="right"
      >
        <Icon name="check" />
        Create
      </Button>
    );
  };
  // Cancel Button
  renderCancelButton = () => {
    return (
      <Button onClick={this.handleCancel} color="black">
        Cancel
      </Button>
    );
  };
  // Input Form
  renderInputForm = () => {
    return (
      <div>
        <Form id="myForm" size="large">
          {/* Name */}
          <Form.Field>
            <br />
            <label>Name</label>
            <br />
            <input
              placeholder="Name"
              onChange={(e) => {
                // Save data
                this.setState({ name: e.target.value });
                // If values are there, Activate create button
                if (this.state.name !== "" && this.state.address !== "") {
                  this.setState({ disabled: false });
                }
              }}
            />
          </Form.Field>
          {/* Address */}
          <Form.Field>
            <label>Address</label>
            <br />
            <input
              placeholder="Address"
              onChange={(e) => {
                // Save data
                this.setState({ address: e.target.value });
                // If values are there, Activate create button
                if (this.state.name !== "" && this.state.address !== "") {
                  this.setState({ disabled: false });
                }
              }}
            />
          </Form.Field>
        </Form>
      </div>
    );
  };
  // When Create button is clicked
  handleCreateClick = () => {
    // Object to Post
    var formData = { Name: this.state.name, Address: this.state.address };
    // Close Popup
    this.setState({ open: false });
    // AJAX Request for POST
    $.ajax({
      type: "POST",
      url: "Stores/PostStore",
      data: JSON.stringify(formData),
      dataType: "json",
      contentType: "application/json",
      success: (data, textStatus, jqXHR) => {
        // Update Table
        this.props.getDataCallCreate();
      },
      error: (jqXHR, textStatus, errorThrown) => {},
    });
  };
}
