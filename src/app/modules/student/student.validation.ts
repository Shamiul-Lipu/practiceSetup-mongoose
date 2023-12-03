import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianSValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string(),
      admissionSemester: z.string(),
    }),
  }),
});

// these are update validation schema

const updatedUserNameSchema = z.object({
  updatedFirstName: z
    .string()
    .min(1)
    .max(20)
    .optional()
    .refine((value) => value !== undefined && /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  updatedMiddleName: z.string().optional(),
  updatedLastName: z.string().optional(),
});

const updatedGuardianSValidationSchema = z.object({
  updatedFatherName: z.string().optional(),
  updatedFatherOccupation: z.string().optional(),
  updatedFatherContactNo: z.string().optional(),
  updatedMotherName: z.string().optional(),
  updatedMotherOccupation: z.string().optional(),
  updatedMotherContactNo: z.string().optional(),
});

const updatedLocalGuardianValidationSchema = z.object({
  updatedName: z.string().optional(),
  updatedOccupation: z.string().optional(),
  updatedContactNo: z.string().optional(),
  updatedAddress: z.string().optional(),
});

export const updatedStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      updatedName: updatedUserNameSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updatedGuardianSValidationSchema.optional(),
      localGuardian: updatedLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updatedStudentValidationSchema,
};
