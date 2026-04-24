'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Edit2, Mail, Phone, MapPin, Award, BookOpen, Star } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Navbar />
        <main className="p-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  JD
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">John Doe</h1>
                  <p className="text-gray-600 mb-2">Premium Member • Joined Mar 2023</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail size={16} />
                      john@example.com
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      San Francisco, CA
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Edit2 size={18} />
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-6">
              Passionate learner and full-stack developer with 5+ years of experience. Interested in machine learning,
              web development, and cloud technologies.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600">Certificates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">156</p>
                <p className="text-sm text-gray-600">Learning Hours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">4.8★</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">14</p>
                <p className="text-sm text-gray-600">Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">156K</p>
                <p className="text-sm text-gray-600">XP Points</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* About */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                    <p className="text-gray-900">john@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Phone</p>
                    <p className="text-gray-900">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Location</p>
                    <p className="text-gray-900">San Francisco, CA, USA</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {['Machine Learning', 'Web Dev', 'Cloud', 'Data Science', 'AI'].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award size={24} />
                  Recent Achievements
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'First Course Complete', icon: '🎓' },
                    { title: '100 Learning Hours', icon: '⏰' },
                    { title: 'Week Warrior', icon: '🔥' },
                    { title: 'Quiz Master', icon: '💯' },
                    { title: 'Streak 7 Days', icon: '📈' },
                    { title: 'Certificate Expert', icon: '🏅' },
                  ].map((achievement, i) => (
                    <div key={i} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 text-center">
                      <p className="text-3xl mb-2">{achievement.icon}</p>
                      <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Recent Certificates */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award size={20} />
                  Certificates
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <p className="font-semibold text-sm text-gray-900">ML Basics Certificate</p>
                      <p className="text-xs text-gray-600">Issued Jan 2024</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                  View All
                </button>
              </div>

              {/* Settings Preview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="text-sm text-gray-700">Course updates</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">Newsletter</span>
                  </label>
                </div>
                <button className="w-full mt-4 py-2 text-red-600 border border-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
