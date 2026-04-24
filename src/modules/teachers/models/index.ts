import { prisma } from '@/lib/prisma';
import { courseModel } from '@/modules/courses/models';

export const teacherModel = {
  findById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        courses: {
          include: { lessons: true, enrollments: true },
        },
      },
    });
  },

  findAll: async () => {
    return await prisma.user.findMany({
      where: { role: 'TEACHER' },
      include: { profile: true, courses: true },
    });
  },

  getCourses: async (teacherId: string) => {
    return await courseModel.findByTeacher(teacherId);
  },

  getDashboard: async (teacherId: string) => {
    const teacher = await teacherModel.findById(teacherId);
    const courses = await courseModel.findByTeacher(teacherId);

    let totalStudents = 0;
    let totalLessons = 0;

    courses.forEach(course => {
      totalStudents += course.enrollments.length;
      totalLessons += course.lessons.length;
    });

    return {
      teacher,
      stats: {
        activeCourses: courses.length,
        totalStudents,
        totalLessons,
      },
      courses,
    };
  },

  getStudentAnalytics: async (teacherId: string, courseId: string) => {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        course: { id: courseId, teacherId },
      },
      include: {
        user: { include: { profile: true } },
      },
    });

    const enrollmentIds = enrollments.map(e => e.id);

    const analytics = await Promise.all(
      enrollments.map(async enrollment => {
        const attempts = await prisma.attemptResult.findMany({
          where: { userId: enrollment.userId },
        });

        return {
          student: enrollment.user,
          progress: enrollment.progress,
          averageScore: attempts.length > 0
            ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length
            : 0,
          totalAttempts: attempts.length,
        };
      })
    );

    return analytics;
  },
};
