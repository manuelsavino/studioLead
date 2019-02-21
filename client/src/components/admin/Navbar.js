import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "/login";
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-0 ">
        <a className="navbar-brand" href="#">
          <i className="fas fa-filter" />
          Studio Leads
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item py-4 text-center">
              <i className="material-icons">dashboard</i>
              <Link to={"/admin"} className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item  py-4 text-center">
              <i className="material-icons">class</i>
              <Link
                className="nav-link py-0"
                to={"/admin/classes"}
                className="nav-link"
              >
                Class Managment
              </Link>
            </li>

            <li className="nav-item  py-4 text-center">
              <i className="material-icons">contacts</i>
              <Link className="nav-link" to={"/admin/#"}>
                Parents
              </Link>
            </li>
            <li className="nav-item  py-4 text-center">
              <i className="material-icons">archive</i>
              <Link className="nav-link" to={"/admin/#"}>
                Lead Archive
              </Link>
            </li>
            <li className="nav-item  py-4 text-center">
              <i className="material-icons">show_chart</i>
              <Link className="nav-link" to={"/admin/#"}>
                Analytics
              </Link>
            </li>
            <li onClick={this.onLogoutClick} class="nav-item  py-4 text-center">
              <i class="material-icons">exit_to_app</i>
              <Link className="nav-link" to={"/admin/#"}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
