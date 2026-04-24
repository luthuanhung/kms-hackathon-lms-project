'use client';

import React, { useState } from 'react';
import QuestionRenderer from '@/components/questions/QuestionRenderer';

// Multiple Choice Quiz Data
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
    // Kiểm tra đúng/sai cho MULTIPLE_CHOICE
    let is_correct = false;
    if (question.type === 'MULTIPLE_CHOICE') {
      is_correct = result.answer === question.solution;
    }

    // Nếu tự tin cao mà sai, gọi Socratic AI Engine
    if (result.confidence_score >= 80 && !is_correct) {
      await fetch('/api/ask-socratic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          answer: result.answer,
          confidence_score: result.confidence_score,
          time_spent: result.time_spent,
        }),
      });
    }

    setResults([...results, { ...result, is_correct }]);
    if (current < quizData.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{quizData.title}</h1>
      {!finished ? (
        <div>
          <div className="mb-4 text-lg font-semibold">
            Câu hỏi {current + 1} / {quizData.questions.length}
          </div>
          <QuestionRenderer question={question} onSubmit={handleSubmit} />
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bạn đã hoàn thành Quiz!</h2>
          <div className="mb-4">
            Đúng: {results.filter(r => r.is_correct).length} / {quizData.questions.length}
          </div>
          <div className="space-y-2">
            {results.map((r, idx) => (
              <div key={idx} className="p-3 border rounded bg-gray-50">
                <div>
                  <span className="font-semibold">Câu {idx + 1}:</span>{' '}
                  {r.is_correct ? (
                    <span className="text-green-600 font-bold">Đúng</span>
                  ) : (
                    <span className="text-red-600 font-bold">Sai</span>
                  )}
                </div>
                <div>Mức tự tin: {r.confidence_score}%</div>
                <div>Thời gian: {r.time_spent}s</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}