import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { employeeDepartmentsSchema } from "../validation/employeeDepartmentValidation";
import * as employeeDepartmentsController from "../controllers/employeeDepartmentsController";

const router: Router = express.Router();

//Route to fetch all employees and their departments
router.get("/employees", employeeDepartmentsController.getAllEmployees);

//Route to create a employee in a department
router.post("/employees", validateRequest(employeeDepartmentsSchema),
    employeeDepartmentsController.createEmployee);

export default router;