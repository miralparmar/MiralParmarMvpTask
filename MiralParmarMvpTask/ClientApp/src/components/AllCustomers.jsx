import React, { Component } from "react";
import $ from "jquery";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import { Dropdown } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import { Table, Icon } from "semantic-ui-react";

export default class AllCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Database Data
      data: [],
      //Number of entries to show at a time
      selectedItem: 10,
      //Current active page
      currentPage: 1,
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
    //this.getCustomers();
    //Update page
    this.setState({ selectedItem: value, currentPage: 1 });
  };

  componentDidMount() {
    this.getCustomers();
  }

  //Get data
  getCustomers = () => {
    //AJAX Request
    $.ajax({
      type: "GET",
      url: "Customers/GetCustomer",
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
    //this.getCustomers();
    //Set active page
    this.setState({
      currentPage: data.activePage,
    });
  };

  sortAscending = (columnName) => {
    var sortedData = this.state.data;
    sortedData.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
    this.setState({
      data: sortedData,
    });
  };
  sortDescending = (columnName) => {
    var sortedData = this.state.data;
    sortedData.sort((a, b) => (a[columnName] > b[columnName] ? -1 : 1));
    this.setState({
      data: sortedData,
    });
  };

  render() {
    let customers = this.state.data;

    let entries = this.state.selectedItem;

    //Calculating total pages
    this.totalpages = parseInt(customers.length / entries);
    if (customers.length % entries !== 0) {
      this.totalpages++;
    }

    //Calculate number of entries to show
    let skip = 0;
    skip = entries * (this.state.currentPage - 1);
    let start = skip + 1;
    let end = skip + entries;

    if (end > customers.length) {
      end = customers.length;
    }
    //Truncate customer according to number of entries
    customers = customers.slice(start - 1, end);

    return (
      <div id="container">
        <div>
          {/* Create Button */}
          <CreateCustomer
            buttonText="New Customer"
            getDataCallCreate={this.getCustomers}
          />
          <br />
          <br />
        </div>
        {/* Data Table */}
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name &nbsp;&nbsp;
                <Icon
                  name="triangle down"
                  color="grey"
                  fitted
                  onClick={() => this.sortAscending("name")}
                />
                <Icon
                  name="triangle up"
                  color="grey"
                  fitted
                  onClick={() => this.sortDescending("name")}
                />
              </Table.HeaderCell>

              <Table.HeaderCell>
                Address &nbsp;&nbsp;
                <Icon
                  name="triangle down"
                  color="grey"
                  fitted
                  onClick={() => this.sortAscending("address")}
                />
                <Icon
                  name="triangle up"
                  color="grey"
                  fitted
                  onClick={() => this.sortDescending("address")}
                />
              </Table.HeaderCell>

              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* Mapping Customer Data */}
            {customers.map((customer) => {
              return (
                <Table.Row key={customer.id.toString()}>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>{customer.address}</Table.Cell>

                  <Table.Cell>
                    {/* Edit Button */}
                    <EditCustomer
                      editData={customer}
                      getDataCallEdit={this.getCustomers}
                    ></EditCustomer>
                  </Table.Cell>
                  <Table.Cell>
                    {/* Delete Button */}
                    <DeleteCustomer
                      deleteID={customer.id}
                      getDataCallDelete={this.getCustomers}
                    ></DeleteCustomer>
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
