import { Request, Response } from 'express';
import { StudentService } from './student.service';
// import StudentZodValidationSchema from './student.zod.validation';
// import StudentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    // joi validation schema added
    // const { error, value } = StudentValidationSchema.validate(student); //we can send value to client as well
    // const result = await StudentService.createStudentCollectionInDB(value);

    // zod validation parse
    // const zodParsedData = StudentZodValidationSchema.parse(student);
    // const result =
    //   await StudentService.createStudentCollectionInDB(zodParsedData);

    // will call the service
    const result = await StudentService.createStudentCollectionInDB(student);

    // sending joi validator errors
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something  went wrong',
    //     error: error.details,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created sucessfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something  went wrong',
      error: err,
    });
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
    res.send(500).json({
      success: false,
      message: 'Something  went wrong',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getOneStudent,
  getAllStudent,
};
