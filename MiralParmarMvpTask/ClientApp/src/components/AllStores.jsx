import React, { Component } from "react";
import $ from "jquery";
import CreateStore from "./CreateStore";
import EditStore from "./EditStore";
import DeleteStore from "./DeleteStore";
import { Dropdown } from "semantic-ui-react";
import { Pagination, Table } from "semantic-ui-react";

export default class AllStores extends Component {
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
  //Number of entries options
  options = [
    { key: 1, text: "5", value: 5 },
    { key: 2, text: "10", value: 10 },
    { key: 3, text: "20", value: 20 },
    { key: 4, text: "30", value: 30 },
  ];
  //When Number of entries get changed
  onDropDownChangeEvent = (event, { value }) => {
    //Update table
    this.getStores();
    //Update page
    this.setState({ selectedItem: value, currentPage: 1 });
  };

  componentDidMount() {
    this.getStores();
  }
  //Get data
  getStores = () => {
    $.ajax({
      //AJAX Request
      type: "GET",
      url: "Stores/GetStore",
      dataType: "json",
      success: (res) => {
        //console.log(data);
        this.setState({ data: res });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      },
    });

    //console.log(this.state.data);
  };
  //When page number gets changed
  onPageChange = (event, data) => {
    //Get updated data
    this.getStores();
    //Set active page
    this.setState({
      currentPage: data.activePage,
    });
  };

  render() {
    let stores = this.state.data;
    let entries = this.state.selectedItem;

    //Calculating total pages
    this.totalpages = parseInt(stores.length / entries);
    if (stores.length % entries !== 0) {
      this.totalpages++;
    }
    //Calculate number of entries to show
    let skip = 0;
    skip = entries * (this.state.currentPage - 1);

    let start = skip + 1;
    let end = skip + entries;

    if (end > stores.length) {
      end = stores.length;
    }
    //Truncate stores according to number of entries

    stores = stores.slice(start - 1, end);

    return (
      <div id="container">
        <div>
          {/* Create Button */}

          <CreateStore
            buttonText="New Store"
            getDataCallCreate={this.getStores}
          />
          <br />
          <br />
        </div>
        {/* Data Table */}

        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* Mapping Stores Data */}
            {stores.map((store) => {
              return (
                <Table.Row key={store.id.toString()}>
                  <Table.Cell>{store.name}</Table.Cell>
                  <Table.Cell>{store.address}</Table.Cell>
                  <Table.Cell>
                    {/* Edit Button */}
                    <EditStore
                      editData={store}
                      getDataCallEdit={this.getStores}
                    ></EditStore>
                  </Table.Cell>
                  <Table.Cell>
                    {/* Delete Button */}
                    <DeleteStore
                      deleteID={store.id}
                      getDataCallDelete={this.getStores}
                    ></DeleteStore>
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
