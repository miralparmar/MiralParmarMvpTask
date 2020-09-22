import React, { Component } from "react";
import $ from "jquery";
import { Dropdown } from "semantic-ui-react";
import { Pagination, Table } from "semantic-ui-react";
import Moment from "react-moment";
import CreateSale from "./CreateSale";
import DeleteSale from "./DeleteSale";
import EditSale from "./EditSale";

export default class AllSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Datbase Data
      data: [],
      //Number of entries to show at a time
      selectedItem: 10,
      //Current active page
      currentPage: 1,
      // All Customers
      customers: [],
      // All Products
      products: [],
      // All Stores
      stores: [],
      //  Arrays for Dropdowns
      customeroptions: [],
      productoptions: [],
      storeoptions: [],
    };
  }
  //Number of entries dropdown options
  options = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "20", value: 20 },
    { key: 4, text: "30", value: 30 },
  ];
  //When Number of entries get changed
  onDropDownChangeEvent = (event, { value }) => {
    //Update table
    this.getSales();
    //Update page
    this.setState({ selectedItem: value, currentPage: 1 });
  };

  // Get data for dropdowns and table
  componentDidMount() {
    this.getSales();
    this.getCustomers();
    this.getProducts();
    this.getStores();
  }

  // Get sales
  getSales = () => {
    //AJAX Request
    $.ajax({
      type: "GET",
      url: "Sales/GetSales",
      dataType: "json",
      success: (res) => {
        this.setState({ data: res });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      },
    });
  };
  //When page number gets changed
  onPageChange = (event, data) => {
    //Get updated data
    this.getSales();
    //Set active page
    this.setState({
      currentPage: data.activePage,
    });
  };

  // Get Customers
  getCustomers = () => {
    // AJAX GET Request
    $.ajax({
      type: "GET",
      url: "Customers/GetCustomer",
      dataType: "json",
      success: (res) => {
        this.setState({ customers: res });
        var newOptions = [];
        // Setting up Customer Dropdown Options
        this.state.customers.map((customer) => {
          var updates = {
            key: customer.id,
            text: customer.name,
            value: customer.id,
          };
          newOptions = newOptions.concat(updates);
        });
        this.setState({
          customeroptions: newOptions,
        });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      },
    });
  };
  // Get Products
  getProducts = () => {
    // AJAX GET Request
    $.ajax({
      type: "GET",
      url: "Products/GetProduct",
      dataType: "json",
      success: (res) => {
        this.setState({ products: res });
        var newOptions = [];
        // Setting up Products Dropdown Options
        this.state.products.map((product) => {
          var updates = {
            key: product.id,
            text: product.name,
            value: product.id,
          };
          newOptions = newOptions.concat(updates);
        });
        this.setState({
          productoptions: newOptions,
        });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      },
    });
  };

  // Get Stores

  getStores = () => {
    // AJAX Get Request
    $.ajax({
      type: "GET",
      url: "Stores/GetStore",
      dataType: "json",
      success: (res) => {
        this.setState({ stores: res });
        var newOptions = [];
        // Setting up Stores Dropdown Options
        this.state.stores.map((store) => {
          var updates = {
            key: store.id,
            text: store.name,
            value: store.id,
          };
          newOptions = newOptions.concat(updates);
        });
        this.setState({
          storeoptions: newOptions,
        });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      },
    });
  };

  render() {
    let sales = this.state.data;
    let entries = this.state.selectedItem;

    //Calculating total pages
    this.totalpages = parseInt(sales.length / entries);
    if (sales.length % entries !== 0) {
      this.totalpages++;
    }
    //Calculate number of entries to show
    let skip = 0;
    skip = entries * (this.state.currentPage - 1);

    let start = skip + 1;
    let end = skip + entries;

    if (end > sales.length) {
      end = sales.length;
    }
    //Truncate sales according to number of entries
    sales = sales.slice(start - 1, end);

    return (
      <div id="container">
        <div>
          {/* Create Button */}
          <CreateSale
            buttonText="New Sale"
            getDataCallCreate={this.getSales}
            // Passing props for Dropdowns
            customerOption={this.state.customeroptions}
            productOption={this.state.productoptions}
            storeOption={this.state.storeoptions}
          />
          <br />
          <br />
        </div>
        {/* Data Table */}
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* Mapping Sales Data */}
            {sales.map((sale) => {
              return (
                <Table.Row key={sale.id.toString()}>
                  <Table.Cell>{sale.customer.name}</Table.Cell>
                  <Table.Cell>{sale.product.name}</Table.Cell>
                  <Table.Cell>{sale.store.name}</Table.Cell>
                  {/* Format Date */}
                  <Table.Cell>
                    <Moment format="DD MMM, YYYY">{sale.dateSold}</Moment>
                  </Table.Cell>

                  <Table.Cell>
                    {/* Edit Button */}
                    <EditSale
                      editData={sale}
                      getDataCallEdit={this.getSales}
                      // Passing props for Dropdowns
                      customerOption={this.state.customeroptions}
                      productOption={this.state.productoptions}
                      storeOption={this.state.storeoptions}
                    ></EditSale>
                  </Table.Cell>
                  <Table.Cell>
                    {/* Delete Button */}
                    <DeleteSale
                      deleteID={sale.id}
                      getDataCallDelete={this.getSales}
                    ></DeleteSale>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <br />
        <span>
          {/* Number of entries Dropdown */}
          <Dropdown
            id="sidedropdown"
            defaultValue={10}
            compact
            selection
            options={this.options}
            onChange={this.onDropDownChangeEvent}
          />
          {/* Pagination  */}
          <Pagination
            id="sidepage"
            defaultActivePage={1}
            totalPages={this.totalpages}
            onPageChange={this.onPageChange}
          />
        </span>
      </div>
    );
  }
}
