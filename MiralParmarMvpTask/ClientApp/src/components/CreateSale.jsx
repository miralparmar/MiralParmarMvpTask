import React, { Component } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { Form, Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import $ from "jquery";

export default class CreateSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Popup state
      open: false,
      // Data to be posted in database
      datesold: "",
      customerid: "",
      productid: "",
      storeid: "",
      // Button visibility
      disabled: true,
    };
  }
  // Show Popup and Disable Create Button
  show = () => {
    this.setState({
      open: true,
      disabled: true,
    });
    this.customervalue = 0;
    this.productvalue = 0;
    this.storevalue = 0;
    this.datesold = "";
  };
  // When cancel is clicked, close Popup
  handleCancel = () => this.setState({ open: false });

  // When there is enough data in the form, Enable Create Button
  checkEmpty = () => {
    if (
      this.customervalue !== 0 &&
      this.productvalue !== 0 &&
      this.storevalue !== 0 &&
      this.datesold !== ""
    ) {
      this.setState({ disabled: false });
    }
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
          header="Create Sale"
          size="small"
          // Input Form
          content={this.renderInputForm}
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
          {/* Date Sold */}
          <Form.Field>
            <br />
            <label>Date Sold</label>
            <br />
            <input
              placeholder="YYYY/MM/DD"
              onChange={(e) => {
                // Save data
                this.setState({ datesold: e.target.value });
                // If values are there, Activate create button
                this.datesold = e.target.value;
                this.checkEmpty();
              }}
            />
          </Form.Field>
          {/* Customer */}
          <Form.Field>
            <label>Customer</label>
            <br />
            <Dropdown
              placeholder="Select Customer"
              compact
              selection
              options={this.props.customerOption}
              onChange={this.onCustomerChange}
              onClose={this.checkEmpty}
            />
          </Form.Field>
          {/* Product */}
          <Form.Field>
            <label>Product</label>
            <br />
            <Dropdown
              placeholder="Select Product"
              compact
              selection
              options={this.props.productOption}
              onChange={this.onProductChange}
              onClose={this.checkEmpty}
            />
          </Form.Field>
          {/* Store */}
          <Form.Field>
            <label>Store</label>
            <br />
            <Dropdown
              placeholder="Select Store"
              compact
              selection
              options={this.props.storeOption}
              onChange={this.onStoreChange}
              onClose={this.checkEmpty}
            />
          </Form.Field>
          <br />
          <br />
         
         
        </Form>
      </div>
    );
  };
  // When Customer dropdown is changed
  onCustomerChange = (event, { value }) => {
    // Save data
    this.setState({ customerid: value });
    // Save value for Activating Create button
    this.customervalue = value;
  };
  // When Product dropdown is changed
  onProductChange = (event, { value }) => {
    // Save data
    this.setState({ productid: value });
    // Save value for Activating Create button
    this.productvalue = value;
  };
  // When Store dropdown is changed
  onStoreChange = (event, { value }) => {
    // Save data
    this.setState({ storeid: value });
    // Save value for Activating Create button
    this.storevalue = value;
  };

  // When Create button is clicked
  handleCreateClick = () => {
    // Close Popup
    this.setState({ open: false });
    // Object to Post
    var formData = {
      ProductId: this.state.productid,
      CustomerId: this.state.customerid,
      StoreId: this.state.storeid,
      DateSold: this.state.datesold,
    };
    // AJAX Request for POST
    $.ajax({
      type: "POST",
      url: "Sales/PostSales",
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
