import { courseModel, lessonModel } from '../models';

export const courseService = {
  getAllCourses: async () => {
    return await courseModel.findAll();
  },

  getCourseById: async (id: string) => {
    return await courseModel.findById(id);
  },

  getCoursesByTeacher: async (teacherId: string) => {
    return await courseModel.findByTeacher(teacherId);
  },

  createCourse: async (data: { title: string; description?: string; teacherId: string }) => {
    return await courseModel.create(data);
  },

  updateCourse: async (id: string, data: any) => {
    return await courseModel.update(id, data);
  },

  deleteCourse: async (id: string) => {
    return await courseModel.delete(id);
  },

  getEnrolledStudents: async (courseId: string) => {
    return await courseModel.getEnrolledStudents(courseId);
  },
};

export const lessonService = {
  getLessonById: async (id: string) => {
    return await lessonModel.findById(id);
  },

  getCourseLessons: async (courseId: string) => {
    return await lessonModel.findByCourse(courseId);
  },

  createLesson: async (data: { courseId: string; title: string; content: string; order?: number }) => {
    return await lessonModel.create(data);
  },

  updateLesson: async (id: string, data: any) => {
    return await lessonModel.update(id, data);
  },

  deleteLesson: async (id: string) => {
    return await lessonModel.delete(id);
  },
};
