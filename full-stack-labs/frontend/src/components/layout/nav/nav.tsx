import { NavLink } from "react-router-dom";

export function Nav() {
    return(
        <nav>
            <div className="page-nav">
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/EmployeeList" end>
                    Employees
                </NavLink>
                <NavLink to="/Organization" end>
                    Organization
                </NavLink>
            </div>
        </nav>
    );
}