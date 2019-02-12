import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      userName: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin");
    }
  }

  render() {
    return (
      <Fragment>
        <div
          className="container mt-5 d-flex justify-content-center align-middle"
          //   style={{height: '100vh'}}
        >
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username"
                    name="username"
                    onChange={this.onChange}
                    value={this.state.username}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </div>

                <button onClick={this.onSubmit} className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
