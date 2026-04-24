'use client';

import React from 'react';
import StudentNavbar from '@/components/student/StudentNavbar';
import StudentSidebar from '@/components/student/StudentSidebar';
import StudentCourseCard from '@/components/student/StudentCourseCard';
import SocraticChat from '@/components/student/SocraticChat';
import { BookOpen, Award, TrendingUp, Clock } from 'lucide-react';

export default function StudentDashboard() {
  const courses = [
    { id: 1, title: 'Introduction to Machine Learning', instructor: 'Dr. Sarah Chen', progress: 65, lessons: 24, completed: 16, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop' },
    { id: 2, title: 'Web Development Fundamentals', instructor: 'Prof. James Wilson', progress: 45, lessons: 30, completed: 14, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop' },
    { id: 3, title: 'Data Science with Python', instructor: 'Dr. Maria Garcia', progress: 80, lessons: 20, completed: 16, image: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=400&h=250&fit=crop' },
    { id: 4, title: 'Advanced React Patterns', instructor: 'Alex Thompson', progress: 25, lessons: 35, completed: 9, image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop' },
  ];

  return (
    // 'relative' is key here so the 'fixed' chatbot knows its parent context
    <div className="relative h-screen flex bg-gray-50">
      <StudentSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <StudentNavbar />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, Alex!</h1>
              <p className="text-gray-600">Keep learning and progress towards your goals[cite: 16, 21].</p>
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: BookOpen, label: 'Courses Enrolled', value: '12', color: 'bg-blue-500' },
                { icon: Clock, label: 'Learning Hours', value: '156h', color: 'bg-green-500' },
                { icon: Award, label: 'Certificates', value: '8', color: 'bg-purple-500' },
                { icon: TrendingUp, label: 'Avg Progress', value: '68%', color: 'bg-orange-500' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className={`${stat.color} w-10 h-10 rounded flex items-center justify-center mb-3`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* My Courses Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <StudentCourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* RENDER CHATBOT LAST SO IT HAS HIGHEST Z-INDEX */}
      <SocraticChat pageContext="The student Alex is on the Dashboard. Average progress is 68%." />
    </div>
  );
}