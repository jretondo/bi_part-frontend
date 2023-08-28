import React from 'react'
import {
    Table
} from "reactstrap"

export const TableList = ({ titlesArray, children }) => {

    return (
        <Table className="align-items-center table-flush table-hover" responsive>
            <thead className="thead-light">
                <tr>
                    {
                        titlesArray.map((title, key) => {
                            return (
                                <th key={key} scope="col" style={{ textAlign: "center" }}>{title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody style={{ minHeight: "500px" }}  >
                {children}
            </tbody>
        </Table>
    )
}