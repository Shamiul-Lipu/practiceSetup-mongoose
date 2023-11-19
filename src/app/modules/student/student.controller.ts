import { Request, Response } from 'express';
import { StudentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    // will call the service
    const result = await StudentService.createStudentCollectionInDB(student);
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created sucessfully',
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'All Student data retrived',
      data: result,
    });
  } catch (err) {
    // console.log(err);
  }
};

const getOneStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getOneStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student found by ID',
      data: result,
    });
  } catch (err) {
    // console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getOneStudent,
  getAllStudent,
};
