'use client';

import React from 'react';
import { Home, BookOpen, Users, BarChart3, Settings, LogOut, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';

export default function TeacherSidebar() {
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col overflow-y-auto sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">EduAI</h1>
        <p className="text-xs text-gray-600 mt-1">Instructor Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {/* Dashboard */}
          <Link href="/teacher">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-purple-50 text-purple-600 font-semibold hover:bg-purple-100 transition cursor-pointer">
              <Home size={20} />
              <span>Dashboard</span>
            </div>
          </Link>

          {/* My Courses */}
          <div>
            <button
              onClick={() => toggleMenu('courses')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <BookOpen size={20} />
              <span className="flex-1 text-left">My Courses</span>
              <ChevronDown size={16} className={`transform transition ${expandedMenu === 'courses' ? 'rotate-180' : ''}`} />
            </button>
            {expandedMenu === 'courses' && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-300 pl-4">
                <Link href="/teacher/courses">
                  <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">All Courses</p>
                </Link>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Active</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Drafts</p>
                <button className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-semibold cursor-pointer flex items-center">
                  <Plus size={14} className="mr-1" /> New Course
                </button>
              </div>
            )}
          </div>

          {/* Students */}
          <Link href="/teacher/students">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              <Users size={20} />
              <span>Students</span>
            </div>
          </Link>

          {/* Analytics */}
          <Link href="/teacher/analytics">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </div>
          </Link>

          {/* AI Tools */}
          <div>
            <button
              onClick={() => toggleMenu('ai-tools')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <span className="text-lg">🤖</span>
              <span className="flex-1 text-left">AI Tools</span>
              <ChevronDown size={16} className={`transform transition ${expandedMenu === 'ai-tools' ? 'rotate-180' : ''}`} />
            </button>
            {expandedMenu === 'ai-tools' && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-300 pl-4">
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Generate Assessments</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Grade Assistant</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Content Generator</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">Student Insights</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition cursor-pointer">
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
