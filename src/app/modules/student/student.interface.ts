// import { Schema, model, connect } from 'mongoose';

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
