import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware to verify JWT token from Authorization header
 * Usage in API routes: const user = await withAuth(request);
 */
export async function withAuth(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

/**
 * Middleware for protecting API routes (throws error if unauthorized)
 */
export async function requireAuth(request: NextRequest) {
  const user = await withAuth(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return user;
}

/**
 * Middleware to check if user has specific role
 */
export function requireRole(user: any, requiredRoles: string[]) {
  if (!user || !requiredRoles.includes(user.role)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  return null; // Authorized
}
