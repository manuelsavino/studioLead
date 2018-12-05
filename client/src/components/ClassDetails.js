import React from 'react'
import moment from 'moment'

export default function ClassDetails({ NameOfClass, schedule, time, next, id }) {
    const formatSchedule = schedule.map(day => moment().day(day).format('ddd '))

    return (
        <div className="card eachClass" onClick={(e) => next(e, NameOfClass, schedule, id, time)}>
        <div className="card-body">
                <h3 className="display-4">{NameOfClass}</h3>
                <h4>{formatSchedule}</h4>
                <h4>{moment(time, 'HH:mm').format('h:mm A')}</h4>
        </div>
        </div>

    )
}


