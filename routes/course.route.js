import { Router } from 'express';
import {
  addLectureToCourseById,
  createCourse,
  deleteCourseById,
  getAllCourses,
  getLecturesByCourseId,
  removeLectureFromCourse,
  updateCourseById,
} from '../controller/course.controller.js';
import {
  authorizeRoles,
  authorizeSubscribers,

} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const Courserouter = Router();

Courserouter
  .route('/courses')
  .get(getAllCourses)
  .post(
    authorizeRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
  )
  .delete( authorizeRoles('ADMIN'), removeLectureFromCourse);

Courserouter
  .route('/:id')
  .get(authorizeSubscribers, getLecturesByCourseId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
  .post(
    authorizeRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
  )
  .put(authorizeRoles('ADMIN'), updateCourseById);


export default Courserouter;