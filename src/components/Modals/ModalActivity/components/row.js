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
                {item.Admin.name + " " + item.Admin.lastname}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.Admin.user}
            </td>
            <td style={{ textAlign: "left" }}>
                {item.activity_description}
            </td>
        </tr>
    )
}

export default ActivityRow