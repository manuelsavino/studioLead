import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/API';

export default class AddAClass extends Component {
    state = {
        nameOfClass: '',
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        time: '17:00',
        min: 1,
        max: 1
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleCheckBoxChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    onChange = (event) => {
        const { name, value } = event.target;
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(event.target.value)) {
            this.setState({ [name]: value })
        }
    }

    dec = (event) => {
        const { name } = event.target;
        event.preventDefault()
        if (this.state.min > 0 && this.state.max > 0) {
            if (this.state.max  <= this.state.min) {
                this.setState(
                    { [name]: this.state[name] + 1, min: this.state.min -1 }
                )
            }
            this.setState(
                { [name]: this.state[name] - 1 }
            )
        }
    }

    inc = (event) => {
        const { name } = event.target;
        event.preventDefault()
        if(this.state.min + 1 >= this.state.max)
        {
            this.setState(
                { [name]: this.state[name] + 1, max: this.state.min +2 }
            )
        }
        this.setState(
            { [name]: this.state[name] + 1 }
        )
    }


    handleFormSubmit = e => {
        e.preventDefault()
        const schedule = [];
        if (this.state.monday) {
            schedule.push(1)
        }
        if (this.state.tuesday) {
            schedule.push(2)
        }
        if (this.state.wednesday) {
            schedule.push(3)
        }
        if (this.state.thursday) {
            schedule.push(4)
        }
        if (this.state.friday) {
            schedule.push(5)
        }
        if (this.state.saturday) {
            schedule.push(6)
        }
        if (this.state.sunday) {
            schedule.push(7)
        }


        const { nameOfClass, time, min, max } = this.state
        const classData = {
            nameOfClass,
            time,
            min,
            max,
            schedule
        }

        API.createClass(classData).then(console.log("done"))
    }


    render() {
        return (
            <Fragment>
                <Navbar />
                <div className="container">
                <div className="card">
                        <div className="card-body">

                    <h2 className="display-4">Add a class</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name of Class" maxLength="20" name="nameOfClass" onChange={this.handleChange} />
                        </div>
                                <label className="d-block">Days</label>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="monday" value="option1" onChange={this.handleCheckBoxChange('monday')} />
                            <label className="form-check-label" htmlFor="monday">Monday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="tuesday" value="option2" onChange={this.handleCheckBoxChange('tuesday')} />
                            <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="wednesday" value="option1" onChange={this.handleCheckBoxChange('wednesday')} />
                            <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="thursday" value="option2" onChange={this.handleCheckBoxChange('thursday')} />
                            <label className="form-check-label" htmlFor="thursday">Thursday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="friday" value="option1" onChange={this.handleCheckBoxChange('friday')} />
                            <label className="form-check-label" htmlFor="friday">Friday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="saturday" value="option2" onChange={this.handleCheckBoxChange('saturday')} />
                            <label className="form-check-label" htmlFor="saturday">Saturday</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="sunday" value="option2" onChange={this.handleCheckBoxChange('sunday')} />
                            <label className="form-check-label" htmlFor="sunday">Sunday</label>
                        </div>
                        <div className="form-group">
                                    <label>Time</label>
                            <input type="time" className="form-control" value={this.state.time} name="time" onChange={this.handleChange} />
                        </div>

                        <div className="row">
                        <div className="col-md-6 col-sm-12">
                        <div className="input-group mb-3 mr-2 ">
                            <label>Minimum Age:</label>

                            <div className="input-group-prepend ml-2 ">
                                <button className="btn btn-outline-secondary" name="min" onClick={this.dec}>-</button>
                            </div>

                            <input type="text" className="form-control" value={this.state.min} />

                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" name="min" onClick={this.inc}>+</button>
                            </div>

                        </div>
                        </div>
                        <div className="col-md-6 col-sm-12">

                        <div className="input-group mb-3 ">
                            <label>Maximum Age:</label>

                            <div className="input-group-prepend ml-2">
                                <button className="btn btn-outline-secondary" name="max" onClick={this.dec}>-</button>
                            </div>

                            <input type="text" className="form-control" value={this.state.max} />

                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" name="max" onClick={this.inc}>+</button>
                            </div>
                        </div>
                        </div>
                        </div>
                    
                        <button className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                    </form>
                    </div>
                    </div>

                </div >
            </Fragment>
        )
    }
}
