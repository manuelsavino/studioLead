import React from 'react'
import moment from 'moment'

export default function ClassDetails({ NameOfClass, schedule, time, next, classTrying, age, cssClass }) {
    const formatSchedule = schedule.map(day => moment().day(day).format('ddd '))

    return (
        <div className={`card ${cssClass}`} onClick={(e) => next(e, NameOfClass, schedule, classTrying, time)}>
            <div className="card-body">
                <h3 className="display-4 ">{NameOfClass}</h3>
                <h4><i className="far fa-calendar"></i> {formatSchedule}</h4>
                <h4><i className="far fa-clock fa-xs"></i> {moment(time, 'HH:mm').format('h:mm A')}</h4>
                <h5>{age}</h5>

            </div>
        </div>

    )
}


