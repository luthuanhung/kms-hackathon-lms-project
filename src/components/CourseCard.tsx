'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Clock } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    progress: number;
    image: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-40 w-full bg-gray-300">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star size={14} className="fill-current" />
            4.8
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>2.3K</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>24h</span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-700">Progress</span>
              <span className="text-xs font-bold text-blue-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Continue Learning
          </button>
        </div>
      </div>
    </Link>
  );
}
