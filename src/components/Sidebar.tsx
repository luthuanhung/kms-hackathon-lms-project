'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Home,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

export default function TeacherSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  // Thêm state để quản lý việc đóng/mở menu All Courses
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 overflow-hidden md:w-64 md:relative fixed h-full z-40`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 pt-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold">KMS LMS <span className="text-xs text-blue-400 align-top">Teacher</span></span>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {/* Dashboard */}
            <Link
              href="/teacher"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group"
            >
              <Home size={20} className="group-hover:scale-110 transition text-blue-400" />
              <span>Dashboard</span>
            </Link>

            {/* All Courses (Dropdown) */}
            <div>
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="group-hover:scale-110 transition text-blue-400" />
                  <span>All Courses</span>
                </div>
                {isCoursesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {/* Sub-menu: Mở ra khi isCoursesOpen = true */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  isCoursesOpen ? 'max-h-40 mt-1' : 'max-h-0'
                }`}
              >
                <Link
                  // Đường dẫn chọc thẳng vô trang tạo câu hỏi mà ông code lúc nãy
                  href="/teacher/quiz_builder" 
                  className="flex items-center gap-3 px-4 py-2 ml-4 rounded-lg hover:bg-blue-600/30 transition border-l-2 border-blue-500/30 hover:border-blue-500 text-sm text-gray-300 hover:text-white"
                >
                  <BrainCircuit size={16} />
                  <span>Khóa học: DSA</span>
                </Link>
              </div>
            </div>

            {/* Analytics */}
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group"
            >
              <BarChart3 size={20} className="group-hover:scale-110 transition text-blue-400" />
              <span>Analytics</span>
            </Link>

            {/* Settings */}
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition group"
            >
              <Settings size={20} className="group-hover:scale-110 transition text-blue-400" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-slate-900/50">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition text-gray-400">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}