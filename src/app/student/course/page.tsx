import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Trophy, PlayCircle, ArrowRight, Brain } from 'lucide-react';

export default function StudentCoursePage() {
  // Mock data cho 1 khóa học duy nhất theo yêu cầu
  const course = {
    id: 'dsa-core',
    title: 'Cấu trúc dữ liệu & Giải thuật (DSA)',
    instructor: 'TS. Trần Hồng Tài', // Giả lập tên giảng viên cho chân thực
    description: 'Nắm vững nền tảng cốt lõi của Khoa học Máy tính. Tích hợp hệ thống bài tập rèn luyện tư duy sâu (Anti-Brainrot).',
    progress: 65,
    totalLessons: 24,
    completedLessons: 15,
    nextQuizId: 'stack-queue-101' // Trỏ tới bài Quiz lúc nãy
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Dashboard */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Không gian học tập</h1>
          <p className="text-gray-600">Tiếp tục rèn luyện tư duy với các khóa học đang tham gia.</p>
        </div>

        {/* Khu vực hiển thị khóa học */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row">
            
            {/* Thumbnail khóa học (Dùng gradient cho mượt, không cần load ảnh) */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Brain className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wider mb-4 backdrop-blur-sm">
                  CHUYÊN NGÀNH CS
                </span>
                <h2 className="text-2xl font-bold mb-2">DSA Foundation</h2>
                <p className="text-blue-100 text-sm">Học thật, làm thật</p>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">Giảng viên: {course.instructor}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    <Trophy className="w-4 h-4" /> Top 10% Lớp
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {course.description}
                </p>

                {/* Thanh tiến độ (Progress Bar) */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700">Tiến độ khóa học</span>
                    <span className="text-blue-600 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3"/> Đã học: {course.completedLessons}/{course.totalLessons} bài</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Ước tính: 12 giờ còn lại</span>
                  </div>
                </div>
              </div>

              {/* Nút Call-to-Action dẫn thẳng tới trang Quiz */}
              <div className="flex justify-end border-t border-gray-100 pt-4 mt-2">
                <Link 
                  // Đường dẫn này nối thẳng qua cái file quiz ông làm lúc nãy
                  href={`/student/quiz/${course.nextQuizId}`} 
                  className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-blue-500/30"
                >
                  <PlayCircle className="w-5 h-5" />
                  Làm Quiz: Stack & Queue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}