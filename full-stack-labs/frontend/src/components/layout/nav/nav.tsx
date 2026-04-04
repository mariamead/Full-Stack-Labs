import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

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
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}