import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class ChildForm extends Component {

    continue = e => {
        e.preventDefault()
        this.props.nextStep();
    }

    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="form">
                <Typography component="h2" variant="h2" gutterBottom>
                    Future Dancer's Information
                </Typography>
                <TextField
                    label="Child's First Name"
                    name="cFirstName"
                    onChange={handleChange}
                    defaultValue={values.cFirstName}
                    errorText="error"
                    fullWidth
                    margin="normal"
                />
                <br />
                <TextField
                    label="Child's Last Name"
                    name="cLastName"
                    onChange={handleChange}
                    defaultValue={values.cLastName}
                    fullWidth
                    margin="normal"
                />
                <br />
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="age-simple">Age</InputLabel>
                    <Select
                        value={values.age}
                        onChange={handleChange}
                        inputProps={{
                            name: 'age',
                        }}
                        style={styles.TextField}
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={17}>17</MenuItem>

                    </Select>
                </FormControl>

                <br />

                {/* <FormControl error aria-describedby="component-error-text" fullWidth margin="normal">
                <InputLabel htmlFor="component-error">Name</InputLabel>
                <Input id="component-error" value={values.cellPhone} onChange={handleChange} name="cellPhone" />
                <FormHelperText id="component-error-text">Error</FormHelperText>
            </FormControl> */}
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.previousStep}
                    margin="normal">
                    Go Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.continue}
                    margin="normal">
                    Continue
                </Button>

            </div >
        )
    }
}

const styles = {

    // TextField: {
    //     marginTop: '15px',
    //     marginBottom: '15px'
    // }
}

export default ChildForm
