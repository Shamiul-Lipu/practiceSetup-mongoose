// import { Schema, model, connect } from 'mongoose';
import { Model } from 'mongoose';

export type UserName = {
  firstname: string;
  middlename: string;
  lastname: string;
};

export type GuardiansDetails = {
  name: UserName;
  contactNo: string;
  relation: 'father' | 'mother' | string;
};

export type Student = {
  id: string;
  name: UserName;
  age: number;
  gender: 'male' | 'female';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  guardians: {
    parents: GuardiansDetails;
    localGuardian: GuardiansDetails;
  };
  presentAddress: string;
  working: boolean;
  isActive: 'active' | 'blocked';
};

// for creating custom static interface
// had to make it interface beacuse it extends

export interface StudentStaticMethodsModel extends Model<Student> {
  isUserExists(id: string): Promise<Student | null>;
}

// for creating custom instance type/interface

// export type StudentMethods = {
//   isUserExists(id: string): Promise<Student | null>;
// };

// export type StudentMethodsModel = Model<
//   Student,
//   Record<string, never>,
//   StudentMethods
// >;
