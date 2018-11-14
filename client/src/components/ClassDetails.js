import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function ClassDetails(props) {
    const { NameOfClass, ageGroup, schedule, next } = props
    return (
        <div className="eachClass" onClick={() => next()}>

            <Typography variant="h4" gutterBottom>
                {NameOfClass}
            </Typography>

            <Typography variant="h4" gutterBottom>
                {ageGroup}
            </Typography>

            <Typography variant="h4" gutterBottom>
                {schedule}
            </Typography>

        </div>
    )
}
