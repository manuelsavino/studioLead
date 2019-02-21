import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function LeadRow({ data }) {
  return (
    <tr>
      {data.confirmed ? (
        <td className="text-center">
          <i className="fas fa-lg fa-grin-beam text-warning" />
        </td>
      ) : data.sms ? (
        <td className="text-center">
          <i className="fas fa-lg fa-comment-alt text-success" />
        </td>
      ) : (
        <td className="text-center">
          <i className="fas fa-lg fa-calendar text-primary" />
        </td>
      )}
      <td>{`${data.cFirstName} ${data.cLastName}`}</td>
      <td>{`${data.parent.pFirstName} ${data.parent.pLastName}`}</td>
      <td>{moment(data.trialDate).format("MM/DD/YYYY")}</td>
      <td>{data.classTrying.nameOfClass}</td>
      <td>{moment(data.classTrying.time, "HH:mm").format("h:mm A")}</td>
      <td className="border-0">
        <Link to={`/admin/leads/${data.parent._id}`}>
          <Button color="info">View</Button>
        </Link>
      </td>
    </tr>
  );
}
