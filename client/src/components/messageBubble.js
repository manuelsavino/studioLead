import React from 'react'
// import moment from 'moment'


export default function MessageBubble({ data }) {
    if (data.from === '+17867893310') {
        return (
            <div className="d-flex flex-row-reverse">
                <div className="speech-bubble-out bg-primary mb-2 p-1 d-flex justify-content-between">
                    <p className="pt-3 text-white mx-3">{data.body}</p>
                    {/* <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i> */}
                </div>
            </div>
        )
    }
    else {
        return <div className="speech-bubble-in bg-success  p-1 mb-2 d-flex justify-content-between">
            {/* <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i> */}
            <p className="pt-3 mx-3 text-white">{data.body}</p>
          </div>;
    }

}