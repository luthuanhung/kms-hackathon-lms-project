'use client';

import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 ml-8">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
                <h3 className="font-semibold mb-3">Notifications</h3>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b last:border-0">
                    <p className="text-sm font-medium">New assignment posted</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <MessageSquare size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
              <ChevronDown size={16} className="text-gray-600" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <User size={16} /> Profile
                </a>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
