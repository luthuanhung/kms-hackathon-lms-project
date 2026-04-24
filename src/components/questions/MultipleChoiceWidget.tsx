"use client";

import React, { useState } from "react";
import ConfidenceSlider from "./ConfidenceSlider";

type Props = {
  question: string;
  options: string[];
  onSubmit: (result: { answer: number; confidence_score: number; time_spent: number }) => void;
};

export default function MultipleChoiceWidget({ question, options, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [start] = useState(() => Date.now());

  const handleSubmit = () => {
    if (selected === null) return;
    const time_spent = Math.floor((Date.now() - start) / 1000);
    onSubmit({ answer: selected, confidence_score: confidence, time_spent });
  };

  return (
    <div>
      <div className="mb-4 font-semibold text-lg">{question}</div>
      <div className="space-y-2 mb-4">
        {options.map((opt, idx) => (
          <label key={idx} className={`flex items-center p-2 border rounded cursor-pointer transition ${selected === idx ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50 border-gray-200"}`}>
            <input
              type="radio"
              name="mcq"
              value={idx}
              checked={selected === idx}
              onChange={() => setSelected(idx)}
              className="mr-3 accent-blue-500"
            />
            <span>{String.fromCharCode(65 + idx)}. {opt}</span>
          </label>
        ))}
      </div>
      <ConfidenceSlider value={confidence} onChange={setConfidence} />
      <button className="mt-4 btn btn-primary" onClick={handleSubmit} disabled={selected === null}>
        Nộp bài
      </button>
    </div>
  );
}
