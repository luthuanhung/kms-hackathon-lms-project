'use client';

import React from 'react';
import { Home, BookOpen, TrendingUp, Award, HelpCircle, Settings, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function StudentSidebar() {
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col overflow-y-auto sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">EduAI</h1>
        <p className="text-xs text-gray-600 mt-1">Student Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {/* Dashboard */}
          <Link href="/student">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition cursor-pointer">
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
                <Link href="/student/course">
                  <p className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">All Courses</p>
                </Link>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">In Progress</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Completed</p>
              </div>
            )}
          </div>

          {/* Progress */}
          <Link href="/student/progress">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              <TrendingUp size={20} />
              <span>My Progress</span>
            </div>
          </Link>

          {/* Certificates */}
          <Link href="/student/certificates">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              <Award size={20} />
              <span>Certificates</span>
            </div>
          </Link>

          {/* Support */}
          <div>
            <button
              onClick={() => toggleMenu('support')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <HelpCircle size={20} />
              <span className="flex-1 text-left">Help & Support</span>
              <ChevronDown size={16} className={`transform transition ${expandedMenu === 'support' ? 'rotate-180' : ''}`} />
            </button>
            {expandedMenu === 'support' && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-300 pl-4">
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">FAQ</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Contact Support</p>
                <p className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Documentation</p>
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
