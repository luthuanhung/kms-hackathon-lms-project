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
    try {
    // 1. Remove the token from client storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      // If using user details, clear them too:
      // localStorage.removeItem('user'); 
    }

    // 2. (Optional) Notify your backend to blacklist the token
    // await fetch('https://your-api.com/logout', { method: 'POST' });

      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: 'Failed to log out' };
  }
  },
};
