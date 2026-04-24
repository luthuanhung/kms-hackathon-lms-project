import { prisma } from '@/lib/prisma';
import { enrollmentModel } from '@/modules/enrollments/models';

export const studentModel = {
  findById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        enrollments: {
          include: { course: { include: { teacher: true, lessons: true } } },
        },
      },
    });
  },

  findAll: async () => {
    return await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: { profile: true, enrollments: true },
    });
  },

  getProgress: async (userId: string) => {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });

    const attempts = await prisma.attemptResult.findMany({
      where: { userId },
    });

    return {
      enrollments,
      totalAttempts: attempts.length,
      averageScore: attempts.length > 0
        ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length
        : 0,
    };
  },

  getDashboard: async (userId: string) => {
    const user = await studentModel.findById(userId);
    const enrollments = await enrollmentModel.findByStudent(userId);
    const attempts = await prisma.attemptResult.findMany({
      where: { userId },
    });

    return {
      user,
      enrollments,
      stats: {
        coursesEnrolled: enrollments.length,
        totalAssessments: attempts.length,
        averageScore: attempts.length > 0
          ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length
          : 0,
      },
    };
  },
};
