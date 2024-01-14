import { NavLink } from "@remix-run/react";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/photos">Photos</NavLink>
            <NavLink to="/add-photo">Add Photo</NavLink>
        </nav>
    );
}
