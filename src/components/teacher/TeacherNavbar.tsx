'use client';

import React from 'react';
import { Bell, MessageSquare, Settings, LogOut, Search } from 'lucide-react';

export default function TeacherNavbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses, students, or materials..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 ml-8">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-purple-600 transition">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>
        </button>

        {/* Messages */}
        <button className="relative text-gray-600 hover:text-purple-600 transition">
          <MessageSquare size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            8
          </span>
        </button>

        {/* Settings */}
        <button className="text-gray-600 hover:text-purple-600 transition">
          <Settings size={24} />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 border-l border-gray-300 pl-6">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">SC</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Dr. Sarah Chen</p>
            <p className="text-xs text-gray-600">Instructor</p>
          </div>
        </div>

        {/* Logout */}
        <button className="text-gray-600 hover:text-red-600 transition">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
