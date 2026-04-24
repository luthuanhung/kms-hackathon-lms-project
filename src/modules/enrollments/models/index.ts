import { prisma } from '@/lib/prisma';

export const enrollmentModel = {
  findById: async (id: string) => {
    return await prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: { include: { profile: true } },
        course: true,
      },
    });
  },

  findByStudent: async (userId: string) => {
    return await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: { include: { teacher: true, lessons: true } },
        user: true,
      },
    });
  },

  findByCourse: async (courseId: string) => {
    return await prisma.enrollment.findMany({
      where: { courseId },
      include: {
        user: { include: { profile: true } },
      },
    });
  },

  create: async (data: { userId: string; courseId: string }) => {
    return await prisma.enrollment.create({
      data,
      include: {
        user: true,
        course: true,
      },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.enrollment.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.enrollment.delete({
      where: { id },
    });
  },

  findUnique: async (userId: string, courseId: string) => {
    return await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });
  },

  updateProgress: async (enrollmentId: string, progress: number) => {
    return await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { progress },
    });
  },
};
