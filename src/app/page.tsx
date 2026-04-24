'use client';

import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">AI Education LMS</h1>
          <p className="text-xl text-blue-100">Choose your role to get started</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Role */}
          <Link href="/student">
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition transform hover:scale-105 cursor-pointer h-full">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-500 p-6 rounded-full">
                  <GraduationCap className="text-white" size={48} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Student</h2>
              <p className="text-gray-600 text-center mb-6">
                Enroll in courses, track your progress, and earn certificates as you master new skills with AI-powered personalized learning paths.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Access course content and materials</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Track learning progress</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Earn certificates and badges</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-3">✓</span>
                  <span>Get personalized recommendations</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition">
                Continue as Student
              </button>
            </div>
          </Link>

          {/* Teacher Role */}
          <Link href="/teacher">
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition transform hover:scale-105 cursor-pointer h-full">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-500 p-6 rounded-full">
                  <Briefcase className="text-white" size={48} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Instructor</h2>
              <p className="text-gray-600 text-center mb-6">
                Create and manage courses, monitor student progress, and utilize AI tools to enhance your teaching effectiveness and student engagement.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-3">✓</span>
                  <span>Create and manage courses</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-3">✓</span>
                  <span>Monitor student progress</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-3">✓</span>
                  <span>Generate AI-powered assessments</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-3">✓</span>
                  <span>Analytics and insights</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition">
                Continue as Instructor
              </button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-100">
          <p>© 2026 AI Education LMS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
