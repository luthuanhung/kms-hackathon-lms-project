import { prisma } from '@/lib/prisma';

export const profileModel = {
  findById: async (id: string) => {
    return await prisma.profile.findUnique({
      where: { id },
      include: { user: true },
    });
  },

  findByUserId: async (userId: string) => {
    return await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  },

  create: async (data: { userId: string; fullName: string; avatar?: string; bio?: string }) => {
    return await prisma.profile.create({
      data,
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.profile.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.profile.delete({
      where: { id },
    });
  },
};
