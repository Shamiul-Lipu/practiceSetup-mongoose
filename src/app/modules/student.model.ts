import { Schema, model } from 'mongoose';
import {
  GuardiansDetails,
  Student,
  StudentStaticMethodsModel,
  // StudentMethods,
  // StudentMethodsModel,
  UserName,
} from './student/student.interface';

// fat model thin controller

const UserNameSchema = new Schema<UserName>({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
});

const GuardianSchema = new Schema<GuardiansDetails>({
  name: {
    type: UserNameSchema,
    required: true,
  },
  contactNo: { type: String },
  relation: { type: String },
});

// custom instance methods and model passed as generic in instance of creating studenSchema
// const StudentSchema = new Schema<Student, StudentMethodsModel, StudentMethods>

const StudentSchema = new Schema<Student, StudentStaticMethodsModel>({
  id: { type: String, required: true, unique: true },
  name: UserNameSchema,
  age: { type: Number, required: [true, 'Age is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  guardians: { type: GuardianSchema, required: true },
  presentAddress: { type: String, required: true },
  working: { type: Boolean, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
  },
});

// creating custom static method

StudentSchema.statics.isUserExists = async (id: string) => {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

// creating custom instance method

// StudentSchema.methods.isUserExists = async (id: string) => {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

// adding the method model type in schema model as generic type
// export const StudentModel = model<Student, StudentMethodsModel>

// adding the static method in the model as generic type
export const StudentModel = model<Student, StudentStaticMethodsModel>(
  'student',
  StudentSchema,
);

export default {
  StudentSchema,
};
