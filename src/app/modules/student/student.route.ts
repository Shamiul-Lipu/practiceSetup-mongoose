import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updatedStudentValidationSchema } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(updatedStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
