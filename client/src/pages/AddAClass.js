import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import API from '../utils/API'

export default class AddAClass extends Component {
    state = {
        nameOfClass: '',
        ageGroup: '',
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        time: '',
        numberOfOpenings: ''
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


        const { nameOfClass, numberOfOpenings, time, ageGroup, } = this.state
        const classData = {
            nameOfClass,
            numberOfOpenings,
            time,
            ageGroup,
            schedule
        }

        API.createClass(classData).then(console.log("done"))


    }


    render() {
        return (
            <div>
                <div className="container">
                    <Typography component="h2" variant="h2" gutterBottom>
                        Add a class
                </Typography>
                    <TextField
                        label="Name Of Class"
                        name="nameOfClass"
                        onChange={this.handleChange}
                        // defaultValue={values.pFirstName}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="age-simple">Age Group</InputLabel>
                        <Select
                            value={this.state.ageGroup}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'ageGroup',
                            }}
                        // style={styles.TextField}
                        >
                            <MenuItem value={'3-4'}>3-4</MenuItem>
                            <MenuItem value={'5-6'}>5-6</MenuItem>
                            <MenuItem value={'7-9'}>7-9</MenuItem>
                            <MenuItem value={'10-12'}>10-12</MenuItem>
                            <MenuItem value={'13-17'}>13-17</MenuItem>

                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormLabel component="legend">Days</FormLabel>
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('monday')}
                                value="monday"
                                color="primary"
                            />
                        }
                        label="Monday   "
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('tuesday')}
                                value="tuesday"
                                color="primary"
                            />
                        }
                        label="Tuesday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('wednesday')}
                                value="wednesday"
                                color="primary"
                            />
                        }
                        label="Wednesday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('thursday')}
                                value="thursday"
                                color="primary"
                            />
                        }
                        label="Thursday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('friday')}
                                value="friday"
                                color="primary"
                            />
                        }
                        label="Friday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('saturday')}
                                value="saturday"
                                color="primary"
                            />
                        }
                        label="Saturday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={this.state.checkedB}
                                onChange={this.handleCheckBoxChange('sunday')}
                                value="sunday"
                                color="primary"
                            />
                        }
                        label="Sunday"
                    />
                    <br />
                    <br />
                    <FormLabel component="legend">Time</FormLabel>
                    <TextField
                        id="time"
                        type="time"
                        defaultValue="07:30"
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                        name="time"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                    <br />


                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleFormSubmit}
                        margin="normal">
                        Continue
                </Button>
                </div >
            </div>
        )
    }
}
