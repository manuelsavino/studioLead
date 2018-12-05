import React from 'react'
import moment from 'moment'

export default function EachDay({ id, day, next }) {

    let days = []
    let count = 1;

    (day <= moment().day()) ? count = 7 : count = 1;
    for (var i = count; i < 28; i += 7) {
        let date = moment().day(day + i).format('MM/DD/YYYY')
        days.push(
            <div key={Math.random()} onClick={(e) => next(e, date, date, date, date, date)} className="eachday mb-2">
                <h5 className="py-3">
                    {moment().day(day + i).format('dddd, MMMM Do YYYY')}
                </h5>
            </div>)
    }



    return (
        <div className="day">
            {days}
        </div>
    )
}