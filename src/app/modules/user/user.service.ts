import mongoose from 'mongoose';
import config from '../../config';
import { generateStudentId } from '../../utils/user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //
  const userData: Partial<TUser> = {};

  // if password is not given, use deafult password
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester info( academic semester ObjectId )
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // transection rollback session
  // create session
  const session = await mongoose.startSession();
  try {
    // start transaction
    session.startTransaction();

    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user- (transaction : 1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }

    if (newUser.length) {
      payload.id = newUser[0].id; // embaded id
      payload.user = newUser[0]._id; // reference _id

      // transaction -2
      const newStudent = await Student.create([payload], { session });

      if (!newStudent.length) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to create new student',
        );
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new Student!');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
