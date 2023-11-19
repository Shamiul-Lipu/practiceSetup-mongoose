import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentCollectionInDB = async (student: Student) => {
  const result = await StudentModel.create(student);
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
