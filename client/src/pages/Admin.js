import React, { Component, Fragment } from "react";
import Navbar from "../components/admin/Navbar";
import API from "../utils/API";
import LeadRow from "../components/admin/LeadRow";
import "./lead.css";
import { connect } from "react-redux";
import moment from "moment";
import { Container, Card, CardHeader, CardBody, Table } from "reactstrap";

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

  // componentWillUpdate() {
  //   if (!this.props.auth.isAuthenticated) {
  //     this.props.history.push("/login");
  //   } else {
  //     API.getLeads().then(results => {
  //       this.setState({ results: results.data, loading: false });
  //     });
  //   }
  // }

  render() {
    // console.log(this.state.results)
    const leads = this.state.results
      .filter(lead => {
        return lead.signedUp === false && lead.triedClass === false;
      })
      .map(lead => <LeadRow key={lead._id} data={lead} />);

    const quickView = this.state.results
      .filter(lead => {
        let leadDate = moment(lead.trialDate).format("MM/DD/YYYY");
        let today = moment(Date.now()).format("MM/DD/YYYY");
        return leadDate === today;
      })
      .map(lead => <LeadRow key={lead._id} data={lead} />);

    const followUp = this.state.results
      .filter(lead => {
        return lead.triedClass === true && lead.signedUp === false;
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
            <CardBody
              inverse
              style={{ backgroundColor: "#343A40", borderColor: "#333" }}
            >
              <Table
                dark
                responsive
                hover
                borderless
                className="text-white w-100 text-center"
              >
                <thead>
                  <tr>
                    <td>Status</td>
                    <td>Student</td>
                    <td>Parent</td>
                    <td>Trial Date</td>
                    <td>Class</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>{quickView}</tbody>
              </Table>
            </CardBody>
          </Card>

          <Card className="mt-4">
            <CardHeader
              tag="h4"
              className="text-uppercase bg-warning text-light"
            >
              Follow Up <i className="fas fa-user-clock" />
            </CardHeader>
            <CardBody
              inverse
              style={{ backgroundColor: "#343A40", borderColor: "#333" }}
            >
              <Table
                borderless
                dark
                hover
                responsive
                className="text-white w-100 text-center"
              >
                <thead>
                  <tr>
                    <td>Status</td>
                    <td>Student</td>
                    <td>Parent</td>
                    <td>Trial Date</td>
                    <td>Class</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>{followUp}</tbody>
              </Table>
            </CardBody>
          </Card>

          <Card className="mt-4">
            <CardHeader
              tag="h4"
              className="text-uppercase bg-primary text-light"
            >
              Up Coming Trials <i className="fas fa-users" />
            </CardHeader>
            <CardBody
              inverse
              style={{ backgroundColor: "#343A40", borderColor: "#333" }}
            >
              <Table
                dark
                hover
                borderless
                responsive
                className="text-white w-100 text-center"
              >
                <thead>
                  <tr>
                    <td>Status</td>
                    <td>Student</td>
                    <td>Parent</td>
                    <td>Trial Date</td>
                    <td>Class</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>{leads}</tbody>
              </Table>
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
