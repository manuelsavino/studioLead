import React, { Component, Fragment } from "react";
import Navbar from "../components/admin/Navbar";
import API from "../utils/API";
import LeadRow from "../components/admin/LeadRow";
import "./lead.css";
import { connect } from "react-redux";
import moment from "moment";
import { Container, Card, CardHeader, CardBody } from "reactstrap";

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
      <LeadRow key={lead._id} data={lead} />
    ));

    const quickView = this.state.results
      .filter(lead => {
        let leadDate = moment(lead.trialDate).format("MM/DD/YYYY");
        let today = moment(Date.now()).format("MM/DD/YYYY");
        return leadDate === today;
      })
      .map(lead => <LeadRow key={lead._id} data={lead} />);

    return (
      <Fragment>
        <Navbar />
        <Container className="mt-3">
          <Card>
            <CardHeader
              tag="h4"
              className="text-uppercase bg-success text-light"
            >
              Today's Trials <i className="fas fa-calendar-day" />
            </CardHeader>
            <CardBody>
              <table className="table w-100">
                <thead>
                  <tr>
                    <td>Status</td>
                    <td>Student First Name</td>
                    <td>Student Last Name</td>
                    <td>Parent First Name</td>
                    <td>Parent Last Name</td>
                    <td>Date</td>
                    <td>Class</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>{quickView}</tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mt-4">
            <CardHeader tag="h4" className="text-uppercase bg-dark text-light">
              All Leads <i className="fas fa-users" />
            </CardHeader>
            <CardBody>
              <table className="table w-100">
                <thead>
                  <tr>
                    <td>Status</td>
                    <td>Student First Name</td>
                    <td>Student Last Name</td>
                    <td>Parent First Name</td>
                    <td>Parent Last Name</td>
                    <td>Date</td>
                    <td>Class</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>{leads}</tbody>
              </table>
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Admin);
