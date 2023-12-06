// import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
// import { userValidation } from './user.validation';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Created successfuly',
    data: result,
  });
});

export const UserCortrollers = {
  createStudent,
};
