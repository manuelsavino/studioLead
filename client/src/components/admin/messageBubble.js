import React, { Fragment } from "react";
import moment from "moment";
import classname from "classnames";

export default function MessageBubble({ data }) {
  return (
    <Fragment>
      <div
        className={classname({
          "d-flex flex-row-reverse":
            data.from === "7867893310" ||
            data.from === "+17867893310" ||
            data.callType
        })}
      >
        <small className="text-muted">
          {moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss A")}
        </small>
      </div>
      <div
        className={classname({
          "d-flex flex-row-reverse":
            data.from === "7867893310" ||
            data.from === "+17867893310" ||
            data.callType
        })}
      >
        <div
          className={classname(
            "shadow mb-2 p-1 d-flex justify-content-between",
            {
              "call-bubble-out bg-warning": data.callType === "Outgoing",
              "speech-bubble-out bg-primary":
                data.from === "7867893310" || data.from === "+17867893310",
              "speech-bubble-in bg-success":
                data.from != undefined && data.from != "7867893310"
            }
          )}
        >
          {console.log(data.from)}
          {data.body ? (
            <p className="pt-3 text-white mx-3">{data.body}</p>
          ) : (
            <p className="pt-3 text-white mx-3">
              {" "}
              <i className="fas fa-phone fa-lg" /> Out Going Call
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
}
