import { prisma } from '@/lib/prisma';

export const assessmentModel = {
  findById: async (id: string) => {
    return await prisma.assessment.findUnique({
      where: { id },
      include: {
        lesson: true,
        attemptResults: { include: { user: true } },
      },
    });
  },

  findByLesson: async (lessonId: string) => {
    return await prisma.assessment.findMany({
      where: { lessonId },
      include: { attemptResults: true },
    });
  },

  create: async (data: { lessonId: string; type: string; content: string }) => {
    return await prisma.assessment.create({
      data,
      include: { lesson: true },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.assessment.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.assessment.delete({
      where: { id },
    });
  },
};

export const attemptModel = {
  findById: async (id: string) => {
    return await prisma.attemptResult.findUnique({
      where: { id },
      include: { assessment: true, user: true },
    });
  },

  findByUser: async (userId: string) => {
    return await prisma.attemptResult.findMany({
      where: { userId },
      include: { assessment: true },
    });
  },

  findByAssessment: async (assessmentId: string) => {
    return await prisma.attemptResult.findMany({
      where: { assessmentId },
      include: { user: { include: { profile: true } } },
    });
  },

  create: async (data: { userId: string; assessmentId: string; score: number; isCorrect: boolean }) => {
    return await prisma.attemptResult.create({
      data,
      include: { assessment: true, user: true },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.attemptResult.update({
      where: { id },
      data,
    });
  },

  getUserAssessmentAttempts: async (userId: string, assessmentId: string) => {
    return await prisma.attemptResult.findMany({
      where: { userId, assessmentId },
      orderBy: { attemptedAt: 'desc' },
    });
  },
};
