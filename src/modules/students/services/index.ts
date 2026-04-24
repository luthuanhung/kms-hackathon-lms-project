import { studentModel } from '../models';
import { enrollmentService } from '@/modules/enrollments/services';
import { attemptService } from '@/modules/assessments/services';

export const studentService = {
  getStudentById: async (id: string) => {
    return await studentModel.findById(id);
  },

  getAllStudents: async () => {
    return await studentModel.findAll();
  },

  getStudentDashboard: async (userId: string) => {
    return await studentModel.getDashboard(userId);
  },

  getStudentProgress: async (userId: string) => {
    return await studentModel.getProgress(userId);
  },

  getEnrolledCourses: async (userId: string) => {
    const enrollments = await enrollmentService.getStudentCourses(userId);
    return enrollments.map(e => ({
      ...e.course,
      progress: e.progress,
      enrolledAt: e.enrolledAt,
      completedAt: e.completedAt,
    }));
  },

  getCourseProgress: async (userId: string, courseId: string) => {
    const courses = await studentService.getEnrolledCourses(userId);
    const course = courses.find(c => c.id === courseId);
    return course || null;
  },

  getAssessmentResults: async (userId: string) => {
    return await attemptService.getUserAttempts(userId);
  },
};
