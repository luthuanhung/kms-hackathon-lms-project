import { userModel } from '../models';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '@/lib/auth';

export const authService = {
  register: async (email: string, password: string, role: string = 'STUDENT') => {
    // Check if user already exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await userModel.create({
      email,
      password: hashedPassword,
      role,
    });

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    return {
      user,
      token,
    };
  },

  login: async (email: string, password: string) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    return {
      user,
      token,
    };
  },

  getUserProfile: async (userId: string) => {
    return await userModel.findById(userId);
  },

  updateProfile: async (userId: string, data: any) => {
    return await userModel.update(userId, data);
  },

  verifyToken: (token: string) => {
    return verifyToken(token);
  },

  changePassword: async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isPasswordValid = await verifyPassword(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    const updatedUser = await userModel.update(userId, {
      password: hashedPassword,
    });

    return updatedUser;
  },

  logout: async () => {
    // Logout logic (typically handled on client-side by removing token)
    // Could also implement token blacklisting on server if needed
    return { success: true, message: 'Logged out successfully' };
  },
};
