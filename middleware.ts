import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Các trang công khai (không cần đăng nhập)
const PUBLIC_PAGES = ['/', '/auth/login', '/api/auth/login', '/api/auth/register'];

// Các trang yêu cầu đăng nhập
const PROTECTED_PAGES = ['/student', '/teacher', '/courses', '/progress', '/profile', '/explore', '/downloads'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Lấy token từ cookie hoặc header
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization')?.substring(7);

  // Kiểm tra token có hợp lệ không
  const isAuthenticated = token ? verifyToken(token) : null;

  // Nếu trang là công khai, cho phép truy cập
  if (PUBLIC_PAGES.some(page => pathname === page || pathname.startsWith(page))) {
    // Nếu đã đăng nhập và truy cập trang login, chuyển hướng về dashboard
    if (isAuthenticated && pathname === '/auth/login') {
      return NextResponse.redirect(new URL('/student', request.url));
    }
    return NextResponse.next();
  }

  // Kiểm tra API routes
  if (pathname.startsWith('/api/')) {
    // Cho phép public API routes
    if (pathname.startsWith('/api/auth/login') || pathname.startsWith('/api/auth/register')) {
      return NextResponse.next();
    }
    
    // API routes khác yêu cầu đăng nhập
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // Nếu trang yêu cầu đăng nhập nhưng chưa đăng nhập, chuyển hướng về trang login
  if (PROTECTED_PAGES.some(page => pathname.startsWith(page))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
