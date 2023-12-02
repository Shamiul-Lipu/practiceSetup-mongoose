import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name is required!',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'Academic faculties Object Id needed!',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name is required!',
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: 'Academic faculties id must be string!',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
