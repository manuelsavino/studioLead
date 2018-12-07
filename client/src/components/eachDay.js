import React from 'react'
import moment from 'moment'

export default function EachDay({ id, day, next, dayCount }) {

    let days = []
    let count = 0;


    (day <= moment().day()) ? count = 7 : count = 0;
    for (var i = count; i < 15; i += 7) {
        console.log(moment().day(day).format('dddd'), i)
        let date = moment().day(day + i).format('MM/DD/YYYY')
        days.push(
            <div key={Math.random()} onClick={(e) => next(e, date, date, date, date, date)} className="eachday mb-2">
                <h5 className="py-3 sortaBlack">
                    {moment().day(day + i).format('dddd, MMMM Do YYYY')}
                </h5>
            </div>)
    }

    if (days.length > 2) {
        days.pop()
    }


    return <div className="day">
        <h6 className="sortaBlack">{moment().day(day).format('dddd')}s</h6>
        {days}
    </div>;
}