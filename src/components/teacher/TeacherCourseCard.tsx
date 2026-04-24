'use client';

import React from 'react';
import { Edit2, BarChart3, Users, Star } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  students: number;
  lessons: number;
  avgRating: number;
  reviews: number;
  status: 'Active' | 'Draft';
  image: string;
}

interface TeacherCourseCardProps {
  course: Course;
}

export default function TeacherCourseCard({ course }: TeacherCourseCardProps) {
  const statusColor = course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {course.status}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2">{course.title}</h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(course.avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({course.reviews} reviews)</span>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4 border-b pb-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              <Users size={16} className="text-purple-600" />
              <span>{course.students} Students</span>
            </div>
            <span className="text-xs text-gray-600">{course.lessons} lessons</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-1">
            <Edit2 size={14} />
            <span className="text-sm">Edit</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-1">
            <BarChart3 size={14} />
            <span className="text-sm">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
