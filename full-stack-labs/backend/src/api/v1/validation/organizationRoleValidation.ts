import Joi, { ObjectSchema } from "Joi";

export const organizationRoleSchema: ObjectSchema = Joi.object({
    id: Joi.string().optional(),
    firstName: Joi.string().required().min(3).messages({
        "any.required": "First name is required",
        "string.empty": "First name cannot be blank",
        "string.min": "First name must have minimum length of 3."
    }),
    lastName: Joi.string().required().messages({
        "any.required": "Last name is required",
        "string.empty": "Last name cannot be empty"
    }),
    role: Joi.string().required().messages({
        "any.required": "Role is required",
        "string.empty": "Role cannot be blank",
    })
})
