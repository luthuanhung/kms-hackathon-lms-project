"use client";

import React, { useState } from "react";
import { Save, Eye, PlusCircle, AlertCircle, BrainCircuit } from "lucide-react";
import OrderingWidget from "@/components/questions/OderingWidget";

export default function QuizBuilderPage() {
  // State quản lý cấu hình chung của câu hỏi
  const [quizType, setQuizType] = useState("ORDERING");
  const [difficulty, setDifficulty] = useState(3);
  const [topicId, setTopicId] = useState("");
  const [solutionHint, setSolutionHint] = useState("");

  // State quản lý nội dung chi tiết (Dùng tạm cho dạng Ordering)
  const [orderingItems, setOrderingItems] = useState([
    "Khởi tạo biến",
    "Gán giá trị",
    "Thực thi vòng lặp",
    "In kết quả"
  ]);

  const handleSaveQuiz = async () => {
    // Payload chuẩn bị gửi xuống Backend
    const payload = {
      topic_id: topicId,
      type: quizType,
      difficulty_level: difficulty,
      content: JSON.stringify({ items: orderingItems }),
      solution_hint: solutionHint,
    };

    console.log("Saving Quiz Data:", payload);
    alert("Đã lưu câu hỏi thành công! API đã sẵn sàng nhận cục data này.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* KHU VỰC TRÁI: BUILDER (Soạn thảo) */}
      <div className="w-full md:w-1/2 p-6 bg-white border-r overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            Trình Tạo Câu Hỏi
          </h1>
          <button 
            onClick={handleSaveQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Save className="w-4 h-4" /> Lưu Câu Hỏi
          </button>
        </div>

        <div className="space-y-5">
          {/* Cấu hình cơ bản */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dạng Bài (Anti-Brainrot)</label>
              <select 
                value={quizType} 
                onChange={(e) => setQuizType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="ERROR_HUNT">Spot the Error (Tìm lỗi sai)</option>
                <option value="ORDERING">Sequencing (Sắp xếp quy trình)</option>
                <option value="MATCHING">Concept Matching (Ghép nối tư duy)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Độ khó (1-5)</label>
              <input 
                type="number" min="1" max="5" 
                value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic ID (Phân loại)</label>
            <input 
              type="text" placeholder="Nhập UUID của Topic..." 
              value={topicId} onChange={(e) => setTopicId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Dữ liệu cho Socratic AI */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <label className="flex items-center gap-2 text-sm font-bold text-blue-800 mb-2">
              <BrainCircuit className="w-5 h-5" />
              Gợi ý cho Socratic AI (solution_hint)
            </label>
            <p className="text-xs text-blue-600 mb-2">
              Nhập bản chất cốt lõi của câu hỏi này. Khi sinh viên làm sai nhưng chọn "Tự tin cao", AI sẽ dùng dữ liệu này để hỏi ngược lại sinh viên.
            </p>
            <textarea 
              rows={4}
              value={solutionHint}
              onChange={(e) => setSolutionHint(e.target.value)}
              placeholder="VD: Cốt lõi ở đây là vòng lặp phải được khởi tạo trước khi gọi..."
              className="w-full border border-blue-200 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* KHU VỰC PHẢI: LIVE PREVIEW (Xem trước) */}
      <div className="w-full md:w-1/2 p-6 bg-gray-100 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5" /> Live Preview
        </h2>
        
        <div className="flex-1 bg-white border rounded-xl shadow-sm p-8 flex flex-col justify-center items-center">
          {/* Cảnh báo nếu chưa có Topic */}
          {!topicId && (
            <div className="mb-6 w-full bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Hãy nhập Topic ID để hệ thống có thể theo vết kiến thức (Knowledge Tracing).
              </p>
            </div>
          )}

          {/* Render Component linh động dựa theo quizType */}
          <div className="w-full max-w-md w-full">
            {quizType === "ORDERING" ? (
              <div className="w-full">
                 <h3 className="text-lg font-medium mb-4 text-gray-800">Sắp xếp các bước sau theo đúng thứ tự logic:</h3>
                 {/* Gọi Widget mà ông vừa code xong hồi nãy */}
                 <OrderingWidget 
                    items={orderingItems} 
                    onSubmit={(data) => console.log("Học sinh nộp bài thử:", data)} 
                 />
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10 border-2 border-dashed border-gray-200 rounded-lg">
                 <p>Component cho <b>{quizType}</b> đang được phát triển...</p>
                 <p className="text-sm mt-2">Dùng AI Vibe Coding để render ErrorHuntWidget hoặc MatchingWidget vào đây.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}