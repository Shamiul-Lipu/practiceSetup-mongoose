import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  // req
  // call for service
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  // response
  sendResponse(res, {
    statudCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created!!',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemester();

  sendResponse(res, {
    statudCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data retrived successfuly!',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
};
