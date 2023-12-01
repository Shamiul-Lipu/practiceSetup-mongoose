import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string!',
    })
    .max(20, { message: 'Prassword can not be more then 20 characters' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
