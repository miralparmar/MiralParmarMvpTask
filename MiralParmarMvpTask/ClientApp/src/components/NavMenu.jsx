import React, { Component } from "react";
import { Navbar, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
       
        <Navbar className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <NavItem className="nav-item active">
              <NavLink tag={Link} className="nav-link" to="/">
                React
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavItem className="nav-item">
              <NavLink tag={Link} className="nav-link" to="/all-customers">
                Customers
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavItem className="nav-item">
              <NavLink tag={Link} className="nav-link" to="/all-products">
                Products
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavItem className="nav-item">
              <NavLink tag={Link} className="nav-link" to="/all-stores">
                Stores
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavItem className="nav-item">
              <NavLink tag={Link} className="nav-link" to="/all-sales">
                Sales
              </NavLink>
            </NavItem>
          </ul>
        </Navbar>
        <br />
        <br />
      </header>
    );
  }
}
