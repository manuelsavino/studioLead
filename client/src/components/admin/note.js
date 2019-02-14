import React, { Fragment } from "react";
import moment from "moment";

export default function Note({ data }) {
  return (
    <Fragment>
      <div className="d-flex flex-row">
        <div className="shadow-sm bg-warning p-1 d-flex justify-content-start">
          <p className="pt-3 text-white mx-3">{data.body}</p>
        </div>
      </div>
      <div className="d-flex flex-row mb-2">
        <small className="text-muted">
          {moment(data.date).format("MM/DD/YY, h:mm A")}
        </small>
      </div>
    </Fragment>
  );
}
