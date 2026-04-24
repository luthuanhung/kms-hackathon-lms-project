"use client";

import React, { useState } from "react";
import { Save, Eye, PlusCircle, CheckCircle2, Circle } from "lucide-react";

export default function QuizBuilderPage() {
  // State quản lý nội dung Multiple Choice
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);

  // Cập nhật text cho từng đáp án
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveQuiz = async () => {
    // Payload sạch sẽ, chỉ chứa Câu hỏi và Đáp án
    const payload = {
      type: "MULTIPLE_CHOICE",
      question: questionText,
      options: options,
      solution: correctOptionIndex,
    };

    console.log("Saving Quiz Data:", payload);
    alert("Đã lưu câu hỏi thành công!\n\n");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* KHU VỰC TRÁI: BUILDER (Soạn thảo) */}
      <div className="w-full md:w-1/2 p-6 bg-white border-r overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            Trình Tạo Câu Hỏi
          </h1>
          <button 
            onClick={handleSaveQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            <Save className="w-4 h-4" /> Lưu Câu Hỏi
          </button>
        </div>

        <div className="space-y-8">
          {/* Vùng nhập Câu Hỏi */}
          <div>
            <label className="block text-base font-bold text-gray-800 mb-2">Nội dung câu hỏi</label>
            <textarea 
              rows={4}
              value={questionText} 
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Nhập nội dung câu hỏi của bạn vào đây..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-shadow"
            />
          </div>

          {/* Vùng nhập Đáp Án */}
          <div>
            <label className="block text-base font-bold text-gray-800 mb-1">Các đáp án</label>
            <p className="text-sm text-gray-500 mb-4">Tích chọn vào biểu tượng hình tròn để đánh dấu đáp án đúng.</p>
            
            <div className="space-y-3">
              {options.map((opt, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                    correctOptionIndex === idx ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button 
                    type="button"
                    onClick={() => setCorrectOptionIndex(idx)}
                    className={`flex-shrink-0 transition-colors ${
                      correctOptionIndex === idx ? 'text-green-600' : 'text-gray-300 hover:text-gray-500'
                    }`}
                    title="Đánh dấu là đáp án đúng"
                  >
                    {correctOptionIndex === idx ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <input 
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Nhập đáp án ${String.fromCharCode(65 + idx)}...`}
                    className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-gray-800 placeholder-gray-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KHU VỰC PHẢI: LIVE PREVIEW (Xem trước) */}
      <div className="w-full md:w-1/2 p-6 bg-gray-100 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5" /> Live Preview
        </h2>
        
        <div className="flex-1 bg-white border rounded-xl shadow-sm p-8 flex flex-col justify-center">
          {questionText || options.some(opt => opt !== "") ? (
            <div className="w-full max-w-lg mx-auto">
              {/* Hiển thị câu hỏi */}
              <h3 className="text-lg font-semibold text-gray-800 mb-6 whitespace-pre-wrap">
                {questionText || <span className="text-gray-400 italic">Đang chờ nhập câu hỏi...</span>}
              </h3>
              
              {/* Hiển thị các nút đáp án giả lập */}
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div 
                    key={idx}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-default"
                  >
                    <span className="font-semibold mr-3 text-gray-500">{String.fromCharCode(65 + idx)}.</span>
                    <span className="text-gray-700">{opt || <span className="text-gray-300 italic">...</span>}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>Hãy nhập câu hỏi bên trái để xem trước giao diện tại đây.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}