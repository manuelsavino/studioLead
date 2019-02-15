import React, { Component, Fragment } from "react";
import NavBar from "../components/admin/Navbar";
import MessageBubble from "../components/admin/messageBubble";
import Note from "../components/admin/note";
import API from "../utils/API";
import moment from "moment";
import "./admin.css";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MyModal from "../components/generalUi/modal";

import { connect } from "react-redux";
import { BindingContext } from "twilio/lib/rest/ipMessaging/v2/service/binding";
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
      modalTitle: "",
      modalBody: "",
      modalAction: "",
      checkbox: false
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
    const { id } = this.props.match.params;
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
    console.log(event.target.type);
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
      modalBody: "Are you sure you want to call?",
      modalTitle: "Call Confirmation",
      modalAction: this.handleCallClick
    });
  };

  handleModalForNote = () => {
    this.setState({
      modal: !this.state.modal,
      modalTitle: "New Note",
      modalBody: (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            name="note"
            value={this.state.note}
          />
        </div>
      ),
      modalAction: this.handleCallClick
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
        <tr key={child._id}>
          <td>{`${child.cFirstName} ${child.cLastName}`}</td>
          <td>{child.classTrying.nameOfClass}</td>
          <td className="d-md-none d-lg-table-cell">{child.age}</td>
          <td>{moment(child.classTrying.time, "HH:mm").format("h:mm A")}</td>
          <td>{child.trialDate}</td>
        </tr>
      ));

      const notes = values.notes.map(note => (
        <Note id={note._id} data={note} />
        // <p key={note._id} className="p-2 bg-warning shadow-sm text-white">
        //   {note.body}
        // </p>
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
                  <div className="card-body">
                    <table className="table w-100">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Class Name</th>
                          <th className="d-md-none d-lg-table-cell" scope="col">
                            Age
                          </th>
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
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked={this.state.checkbox}
                        onClick={this.handleChange}
                        name="checkbox"
                      />
                      <span class="slider round" />
                    </label>
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
