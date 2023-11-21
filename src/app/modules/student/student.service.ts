import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentCollectionInDB = async (studentData: Student) => {
  // using custom static method
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await StudentModel.create(studentData); // built in static method
  // const student = new StudentModel(studentData); // create instance
  // using custom instance method
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save(); // built in instance method

  return result;
};

const getAllStudentFromDB = async () => {
  return await StudentModel.find();
};

const getOneStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentCollectionInDB,
  getOneStudentFromDB,
  getAllStudentFromDB,
};
