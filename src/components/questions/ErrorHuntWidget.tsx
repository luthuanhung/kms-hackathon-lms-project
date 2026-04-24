import React, { useState, useEffect } from "react";
import ConfidenceSlider from "./ConfidenceSlider";

type Props = {
  lines: string[];
  correct_error_line_index: number;
  onSubmit: (result: { answer: number; confidence_score: number; time_spent: number }) => void;
};

export default function ErrorHuntWidget({ lines, correct_error_line_index, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [start, setStart] = useState(Date.now());

  useEffect(() => {
    setStart(Date.now());
  }, []);

  const handleSubmit = () => {
    if (selected === null) return;
    const time_spent = Math.floor((Date.now() - start) / 1000);
    onSubmit({ answer: selected, confidence_score: confidence, time_spent });
  };

  return (
    <div>
      <div className="space-y-2 mb-4">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`p-2 rounded cursor-pointer border transition ${
              selected === idx
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-50 border-gray-200"
            }`}
            onClick={() => setSelected(idx)}
          >
            <code>{line}</code>
          </div>
        ))}
      </div>
      <ConfidenceSlider value={confidence} onChange={setConfidence} />
      <button
        className="mt-4 btn btn-primary"
        onClick={handleSubmit}
        disabled={selected === null}
      >
        Nộp bài
      </button>
    </div>
  );
}