import React, { Component, Fragment } from 'react'
import NavBar from '../components/Navbar';
import MessageBubble from '../components/messageBubble'
import API from "../utils/API";
import moment from 'moment'
import './admin.css';




export default class LeadView extends Component {
    constructor() {
        super()
        this.state = {
            result: ''
        }
    }

    componentWillMount = () => {
        const { id } = this.props.match.params
        API.getOneLead(id).then(result => {
            if (result.data.length) {
                this.setState({ result: result.data[0] })
            }

        }
        )
    }

    render() {

        const values = this.state.result
        console.log(typeof values);
        if (this.state.result !== '') {
            const formatSchedule = values.classTrying.schedule.map(day => moment().day(day).format('ddd '))
            // if (values.messages.length > 0) {
            //     const messages = values.messages.map(message => { return <MessageBubble data={message} /> })
            // }
            let messages = []
            values.messages.length > 1 ? messages = values.messages.map(message => { return <MessageBubble data={message} /> }) : messages = [];

            return (
                <Fragment>
                    <NavBar />
                    {console.log(values)}
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header  text-uppercase bg-dark pt-3 text-white"><h4>Contact Information</h4></div>
                                    <div className="card-body">
                                        <table className="table w-100">
                                            <tbody>
                                                <tr>
                                                    <td className="border-top-0">Parent's Name: </td>
                                                    <td className="border-top-0">{`${values.pFirstName} ${values.pLastName}`}</td>
                                                </tr>
                                                <tr>
                                                    <td>Child's Name: </td>
                                                    <td>{`${values.cFirstName} ${values.cLastName}`}</td>
                                                </tr>
                                                <tr>
                                                    <td>Child's Age: </td>
                                                    <td>{values.age}</td>
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

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header  text-uppercase bg-dark pt-3 text-white"><h4>Class Trying</h4></div>
                                    <div className="card-body">
                                        <table className="table w-100">
                                            <tbody>
                                                <tr>
                                                    <td className="border-top-0">Class Name: </td>
                                                    <td className="border-top-0">{values.classTrying.nameOfClass}</td>
                                                </tr>
                                                <tr>
                                                    <td>Schedule: </td>
                                                    <td>{formatSchedule}</td>
                                                </tr>
                                                <tr>
                                                    <td>Age Group:</td>
                                                    <td>{`${values.classTrying.min} to ${values.classTrying.max}`}</td>
                                                </tr>
                                                <tr>
                                                    <td>Time:</td>
                                                    <td>{moment(values.classTrying.time, 'HH:mm').format('h:mm A')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Trial Date:</td>
                                                    <td>{values.trialDate}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between text-uppercase bg-dark pt-3 text-white"><h4>Messages</h4><button className="btn btn-success">Send a message</button></div>
                                    <div className="card-body">
                                        {/* <div className="d-flex flex-row-reverse">
                                            <div className="message bg-primary mb-2 p-1 d-flex justify-content-between">
                                                <p className="pt-3 text-white ml-3">Hello Manuel, Just a reminder your free trial class for Elliana is tomorrow at 5:30PM</p>
                                                <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i>
                                            </div>
                                        </div>
                                        <div className="message bg-success  p-1 mb-2 d-flex justify-content-between">
                                            <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i>
                                            <p className="pt-3 mr-3 text-white">Ok, Great. Thank you!</p>
                                        </div>
                                        <div className="d-flex flex-row-reverse">
                                            <div className="message bg-primary p-1 d-flex justify-content-between">
                                                <p className="pt-3 text-white ml-3"> You're welcome. See you here!</p>
                                                <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i>
                                            </div>
                                        </div> */}
                                        {messages}

                                    </div>
                                    <div className="card-footer bg-transparent">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Message" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                            <div class="input-group-append">
                                                <button class="btn btn-success" type="button" id="button-addon2">Send</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment >
            )
        } else {
            return (
                <Fragment>
                    <NavBar />
                    <div className="container text-center">
                        <img className="my-auto" src="/loading.gif" alt="Loading" />
                    </div>
                </Fragment>
            )
        }
    }
}