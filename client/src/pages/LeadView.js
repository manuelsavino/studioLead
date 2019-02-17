import React, { Component, Fragment } from "react";
import NavBar from "../components/admin/Navbar";
import MessageBubble from "../components/admin/messageBubble";
import Note from "../components/admin/note";
import API from "../utils/API";
import moment from "moment";
import "./admin.css";
import DisplayLead from "../components/admin/displayLead";
import MyModal from "../components/generalUi/modal";
import { Spinner } from "reactstrap";

import { connect } from "react-redux";
// import { loginUser } from "../actions/authActions";

export class LeadView extends Component {
  constructor() {
    // this.handleChange = this.handleChange.bind(this);
    super();
    this.state = {
      result: "",
      message: "",
      note: "",
      modal: false,
      modalOptions: {
        modalType: "",
        modalTitle: "",
        modalBody: "",
        modalAction: "",
        modalActionText: ""
      }
    };
  }

  getLeadData() {
    const { id } = this.props.match.params;
    API.getOneParent(id).then(result => {
      if (result.data.length) {
        this.setState({ result: result.data[0] });
      }
    });
  }

  componentWillMount() {
    setInterval(() => this.getLeadData, 30000);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.getLeadData();
  }

  handleChange = event => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      this.setState({
        [name]: false
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSend = () => {
    const { parentCellphone, _id } = this.state.result;
    const messageData = {
      to: parentCellphone,
      body: this.state.message,
      id: _id
    };

    API.sendSms(messageData).then(resp => {
      console.log(resp);
      this.setState({ message: "" });
      this.getLeadData();
    });
  };

  handleCallClick = () => {
    this.setState({
      modal: !this.state.modal
    });
    const { parentCellphone } = this.state.result;
    API.call(parentCellphone);
  };

  handleNewNote = () => {
    let data = {
      id: this.state.result._id,
      body: this.state.note
    };
    API.writeNote(data).then(note => {
      this.setState({ note: "" });
      this.getLeadData();
    });
  };

  handleModalForCall = () => {
    this.setState({
      modal: !this.state.modal,
      modalOptions: {
        modalBody: "Are you sure you want to call?",
        modalTitle: "Call Confirmation",
        modalActionText: "Yes",
        modalAction: this.handleCallClick
      }
    });
  };

  handleModalClose = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const values = this.state.result;

    if (this.state.result !== "") {
      let calls = [];
      values.calls.length > 0
        ? (calls = values.calls.map(call => {
            return (
              <tr key={call._id}>
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
        <DisplayLead key={child._id} child={child} />
      ));

      const notes = values.notes.map(note => (
        <Note key={note._id} data={note} />
      ));

      return (
        <Fragment>
          <MyModal
            handleModal={this.handleModalClose}
            modalAction={this.state.modalAction}
            isOpen={this.state.modal}
            modalBody={this.state.modalBody}
            modalTitle={this.state.modalTitle}
            modalOptions={this.state.modalOptions}
            modalActionText={this.state.modalActionText}
          />

          <NavBar />
          <div className="container mt-2">
            <div className="row d-flex align-items-stretch">
              {/* Contact Info Start */}
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card">
                  <div className="card-header d-flex  justify-content-between bg-dark pt-3 text-white">
                    <h4 className="text-uppercase">
                      Contact Information <i className="fas fa-info" />
                    </h4>
                    <h5>
                      <i className="fas fa-pencil-alt" /> Edit{" "}
                    </h5>
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table">
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
                      onClick={this.handleModalForCall}
                      className="btn btn-primary shadow-sm"
                    >
                      Call <i className="fas fa-phone" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Contact Info End */}

              {/* Childre Start */}
              <div className="col-md-12 col-sm-12 col-lg-6">
                <div className="card">
                  <div className="card-header  text-uppercase bg-dark pt-3 text-white">
                    <h4>
                      Children <i className="fas fa-child" />
                    </h4>
                  </div>
                  <div className="card-body d-flex">{children}</div>
                </div>
              </div>
              {/* Children end */}
              {/* Messages Start */}
              <div className="col-md-12 col-sm-12 col-lg-6 mt-4">
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
              <div className="col-md-6 col-sm-12 mt-4">
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
                {/* Calls end */}
                {/* Notes Start */}
                <div className="card mt-3">
                  <div className="card-header d-flex justify-content-between text-uppercase bg-dark pt-3 text-white">
                    <h4>
                      Notes <i className="fas fa-sticky-note" />
                    </h4>
                  </div>
                  <div className="card-body">
                    {notes}
                    <div className="form-group">
                      <textarea
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        name="note"
                        value={this.state.note}
                        placeholder="Note text goes here..."
                      />
                    </div>
                    <button
                      onClick={this.handleNewNote}
                      className="btn btn-primary shadow-sm"
                    >
                      Submit Note
                    </button>
                  </div>
                </div>
              </div>
              {/* Notes end */}
            </div>
            {/*Ends Row*/}
          </div>
          {/*Ends Container*/}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <NavBar />
          <div className="container text-center">
            {/* <img className="my-auto" src="/loading.gif" alt="Loading" /> */}
            <Spinner
              className="mt-5"
              style={{ width: "10rem", height: "10rem" }}
              color="primary"
              type="grow"
            />
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
