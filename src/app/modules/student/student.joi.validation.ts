import Joi from 'joi';

const UserNameValidationSchema = Joi.object({
  firstname: Joi.string().required(),
  middlename: Joi.string().required(),
  lastname: Joi.string().required(),
});

const GuardiansDetailsValidationSchema = Joi.object({
  name: UserNameValidationSchema.required(),
  contactNo: Joi.string(),
  relation: Joi.string(),
});

const StudentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: UserNameValidationSchema.required(),
  age: Joi.number().required().messages({
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female').required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  guardians: GuardiansDetailsValidationSchema.required(),
  presentAddress: Joi.string().required(),
  working: Joi.boolean().required(),
  isActive: Joi.string().valid('active', 'blocked').required(),
});

export default StudentValidationSchema;
