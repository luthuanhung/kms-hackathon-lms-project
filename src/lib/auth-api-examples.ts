/**
 * Example API routes for authentication
 * Copy these examples to implement in your app/api directory
 */

// ===========================================
// Example: POST /api/auth/register
// ===========================================
/*
import { authService } from '@/modules';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { user, token } = await authService.register(email, password, role);

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user,
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
*/

// ===========================================
// Example: POST /api/auth/login
// ===========================================
/*
import { authService } from '@/modules';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { user, token } = await authService.login(email, password);

    return NextResponse.json(
      {
        message: 'Login successful',
        user,
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }
}
*/

// ===========================================
// Example: GET /api/auth/me (Protected route)
// ===========================================
/*
import { requireAuth } from '@/lib/middleware';
import { authService } from '@/modules';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  
  if (user instanceof NextResponse) {
    return user;
  }

  try {
    const profile = await authService.getUserProfile(user.userId);
    return NextResponse.json({ user: profile }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
*/

// ===========================================
// Example: PUT /api/auth/change-password
// ===========================================
/*
import { requireAuth } from '@/lib/middleware';
import { authService } from '@/modules';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  
  if (user instanceof NextResponse) {
    return user;
  }

  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Old password and new password are required' },
        { status: 400 }
      );
    }

    const updatedUser = await authService.changePassword(
      user.userId,
      oldPassword,
      newPassword
    );

    return NextResponse.json(
      {
        message: 'Password changed successfully',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
*/

// ===========================================
// Client-side usage example:
// ===========================================
/*
// Registration
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123',
    role: 'STUDENT',
  }),
});

const { user, token } = await registerResponse.json();
localStorage.setItem('authToken', token);

// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123',
  }),
});

const { token } = await loginResponse.json();
localStorage.setItem('authToken', token);

// Protected API call
const meResponse = await fetch('/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  },
});

const profile = await meResponse.json();

// Change password
const changeResponse = await fetch('/api/auth/change-password', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  },
  body: JSON.stringify({
    oldPassword: 'securePassword123',
    newPassword: 'newPassword456',
  }),
});
*/
