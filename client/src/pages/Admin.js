import React, { Component, Fragment } from "react";
import Navbar from "../components/admin/Navbar";
import API from "../utils/API";
import DisplayLead from "../components/admin/displayLead";
import "./lead.css";
import { connect } from "react-redux";
import moment from "moment";

export class Admin extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      loading: true
    };
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      API.getLeads().then(results => {
        this.setState({ results: results.data, loading: false });
      });
    }
  }

  render() {
    // console.log(this.state.results)
    const leads = this.state.results.map(lead => (
      <DisplayLead key={lead._id} data={lead} />
    ));

    const quickView = this.state.results
      .filter(lead => {
        let leadDate = moment(lead.trialDate).format("MM/DD/YYYY");
        let today = moment(Date.now()).format("MM/DD/YYYY");
        return leadDate === today;
      })
      .map(lead => <DisplayLead key={lead._id} data={lead} />);

    return (
      <Fragment>
        <Navbar />
        <div className="container mt-3">
          <div className="card">
            <div className="card-header  text-uppercase bg-success pt-3 text-white">
              <h4>
                Today's Trials <i className="fas fa-calendar-day" />
              </h4>
            </div>
            <div className="card-body">
              {quickView.length ? ( //If there are items in the quickview array, display them
                <table className="table w-100">
                  <thead>
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Student First Name</th>
                      <th scope="col">Student Last Name</th>
                      <th scope="col">Parent First Name</th>
                      <th scope="col">Parent Last Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Class</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>{quickView}</tbody>
                </table>
              ) : this.state.loading ? ( //
                <div className="text-center">
                  <img className="my-auto" src="./loading.gif" alt="Loading" />
                </div>
              ) : (
                <h1>No Trials for today :(</h1>
              )}
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header  text-uppercase bg-dark pt-3 text-white">
              <h4>
                All Leads <i className="fas fa-users" />
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Student First Name</th>
                    <th scope="col">Student Last Name</th>
                    <th scope="col">Parent First Name</th>
                    <th scope="col">Parent Last Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Class</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>{leads}</tbody>
              </table>
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
export default connect(mapStateToProps)(Admin);
