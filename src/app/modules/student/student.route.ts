import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updatedStudentValidationSchema } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(updatedStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
