import React from 'react'
import moment from 'moment'

const ActivityRow = ({
    id,
    item
}) => {

    return (
        <tr key={id} >
            <td style={{ textAlign: "center" }}>
                {moment(item.date).format("DD/MM/YYYY HH:m") + "hs"}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.Admins[0].name + " " + item.Admins[0].lastname}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.Admins[0].user}
            </td>
            <td style={{ textAlign: "left" }}>
                {item.activity_description}
            </td>
        </tr>
    )
}

export default ActivityRow