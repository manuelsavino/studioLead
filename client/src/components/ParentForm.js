import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography'

import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};



class ParentForm extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep();
    }




    render() {

        const { values, handleChange } = this.props;

        return (
            <div className="container">
                <Typography component="h2" variant="h2" gutterBottom>
                    Your Information
                </Typography>
                <TextField
                    label="Parent First Name"
                    name="pFirstName"
                    onChange={handleChange}
                    defaultValue={values.pFirstName}
                    errorText="error"
                    fullWidth
                    margin="normal"
                />
                <br />
                <TextField
                    label="Parent Last Name"
                    name="pLastName"
                    onChange={handleChange}
                    defaultValue={values.pLastName}
                    fullWidth
                    margin="normal"
                />
                <br />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Email Address</InputLabel>
                    <Input
                        value={values.emailAddress}
                        onChange={handleChange}
                        name="emailAddress"
                    />

                </FormControl>
                <br />


                <FormControl fullWidth margin="normal">
                    <InputLabel >Cell Phone Number</InputLabel>
                    <Input

                        value={values.cellPhone}
                        onChange={handleChange}
                        id="formatted-text-mask-input"
                        inputComponent={TextMaskCustom}
                        name="cellPhone"
                    />
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
                    onClick={this.continue}
                    margin="normal">
                    Continue
                </Button>
            </div >
        )
    }
}

const styles = {

    TextField: {
        marginTop: '10px',
        marginBottom: '10px'
    }
}

export default ParentForm;
