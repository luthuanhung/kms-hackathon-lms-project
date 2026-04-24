import { teacherModel } from '../models';
import { courseService } from '@/modules/courses/services';
import { enrollmentService } from '@/modules/enrollments/services';

export const teacherService = {
  getTeacherById: async (id: string) => {
    return await teacherModel.findById(id);
  },

  getAllTeachers: async () => {
    return await teacherModel.findAll();
  },

  getTeacherDashboard: async (teacherId: string) => {
    return await teacherModel.getDashboard(teacherId);
  },

  getTeacherCourses: async (teacherId: string) => {
    return await teacherModel.getCourses(teacherId);
  },

  createCourse: async (teacherId: string, data: { title: string; description?: string }) => {
    return await courseService.createCourse({
      ...data,
      teacherId,
    });
  },

  getStudentAnalytics: async (teacherId: string, courseId: string) => {
    return await teacherModel.getStudentAnalytics(teacherId, courseId);
  },

  getCourseStudents: async (courseId: string) => {
    return await enrollmentService.getCourseStudents(courseId);
  },

  updateCourse: async (courseId: string, data: any) => {
    return await courseService.updateCourse(courseId, data);
  },

  deleteCourse: async (courseId: string) => {
    return await courseService.deleteCourse(courseId);
  },
};
