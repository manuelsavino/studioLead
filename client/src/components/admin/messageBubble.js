import React, { Fragment } from "react";
import moment from "moment";

export default function MessageBubble({ data }) {
  if (data.from === "7867893310" || data.from === "+17867893310") {
    return (
      <Fragment>
        <div className="d-flex flex-row-reverse">
          <small className="text-muted">
            {moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </small>
        </div>
        <div className="d-flex flex-row-reverse">
          <div className="speech-bubble-out shadow bg-primary mb-2 p-1 d-flex justify-content-between">
            <p className="pt-3 text-white mx-3">{data.body}</p>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div>
        <small className="text-muted">
          {moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </small>
        <div className="speech-bubble-in shadow bg-success  p-1 mb-2 d-flex justify-content-between">
          {/* <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i> */}
          <p className="pt-3 mx-3 text-white">{data.body}</p>
        </div>
      </div>
    );
  }
}
