import React from 'react'
import moment from 'moment'


export default function DisplayLead({ data }) {
    return (
        <tr>
            <th scope="row">{data.cFirstName}</th>
            <td>{data.cLastName}</td>
            <td>{data.pFirstName}</td>
            <td>{data.pLastName}</td>
            <td>{moment(data.trialDate).format('MM/DD/YYYY')}</td>
            <td>{data.classTrying.nameOfClass}</td>
            <td>{moment(data.classTrying.time, "HH:mm").format("h:mm A")}</td>
            <td><a href="#" className="btn btn-success btn-sm">View</a></td>
        </tr >
    )
}