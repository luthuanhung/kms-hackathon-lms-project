import { enrollmentModel } from '../models';

export const enrollmentService = {
  enrollStudent: async (userId: string, courseId: string) => {
    // Check if already enrolled
    const existing = await enrollmentModel.findUnique(userId, courseId);
    if (existing) {
      throw new Error('Student already enrolled in this course');
    }

    return await enrollmentModel.create({ userId, courseId });
  },

  getStudentCourses: async (userId: string) => {
    return await enrollmentModel.findByStudent(userId);
  },

  getCourseStudents: async (courseId: string) => {
    return await enrollmentModel.findByCourse(courseId);
  },

  updateEnrollment: async (id: string, data: any) => {
    return await enrollmentModel.update(id, data);
  },

  updateProgress: async (enrollmentId: string, progress: number) => {
    return await enrollmentModel.updateProgress(enrollmentId, progress);
  },

  completeEnrollment: async (enrollmentId: string) => {
    return await enrollmentModel.update(enrollmentId, {
      completedAt: new Date(),
      progress: 100,
    });
  },

  unenroll: async (enrollmentId: string) => {
    return await enrollmentModel.delete(enrollmentId);
  },
};
