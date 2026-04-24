"use client";

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Settings, 
  PlusCircle, 
  ArrowRight, 
  Users, 
  Layers,
  LayoutDashboard
} from 'lucide-react';

export default function TeacherCourseManagementPage() {
  // Dữ liệu giả lập cho khóa học DSA của giảng viên
  const managedCourse = {
    id: 'dsa-101',
    title: 'Cấu trúc dữ liệu & Giải thuật (DSA)',
    studentsCount: 156,
    activeQuizzes: 8,
    lastUpdated: '24/04/2026',
    description: 'Quản lý nội dung, bài giảng và hệ thống câu hỏi tương tác cho sinh viên khoa Khoa học Máy tính.'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <LayoutDashboard className="text-blue-600" />
              Quản lý Khóa học
            </h1>
            <p className="text-slate-500 mt-1">Chào mừng quay trở lại. Hôm nay ông muốn cập nhật nội dung gì?</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition shadow-sm">
            <PlusCircle size={18} />
            Tạo khóa học mới
          </button>
        </div>

        {/* Course Card Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all">
            
            {/* Visual Part */}
            <div className="md:w-1/4 bg-slate-800 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <Layers size={120} className="text-white" />
              </div>
              <div className="text-center z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
                  <BookOpen className="text-white" size={32} />
                </div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Active</span>
              </div>
            </div>

            {/* Content Part */}
            <div className="md:w-3/4 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">{managedCourse.title}</h2>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition">
                    <Settings size={20} />
                  </button>
                </div>
                
                <p className="text-slate-600 mb-6 max-w-2xl">
                  {managedCourse.description}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mb-8 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <span><b>{managedCourse.studentsCount}</b> Sinh viên</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-slate-400" />
                    <span><b>{managedCourse.activeQuizzes}</b> Bài Quizzes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlusCircle size={16} className="text-slate-400" />
                    <span>Cập nhật: {managedCourse.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md border border-blue-100">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-md border border-indigo-100">
                    Algorithm
                  </span>
                </div>
                
                <Link 
                  href="/teacher/quiz-builder" 
                  className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  Thiết kế Câu hỏi
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quản lý rác - Chỗ này để demo thêm tính năng phụ */}
        <div className="mt-12 p-6 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-white/50 group hover:bg-white hover:border-blue-300 transition-all cursor-pointer">
          <p className="text-slate-400 font-medium group-hover:text-blue-500 flex items-center gap-2">
            <PlusCircle size={20} />
            Thêm học phần hoặc tài liệu mới vào khóa học
          </p>
        </div>
      </div>
    </div>
  );
}