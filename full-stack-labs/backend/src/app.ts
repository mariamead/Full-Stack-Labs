import express, {Express} from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import corsOptions from "../config/cors";
import employeeDepartmentsRoutes from "./api/v1/routes/employeeDepartmentsRoutes";
import organizationRolesRoutes from "./api/v1/routes/organizationRolesRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

//uses .env variables
dotenv.config();

app.use(morgan("combined"));

// allows express to parse json
app.use(express.json());

// add Cross-Origin Resource Sharing middleware
// This will refuse requests from origins that do not fulfill corsOptions requirements
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
app.use(cors(corsOptions()));

// Listening for requests 
app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

// Routes created
app.use("/v1/", employeeDepartmentsRoutes);
app.use("/v1/", organizationRolesRoutes);

app.use(errorHandler);

export default app;