'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { TrendingUp, Target, Award, Zap } from 'lucide-react';

export default function ProgressPage() {
  const progressData = [
    { course: 'Machine Learning', progress: 65, hours: 16 },
    { course: 'Web Development', progress: 45, hours: 11 },
    { course: 'Data Science', progress: 80, hours: 19 },
    { course: 'React Patterns', progress: 25, hours: 6 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Navbar />
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
            <p className="text-gray-600">Track your learning journey and achievements</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: TrendingUp, label: 'Learning Streak', value: '14 days', color: 'bg-blue-500' },
              { icon: Target, label: 'Courses in Progress', value: '4', color: 'bg-green-500' },
              { icon: Award, label: 'Certificates Earned', value: '8', color: 'bg-purple-500' },
              { icon: Zap, label: 'Total Learning Hours', value: '156', color: 'bg-orange-500' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Progress Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Weekly Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Weekly Learning Activity</h2>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-semibold text-gray-600">{day}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ width: `${Math.random() * 100}%` }}
                      >
                        {Math.floor(Math.random() * 4) + 1}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* This Week */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-4">This Week</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100">Total Hours</p>
                  <p className="text-3xl font-bold">22h</p>
                </div>
                <div>
                  <p className="text-blue-100">Sessions Completed</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <button className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Course Progress</h2>
            <div className="space-y-6">
              {progressData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{item.course}</h3>
                    <span className="text-sm text-gray-600">{item.hours}h learning</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.progress}% completed</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
