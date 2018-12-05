import React from 'react'
import moment from 'moment'

export default function Confirmation(props) {
    const { nameOfClass, cFirstName, cellPhone, date, time } = props
    return (
        <div>

            <h1>Confirmation Page</h1>
            <h1>Thank for registering {cFirstName} for a free trial class!</h1>
            <h2>{cFirstName} is set to try our {nameOfClass} class on {moment(date, 'MM/DD/YYYY').format("dddd, MMMM Do YYYY")} at {moment(time, 'HH:mm').format('h:mm A')}</h2>
            <h2>We will be sending you a text message reminder to: {cellPhone} the day before</h2>

        </div>
    )
}
