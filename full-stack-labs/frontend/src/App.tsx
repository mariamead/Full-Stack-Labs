import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/layout/layout";
import EmployeeList from "./components/employeeList/employeeList";
import type { Role } from "./apis/leadershipManagement";
import { OrganizationList } from "./components/organization/organization";
import { organizationData } from "./apis/leadershipManagement";

function App() {
const [organizationList] = useState<Role[]>(organizationData);

  return (
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/employeeList" element={<EmployeeList />} />

          <Route path="/organization" element={<OrganizationList
            organization={organizationList} />} 
            />

        </Route>
    </Routes>
  );
}

export default App
