import { Student } from './student.model';

// ------------- all user will be created from user route------------------
// const createStudentIntoDB = async (studentData: TStudent) => {
//   // using custom static method
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User already exists!');
//   }

//   const result = await Student.create(studentData); // built in static method
//   // const student = new StudentModel(studentData); // create instance
//   // using custom instance method
//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new Error('User already exists');
//   // }
//   // const result = await student.save(); // built in instance method

//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
