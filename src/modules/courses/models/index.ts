import { prisma } from '@/lib/prisma';

export const courseModel = {
  findById: async (id: string) => {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        lessons: {
          orderBy: { order: 'asc' },
        },
        enrollments: true,
      },
    });
  },

  findByTeacher: async (teacherId: string) => {
    return await prisma.course.findMany({
      where: { teacherId },
      include: {
        lessons: true,
        enrollments: true,
      },
    });
  },

  create: async (data: { title: string; description?: string; teacherId: string }) => {
    return await prisma.course.create({
      data,
      include: { teacher: true },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.course.update({
      where: { id },
      data,
      include: { teacher: true, lessons: true },
    });
  },

  delete: async (id: string) => {
    return await prisma.course.delete({
      where: { id },
    });
  },

  findAll: async () => {
    return await prisma.course.findMany({
      include: {
        teacher: true,
        lessons: true,
      },
    });
  },

  getEnrolledStudents: async (courseId: string) => {
    return await prisma.enrollment.findMany({
      where: { courseId },
      include: { user: { include: { profile: true } } },
    });
  },
};

export const lessonModel = {
  findById: async (id: string) => {
    return await prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
        assessments: true,
      },
    });
  },

  findByCourse: async (courseId: string) => {
    return await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: { assessments: true },
    });
  },

  create: async (data: { courseId: string; title: string; content: string; order?: number }) => {
    return await prisma.lesson.create({
      data,
      include: { course: true },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.lesson.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.lesson.delete({
      where: { id },
    });
  },
};
