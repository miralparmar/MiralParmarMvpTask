import React, { Component } from "react";
import $ from "jquery";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { Dropdown } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import { Table } from "semantic-ui-react";

export default class AllProducts extends Component {
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
    this.getProducts();
    //Update page
    this.setState({ selectedItem: value, currentPage: 1 });
  };

  componentDidMount() {
    this.getProducts();
  }

  //Get data
  getProducts = () => {
    //AJAX Request
    $.ajax({
      type: "GET",
      url: "Products/GetProduct",
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
    this.getProducts();
    //Set active page
    this.setState({
      currentPage: data.activePage,
    });
  };

  render() {
    let products = this.state.data;
    let entries = this.state.selectedItem;

    //Calculating total pages
    this.totalpages = parseInt(products.length / entries);
    if (products.length % entries !== 0) {
      this.totalpages++;
    }

    //Calculate number of entries to show
    let skip = 0;
    skip = entries * (this.state.currentPage - 1);

    let start = skip + 1;
    let end = skip + entries;

    if (end > products.length) {
      end = products.length;
    }
    //Truncate products according to number of entries
    products = products.slice(start - 1, end);

    return (
      <div id="container">
        <div>
          {/* Create Button */}
          <CreateProduct
            buttonText="New Product"
            getDataCallCreate={this.getProducts}
          />
          <br />
          <br />
        </div>
        {/* Data Table */}
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* Mapping Products Data */}
            {products.map((product) => {
              return (
                <Table.Row key={product.id.toString()}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>${product.price}</Table.Cell>
                  <Table.Cell>
                    {/* Edit Button */}
                    <EditProduct
                      editData={product}
                      getDataCallEdit={this.getProducts}
                    ></EditProduct>
                  </Table.Cell>
                  <Table.Cell>
                    {/* Delete Button */}
                    <DeleteProduct
                      deleteID={product.id}
                      getDataCallDelete={this.getProducts}
                    ></DeleteProduct>
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
