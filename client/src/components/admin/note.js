import React, { Fragment } from "react";
import moment from "moment";

export default function Note({ data }) {
  return (
    <Fragment>
      <div className="d-flex flex-row">
        <div className="shadow-sm bg-warning w-100 p-1 d-flex justify-content-start">
          <p className="pt-3 text-white mx-3">{data.body}</p>
        </div>
      </div>
      <div className="d-flex flex-row mb-2">
        <small className="text-muted">
          {moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss A")}
        </small>
      </div>
    </Fragment>
  );
}
