'use client';

import React from 'react';
import StudentNavbar from '@/components/student/StudentNavbar';
import StudentSidebar from '@/components/student/StudentSidebar';
import StudentCourseCard from '@/components/student/StudentCourseCard';
import { BookOpen, Award, TrendingUp, Clock } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <StudentNavbar />
        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, Alex!</h1>
            <p className="text-gray-600">Keep learning and progress towards your goals</p>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: BookOpen, label: 'Courses Enrolled', value: '12', color: 'bg-blue-500' },
              { icon: Clock, label: 'Learning Hours', value: '156h', color: 'bg-green-500' },
              { icon: Award, label: 'Certificates', value: '8', color: 'bg-purple-500' },
              { icon: TrendingUp, label: 'Avg Progress', value: '68%', color: 'bg-orange-500' },
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
              <a href="/student/courses" className="text-blue-600 hover:text-blue-700 font-semibold">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 1,
                  title: 'Introduction to Machine Learning',
                  instructor: 'Dr. Sarah Chen',
                  progress: 65,
                  lessons: 24,
                  completed: 16,
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
                },
                {
                  id: 2,
                  title: 'Web Development Fundamentals',
                  instructor: 'Prof. James Wilson',
                  progress: 45,
                  lessons: 30,
                  completed: 14,
                  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
                },
                {
                  id: 3,
                  title: 'Data Science with Python',
                  instructor: 'Dr. Maria Garcia',
                  progress: 80,
                  lessons: 20,
                  completed: 16,
                  image: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=400&h=250&fit=crop',
                },
                {
                  id: 4,
                  title: 'Advanced React Patterns',
                  instructor: 'Alex Thompson',
                  progress: 25,
                  lessons: 35,
                  completed: 9,
                  image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
                },
              ].map((course) => (
                <StudentCourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended For You</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">AI & Machine Learning Specialization</h3>
                <p className="text-blue-100 mb-4">Master the fundamentals of AI and prepare for advanced roles</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Explore
                </button>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Full Stack Development Path</h3>
                <p className="text-purple-100 mb-4">Complete your journey from frontend to backend development</p>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
