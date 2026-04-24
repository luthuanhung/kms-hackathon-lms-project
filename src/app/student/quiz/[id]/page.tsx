'use client';

import React, { useState } from 'react';
import QuestionRenderer from '@/components/questions/QuestionRenderer';

// Multiple Choice Quiz Data (Giữ nguyên)
const quizData = {
  title: 'Stack & Queue Multiple Choice Quiz',
  questions: [
    {
      type: 'MULTIPLE_CHOICE',
      question: 'The minimum number of stacks needed to implement a queue is:',
      options: ['3', '1', '2', '4'],
      solution: 2,
    },
    {
      type: 'MULTIPLE_CHOICE',
      question: 'Which of the following is true about linked list implementation of stack?',
      options: [
        'In push operation, if new nodes are inserted at the beginning of linked list, then in pop operation, nodes must be removed from end.',
        'In push operation, if new nodes are inserted at the end, then in pop operation, nodes must be removed from the beginning.',
        'Both of the above',
        'None of the above',
      ],
      solution: 3,
    },
    {
      type: 'MULTIPLE_CHOICE',
      question: 'Which one of the following is an application of Stack Data Structure?',
      options: [
        'Managing function calls',
        'The stock span problem',
        'Arithmetic expression evaluation',
        'All of the above',
      ],
      solution: 3,
    },
    {
      type: 'MULTIPLE_CHOICE',
      question: 'The five items: A, B, C, D, and E are pushed in a stack, one after other starting from A. The stack is popped four items and each element is inserted in a queue. The two elements are deleted from the queue and pushed back on the stack. Now one item is popped from the stack. The popped item is:',
      options: ['A', 'B', 'C', 'D'],
      solution: 1,
    },
    {
      type: 'MULTIPLE_CHOICE',
      question: 'Stack A has the entries a, b, c (with a on top). Stack B is empty. An entry popped out of stack A can be printed immediately or pushed to stack B. An entry popped out of the stack B can only be printed. In this arrangement, which of the following permutations of a, b, c are not possible?',
      options: ['b a c', 'b c a', 'c a b', 'a b c'],
      solution: 2,
    },
    {
      type: 'MULTIPLE_CHOICE',
      question: 'The five items: A, B, C, D, and E are pushed in a stack, one after other starting from A. The stack is popped four items and each element is inserted in a queue. The two elements are deleted from the queue and pushed back on the stack. Now one item is popped from the stack. The popped item is:',
      options: ['A', 'B', 'C', 'D'],
      solution: 1,
    },
    {
      type: 'MULTIPLE_CHOICE',
      question: 'Which of the following is TRUE?',
      options: [
        'The cost of searching an AVL tree is θ(log n) but that of a binary search tree is O(n)',
        'The cost of searching an AVL tree is θ(log n) but that of a complete binary tree is θ(n log n)',
        'The cost of searching a binary search tree is O(log n) but that of an AVL tree is θ(n)',
        'The cost of searching an AVL tree is θ(n log n) but that of a binary search tree is O(n)',
      ],
      solution: 0,
    },
  ],
};

export default function StudentQuizPage({ params }: { params: { id: string } }) {
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [finished, setFinished] = useState(false);

  const question = quizData.questions[current];

  const handleSubmit = async (result: { answer: any; confidence_score: number; time_spent: number }) => {
    let is_correct = false;
    
    // Đã thêm logic chấm điểm cho MULTIPLE_CHOICE
    if (question.type === 'MULTIPLE_CHOICE' || question.type === 'ERROR_HUNT') {
      is_correct = String(result.answer) === String(question.solution);
    } else if (question.type === 'ORDERING' || question.type === 'MATCHING') {
      is_correct = JSON.stringify(result.answer) === JSON.stringify(question.solution);
    }

    // ĐÃ XÓA FETCH Socratic AI THEO YÊU CẦU

    setResults([...results, { ...result, is_correct }]);
    if (current < quizData.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  // Tính toán thống kê "Anti-Brainrot"
  const totalQuestions = quizData.questions.length;
  const correctCount = results.filter(r => r.is_correct).length;
  
  // Tránh chia cho 0 nếu mảng rỗng
  const avgConfidence = results.length > 0 
    ? Math.round(results.reduce((acc, curr) => acc + curr.confidence_score, 0) / results.length) 
    : 0;
  
  const overconfidentCount = results.filter(r => !r.is_correct && r.confidence_score >= 80).length;
  const luckyCount = results.filter(r => r.is_correct && r.confidence_score <= 40).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {quizData.title}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {finished
            ? 'Hoàn thành bài kiểm tra! Xem phân tích nhận thức bên dưới.'
            : `Câu hỏi ${current + 1} / ${totalQuestions}`}
        </p>

        {!finished ? (
          <div>
            <QuestionRenderer question={question} onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Báo Cáo Nhận Thức (Cognitive Report)</h2>
            
            {/* THỐNG KÊ TỔNG QUAN */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600 font-semibold mb-1">Điểm số</p>
                <p className="text-2xl font-bold text-blue-800">{correctCount}/{totalQuestions}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <p className="text-sm text-purple-600 font-semibold mb-1">Tự tin TB</p>
                <p className="text-2xl font-bold text-purple-800">{avgConfidence}%</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <p className="text-sm text-red-600 font-semibold mb-1" title="Sai nhưng tự tin > 80%">Nhầm lẫn</p>
                <p className="text-2xl font-bold text-red-800">{overconfidentCount} câu</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-600 font-semibold mb-1" title="Đúng nhưng tự tin < 40%">Đoán lụi</p>
                <p className="text-2xl font-bold text-yellow-800">{luckyCount} câu</p>
              </div>
            </div>

            {/* PHÂN TÍCH CHI TIẾT CÁC CÂU CẦN CHÚ Ý */}
            {(overconfidentCount > 0 || luckyCount > 0) && (
              <div className="mb-8 text-left bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  ⚠️ Hệ thống chẩn đoán:
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                  {overconfidentCount > 0 && (
                    <li>Bạn có <b>{overconfidentCount}</b> câu hổng kiến thức nghiêm trọng (Rất tự tin nhưng làm sai). Cần ưu tiên xem lại tài liệu ngay lập tức.</li>
                  )}
                  {luckyCount > 0 && (
                    <li>Bạn có <b>{luckyCount}</b> câu ăn may (Làm đúng nhưng không tự tin). Kiến thức phần này chưa vững, rủi ro làm sai ở bài thi thật là rất cao.</li>
                  )}
                </ul>
              </div>
            )}

            {/* CHI TIẾT TỪNG CÂU */}
            <div className="space-y-3">
              {results.map((r, idx) => (
                <div key={idx} className={`p-4 border rounded-lg text-left flex justify-between items-center ${r.is_correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div>
                    <div className="font-semibold text-gray-800">Câu {idx + 1}</div>
                    <div className="text-xs text-gray-500 mt-1">Thời gian: {r.time_spent}s</div>
                  </div>
                  <div className="text-right">
                    {r.is_correct ? (
                      <span className="inline-block px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded">ĐÚNG</span>
                    ) : (
                      <span className="inline-block px-2 py-1 bg-red-200 text-red-800 text-xs font-bold rounded">SAI</span>
                    )}
                    <div className="text-sm font-medium mt-1 text-gray-700">
                      Tự tin: <span className={r.confidence_score >= 80 ? 'text-blue-600' : r.confidence_score <= 40 ? 'text-orange-500' : ''}>{r.confidence_score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/student"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
              >
                Về Dashboard Rèn Luyện
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}