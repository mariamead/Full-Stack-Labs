import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/layout/layout";
import EmployeeList from "./components/employeeList/employeeList";
import { OrganizationList } from "./components/organization/organization";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/employeeList" element={<EmployeeList />} />

          <Route path="/organization" element={<OrganizationList />} 
            />

        </Route>
    </Routes>
  );
}

export default App
