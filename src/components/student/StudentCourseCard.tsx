'use client';

import React from 'react';
import { Play, Clock, Award } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  lessons: number;
  completed: number;
  image: string;
}

interface StudentCourseCardProps {
  course: Course;
}

export default function StudentCourseCard({ course }: StudentCourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {course.progress}%
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2">{course.title}</h3>

        {/* Instructor */}
        <p className="text-xs text-gray-600 mb-3">{course.instructor}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-blue-600">{course.completed}/{course.lessons}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-4 border-t pt-3">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award size={14} />
            <span>Completion: {Math.round((course.completed / course.lessons) * 100)}%</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2">
          <Play size={16} />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
}
