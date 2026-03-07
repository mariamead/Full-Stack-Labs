import Joi, { ObjectSchema } from "Joi";

export const employeeDepartmentsSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be blank"
    }),
    department: Joi.string().required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be blank"
    })
});
