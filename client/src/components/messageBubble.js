import React from 'react'
import moment from 'moment'


export default function MessageBubble({ data }) {
    console.log(data.from)
    if (data.from === '7867893310') {
        return (
            <div className="d-flex flex-row-reverse">
                <div className="message bg-primary mb-2 p-1 d-flex justify-content-between">
                    <p className="pt-3 text-white ml-3">{data.body}</p>
                    <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="message bg-success  p-1 mb-2 d-flex justify-content-between">
                <i class="fas fa-user p-4 rounded-circle bg-dark text-white"></i>
                <p className="pt-3 mr-3 text-white">{data.body}</p>
            </div>
        )
    }

}