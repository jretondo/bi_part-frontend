import classNames from 'classnames';
import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const NavClient = ({ id, name, enabled, clientActive, setClientActive }) => {
    return (
        <NavItem style={{ cursor: "pointer" }} key={id}>
            <NavLink
                className={classNames({ active: clientActive === id })}
                style={
                    clientActive === id ?
                        { background: "#073863", color: "white" } :
                        enabled ?
                            { background: "#2dce89" } :
                            { background: "#f5365c" }}
                onClick={() => setClientActive(id)}
            >
                {clientActive === id ? name : name.length > 10 ? name.slice(0, 10) + "..." : name}
            </NavLink>
        </NavItem>
    )
}

export default NavClient