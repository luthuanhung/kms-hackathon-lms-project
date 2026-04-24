'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CourseCard from '@/components/CourseCard';
import { Sparkles, Zap, Users } from 'lucide-react';

export default function ExplorePage() {
  const categories = [
    { name: 'AI & Machine Learning', icon: '🤖', courses: 124 },
    { name: 'Web Development', icon: '💻', courses: 156 },
    { name: 'Data Science', icon: '📊', courses: 89 },
    { name: 'Cloud Computing', icon: '☁️', courses: 67 },
    { name: 'Cybersecurity', icon: '🔒', courses: 45 },
    { name: 'Mobile Development', icon: '📱', courses: 92 },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Generative AI Fundamentals',
      instructor: 'Dr. Lisa Wong',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1677442d019cecf8977860657b1e9ea32ef5d12f?w=400&h=250&fit=crop',
    },
    {
      id: 2,
      title: 'Full Stack Web Development 2025',
      instructor: 'Tom Anderson',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
    },
    {
      id: 3,
      title: 'Advanced Python for Data Analysis',
      instructor: 'Dr. Rajesh Kumar',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    },
    {
      id: 4,
      title: 'DevOps & Kubernetes Mastery',
      instructor: 'Chris Mitchell',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Navbar />
        <main className="p-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Learning Opportunities</h1>
            <p className="text-gray-600">Discover thousands of courses across all skill levels</p>
          </div>

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 mb-12 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles size={32} />
              <h2 className="text-3xl font-bold">What's New</h2>
            </div>
            <p className="text-purple-100 mb-4">Explore freshly launched courses on the latest technologies and trends</p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Browse New Courses →
            </button>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer text-center"
                >
                  <p className="text-4xl mb-2">{cat.icon}</p>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-600">{cat.courses} courses</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Courses */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-orange-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Trending Courses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Popular Instructors */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users className="text-blue-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Learn from Top Instructors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Dr. Sarah Chen', role: 'ML Engineer', students: '32K+', image: 'SC' },
                { name: 'Prof. James Wilson', role: 'Web Developer', students: '28K+', image: 'JW' },
                { name: 'Dr. Maria Garcia', role: 'Data Scientist', students: '25K+', image: 'MG' },
                { name: 'Alex Thompson', role: 'Full Stack Dev', students: '18K+', image: 'AT' },
              ].map((instructor, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {instructor.image}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{instructor.role}</p>
                  <p className="text-xs text-gray-500">{instructor.students} students</p>
                  <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
