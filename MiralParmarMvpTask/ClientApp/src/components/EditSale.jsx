import React, { Component } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { Dropdown, Icon } from "semantic-ui-react";
import $ from "jquery";

export default class EditSale extends Component {
  // Popup state
  state = { open: false };
  constructor(props) {
    super(props);

    this.state = {
      // Existing Data
      dateSold: this.props.editData.dateSold,
      customerId: this.props.editData.customerId,
      productId: this.props.editData.productId,
      storeId: this.props.editData.storeId,
      // Button Visibility
      disabled: true,
    };
  }
  // Show Popup
  show = () => {
    this.setState({ open: true, disabled: true });
  };
  // When Cancel is clicked, Close Popup
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        {/* Edit Button */}
        <Button onClick={this.show} color="yellow" icon size="small">
          <Icon name="edit"></Icon>
          &nbsp;&nbsp; EDIT
        </Button>
        {/* Popup */}
        <Confirm
          id="myPopup"
          open={this.state.open}
          header="Edit Sale"
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
      ProductId: this.state.productId,
      CustomerId: this.state.customerId,
      StoreId: this.state.storeId,
      DateSold: this.state.dateSold,
    };

    // AJAX Request for PUT

    $.ajax({
      type: "PUT",
      url: `Sales/PutSales/${this.props.editData.id}`,
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
    // Existing date
    var date = this.props.editData.dateSold;
    return (
      <div>
        <Form id="myForm" size="large">
          {/* Date Sold */}
          <Form.Field>
            <br />
            <label>Date Sold</label>

            <input
              // Truncating time from existing date
              defaultValue={date.substring(0, date.length - 9)}
              onChange={(e) =>
                // Save data and activate edit button
                this.setState({ dateSold: e.target.value, disabled: false })
              }
            />
          </Form.Field>
          {/* Customer */}
          <Form.Field>
            <label>Customer</label>
            <br />
            <Dropdown
              placeholder={this.props.editData.customer.name}
              compact
              selection
              options={this.props.customerOption}
              onChange={this.onCustomerChange}
            />
          </Form.Field>
          {/* Product */}
          <Form.Field>
            <label>Product</label>
            <Dropdown
              placeholder={this.props.editData.product.name}
              compact
              selection
              options={this.props.productOption}
              onChange={this.onProductChange}
            />
          </Form.Field>
          {/* Srore */}
          <Form.Field>
            <label>Store</label>
            <Dropdown
              placeholder={this.props.editData.store.name}
              compact
              selection
              options={this.props.storeOption}
              onChange={this.onStoreChange}
            />
          </Form.Field>
          <br />
          <br />
          <br />
        </Form>
      </div>
    );
  };
  // When Customer dropdown gets changed
  onCustomerChange = (event, { value }) => {
    // Save data and activate edit button
    this.setState({ customerId: value, disabled: false });
  };
  // When Product dropdown gets changed
  onProductChange = (event, { value }) => {
    // Save data and activate edit button
    this.setState({ productId: value, disabled: false });
  };
  // When Store dropdown gets changed
  onStoreChange = (event, { value }) => {
    // Save data and activate edit button
    this.setState({ storeId: value, disabled: false });
  };
}
