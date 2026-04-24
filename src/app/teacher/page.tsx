'use client';

import React from 'react';
import TeacherNavbar from '@/components/teacher/TeacherNavbar';
import TeacherSidebar from '@/components/teacher/TeacherSidebar';
import TeacherCourseCard from '@/components/teacher/TeacherCourseCard';
import { Users, BookOpen, BarChart3, Award } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="flex-1 overflow-auto">
        <TeacherNavbar />
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, Dr. Chen!</h1>
            <p className="text-gray-600">Manage your courses and monitor student progress</p>
          </div>

          {/* Teaching Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Users, label: 'Total Students', value: '342', color: 'bg-blue-500' },
              { icon: BookOpen, label: 'Active Courses', value: '6', color: 'bg-green-500' },
              { icon: BarChart3, label: 'Avg Completion', value: '72%', color: 'bg-purple-500' },
              { icon: Award, label: 'Certificates Issued', value: '145', color: 'bg-orange-500' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* My Courses */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                + Create Course
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: 'Introduction to Machine Learning',
                  students: 125,
                  lessons: 24,
                  avgRating: 4.8,
                  reviews: 89,
                  status: 'Active' as const,
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
                },
                {
                  id: 2,
                  title: 'Advanced AI Techniques',
                  students: 87,
                  lessons: 18,
                  avgRating: 4.7,
                  reviews: 65,
                  status: 'Active' as const,
                  image: 'https://images.unsplash.com/photo-1677442d019cecf8ca46cad8d440b9d9?w=400&h=250&fit=crop',
                },
                {
                  id: 3,
                  title: 'Data Ethics & Governance',
                  students: 56,
                  lessons: 12,
                  avgRating: 4.9,
                  reviews: 45,
                  status: 'Draft' as const,
                  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
                },
              ].map((course) => (
                <TeacherCourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Submissions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Submissions</h3>
              <div className="space-y-4">
                {[
                  { student: 'John Smith', course: 'ML Fundamentals', status: 'Pending', time: '2 hours ago' },
                  { student: 'Emma Wilson', course: 'Data Science', status: 'Submitted', time: '4 hours ago' },
                  { student: 'Michael Brown', course: 'Web Dev', status: 'Graded', time: '6 hours ago' },
                  { student: 'Sarah Davis', course: 'ML Fundamentals', status: 'Pending', time: '8 hours ago' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-900">{item.student}</p>
                      <p className="text-sm text-gray-600">{item.course}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition flex items-center">
                  <span className="mr-2">📊</span> Generate Assessment
                </button>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-lg transition flex items-center">
                  <span className="mr-2">📝</span> Grade Submissions
                </button>
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 px-4 rounded-lg transition flex items-center">
                  <span className="mr-2">📈</span> View Analytics
                </button>
                <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-3 px-4 rounded-lg transition flex items-center">
                  <span className="mr-2">💬</span> Message Students
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
