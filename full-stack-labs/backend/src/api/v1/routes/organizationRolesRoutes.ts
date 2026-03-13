import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { organizationRoleSchema } from "../validation/organizationRoleValidation";
import * as organizationRoleController from "../controllers/organizationRoleController";

const router: Router = express.Router();

router.get("/roles", organizationRoleController.getAllRoles);

router.post("/roles", validateRequest(organizationRoleSchema),
    organizationRoleController.createRole);

export default router;