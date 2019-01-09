import React from 'react'
import moment from 'moment'


export default function DisplayLead({ data }) {
  return <tr>
    {console.log(data)}
    {data.confirmed ? <td className="text-center">
      <i className="fas fa-lg fa-grin-beam text-warning" />
    </td> : data.sms ? <td className="text-center">
      <i className="fas fa-lg fa-comment-alt text-success" />
    </td> : <td className="text-center">
          <i className="fas fa-lg fa-calendar text-primary" />
        </td>}
    <td>{data.cFirstName}</td>
    <td>{data.cLastName}</td>
    <td>{data.parent.pFirstName}</td>
    <td>{data.parent.pLastName}</td>
    <td>{moment(data.trialDate).format("MM/DD/YYYY")}</td>
    <td>{data.classTrying.nameOfClass}</td>
    <td>{moment(data.classTrying.time, "HH:mm").format("h:mm A")}</td>
    <td>
      <a href={`/admin/leads/${data.parent._id}`} className="btn btn-success btn-sm">
        View
          </a>
    </td>
  </tr>;

}