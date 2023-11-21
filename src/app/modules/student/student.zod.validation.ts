import z from 'zod';

// Define Zod schema for validation
const UserNameZodValidationSchema = z.object({
  firstname: z.string().min(1),
  middlename: z.string().min(1),
  lastname: z.string().min(1),
});

const GuardiansZodDetailsValidationSchema = z.object({
  name: UserNameZodValidationSchema,
  contactNo: z.string().optional(),
  relation: z.string().optional(),
});

const StudentZodValidationSchema = z.object({
  id: z.string().min(1),
  name: UserNameZodValidationSchema,
  age: z.number().min(5).max(120),
  gender: z.enum(['male', 'female']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  email: z.string().email(),
  contactNo: z.string().min(10).max(10),
  guardians: GuardiansZodDetailsValidationSchema,
  presentAddress: z.string().min(5).max(100),
  working: z.boolean(),
  isActive: z.enum(['active', 'blocked']),
});

export default StudentZodValidationSchema;
