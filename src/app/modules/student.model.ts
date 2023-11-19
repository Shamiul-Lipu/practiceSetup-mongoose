import { Schema, model } from 'mongoose';
import {
  GuardiansDetails,
  Student,
  UserName,
} from './student/student.interface';

const UserNameSchema = new Schema<UserName>({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
});

const GuardianSchema = new Schema<GuardiansDetails>({
  name: UserNameSchema,
  contactNo: { type: String },
  relation: { type: String },
});

const StudentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: UserNameSchema,
  age: { type: Number, required: true },
  gender: ['male', 'female'],
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  guardians: GuardianSchema,
  presentAddress: { type: String, required: true },
  working: { type: Boolean, required: true },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('student', StudentSchema);

export default {
  StudentSchema,
};
