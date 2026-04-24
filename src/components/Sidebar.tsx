'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Compass,
  BarChart3,
  Settings,
  LogOut,
  FolderOpen,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: BookOpen, label: 'My Courses', href: '/courses' },
    { icon: Compass, label: 'Explore', href: '/explore' },
    { icon: BarChart3, label: 'Progress', href: '/progress' },
    { icon: FolderOpen, label: 'Downloads', href: '/downloads' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

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
        } bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 overflow-hidden md:w-64 md:relative fixed h-full z-40`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 pt-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <span className="text-xl font-bold">LearnHub</span>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/20 transition group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/20 transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
