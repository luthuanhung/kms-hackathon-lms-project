'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CourseCard from '@/components/CourseCard';
import { Filter, Star } from 'lucide-react';

export default function CoursesPage() {
  const allCourses = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      instructor: 'Dr. Sarah Chen',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      category: 'AI & ML',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Web Development Fundamentals',
      instructor: 'Prof. James Wilson',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      category: 'Web Dev',
      level: 'Beginner',
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Dr. Maria Garcia',
      progress: 80,
      image: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=400&h=250&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Advanced React Patterns',
      instructor: 'Alex Thompson',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
      category: 'Web Dev',
      level: 'Advanced',
    },
    {
      id: 5,
      title: 'Cloud Computing with AWS',
      instructor: 'Michael Brown',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1551621177-bfc5d16bc5f1?w=400&h=250&fit=crop',
      category: 'Cloud',
      level: 'Intermediate',
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials',
      instructor: 'Dr. Emma White',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=400&h=250&fit=crop',
      category: 'Security',
      level: 'Intermediate',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Navbar />
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">All Courses</h1>
            <p className="text-gray-600">Browse and enroll in thousands of courses</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter size={20} className="text-gray-600" />
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition font-semibold">
                All Courses
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                Beginner
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                Intermediate
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                Advanced
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                Most Popular
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
