import React, { Component, Fragment } from "react";
import NavBar from "../components/Navbar";
import MessageBubble from "../components/messageBubble";
import API from "../utils/API";
import moment from "moment";
import "./admin.css";

import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

export class LeadView extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      message: "",
      callResp: "",
      test: false
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    setInterval(() => {
      API.getOneParent(id).then(result => {
        if (result.data.length) {
          this.setState({ result: result.data[0] });
        }
      });
    }, 30000);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    const { id } = this.props.match.params;
    API.getOneParent(id).then(result => {
      if (result.data.length) {
        this.setState({ result: result.data[0] });
        console.log("Nothing?", this.state.result);
      }
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSend = () => {
    const { parentCellphone, _id } = this.state.result;
    const messageData = {
      to: parentCellphone,
      body: this.state.message,
      id: _id
    };

    API.sendSms(messageData).then(resp => {
      setTimeout(() => {
        this.setState({ message: "" });
        this.componentDidMount();
      }, 1000);
    });
  };

  handleCallClick = () => {
    const { parentCellphone } = this.state.result;
    API.call(parentCellphone);
  };

  render() {
    const values = this.state.result;

    if (this.state.result !== "") {
      // const formatSchedule = values.classTrying.schedule.map(day => moment().day(day).format('ddd '))

      let calls = [];
      values.calls.length > 0
        ? (calls = values.calls.map(call => {
            return (
              <tr>
                <td>{call.callType}</td>
                <td>{moment(call.date).format("ddd, MMM Do YY, h:mm:ss a")}</td>
              </tr>
            );
          }))
        : (calls = []);

      let messages = [];
      values.messages.length > 0
        ? (messages = values.messages.map(message => {
            return <MessageBubble key={message._id} data={message} />;
          }))
        : (messages = []);

      const children = values.children.map(child => (
        <tr>
          <td>{`${child.cFirstName} ${child.cLastName}`}</td>
          <td>{child.classTrying.nameOfClass}</td>
          <td>{child.age}</td>
          <td>{moment(child.classTrying.time, "HH:mm").format("h:mm A")}</td>
          <td>{child.trialDate}</td>
        </tr>
      ));
      return (
        <Fragment>
          <NavBar />
          <div className="container mt-2">
            <div className="row">
              {/* Contact Info Start */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header d-flex  justify-content-between bg-dark pt-3 text-white">
                    <h4 className="text-uppercase">
                      Contact Information <i className="fas fa-info" />
                    </h4>
                    <h5>
                      <i className="fas fa-pencil-alt" /> Edit{" "}
                    </h5>
                  </div>
                  <div className="card-body">
                    <table className="table w-100">
                      <tbody>
                        <tr>
                          <td className="border-top-0">Parent's Name: </td>
                          <td className="border-top-0">{`${values.pFirstName} ${
                            values.pLastName
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Cell Phone: </td>
                          <td>{values.parentCellphone}</td>
                        </tr>
                        <tr>
                          <td>Email: </td>
                          <td>{values.email}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      onClick={this.handleCallClick}
                      className="btn btn-primary"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
              {/* Contact Info End */}

              {/* Childre Start */}
              <div className="col-md-12 mt-4">
                <div className="card">
                  <div className="card-header  text-uppercase bg-dark pt-3 text-white">
                    <h4>
                      Children <i className="fas fa-child" />
                    </h4>
                  </div>
                  <div className="card-body">
                    <table className="table w-100">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Class Name</th>
                          <th scope="col">Age</th>
                          <th scope="col">Time</th>
                          <th scope="col">Trial Date</th>
                        </tr>
                      </thead>
                      <tbody>{children}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Children end */}
              {/* Messages Start */}
              <div className="col-md-6 mt-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between text-uppercase bg-dark pt-3 text-white">
                    <h4>
                      Messages <i className="fas fa-sms" />
                    </h4>
                  </div>
                  <div className="card-body">{messages}</div>
                  <div className="card-footer p-1 bg-transparent">
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control"
                        name="message"
                        placeholder="Message"
                        value={this.state.message}
                        maxLength="140"
                        onChange={this.handleChange}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-success"
                          onClick={this.handleSend}
                          type="button"
                          id="button-addon2"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Messages end */}
              {/* Calls Start */}
              <div className="col-md-6 mt-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between text-uppercase bg-dark pt-3 text-white">
                    <h4>
                      Calls <i className="fas fa-phone" />
                    </h4>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Type</th>
                          <th scope="col">Date and Time</th>
                        </tr>
                      </thead>
                      <tbody>{calls}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Calls end */}
              {/* 
              <div className="col-md-6 mt-4">
                <div className="card">
                  <div className="card-header text-uppercase bg-dark pt-3 text-white">
                    <h4>
                      Actions <i className="fas fa-toggle-on" />
                    </h4>
                  </div>
                  <div className="card-body">
                     <label class="switch">
                                        <input type="checkbox" value={!values.signedUp} />
                                        <span class="slider round"></span>
                                    </label> 

                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={this.handleChange}
                        name="test"
                        checked={this.state.test}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <NavBar />
          <div className="container text-center">
            <img className="my-auto" src="/loading.gif" alt="Loading" />
          </div>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LeadView);
