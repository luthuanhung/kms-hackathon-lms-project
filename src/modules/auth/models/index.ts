import { prisma } from '@/lib/prisma';

export const userModel = {
  findById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  },

  create: async (data: { email: string; password: string; role?: string }) => {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: (data.role as any) || 'STUDENT',
      },
      include: { profile: true },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.user.update({
      where: { id },
      data,
      include: { profile: true },
    });
  },

  delete: async (id: string) => {
    return await prisma.user.delete({
      where: { id },
    });
  },

  findAll: async () => {
    return await prisma.user.findMany({
      include: { profile: true },
    });
  },
};
