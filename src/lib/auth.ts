import jwt, { JwtPayload } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const JWT_SECRET = (process.env.JWT_SECRET || 'your-secret-key-change-in-production') as string;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

/**
 * Hash a password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

/**
 * Compare a password with its hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Generate JWT token
 */
export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRY,
    } as any
  );
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): {
  userId: string;
  email: string;
  role: string;
} | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
      email: string;
      role: string;
    };
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Decode token without verification (use with caution)
 */
export function decodeToken(token: string) {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}
