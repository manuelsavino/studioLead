import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin");
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <Fragment>
        <div
          className="container mt-5 d-flex justify-content-center align-middle"
          //   style={{height: '100vh'}}
        >
          <div className="card">
            {console.log(this.props.errors)}
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User Name</label>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.username
                    })}
                    aria-describedby="emailHelp"
                    placeholder="Enter Username"
                    name="username"
                    onChange={this.onChange}
                    value={this.state.username}
                  />
                  {errors && (
                    <div className="invalid-feedback">
                      Incorrect username or password
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />

                  {errors && (
                    <div className="invalid-feedback">
                      Incorrect username or Password
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
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

Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
