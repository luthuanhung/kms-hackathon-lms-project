import React, { useState, useEffect } from "react";
import ConfidenceSlider from "./ConfidenceSlider";

type Props = {
  premises: string[];
  responses: string[];
  onSubmit: (result: { answer: [number, number][]; confidence_score: number; time_spent: number }) => void;
};

export default function MatchingWidget({ premises, responses, onSubmit }: Props) {
  const [matches, setMatches] = useState<(number | null)[]>(Array(premises.length).fill(null));
  const [confidence, setConfidence] = useState(50);
  const [start, setStart] = useState<number>(0); 
  
      useEffect(() => {
        // Chỉ lấy thời gian MỘT LẦN duy nhất khi component đã render xong trên trình duyệt
        setStart(Date.now());
      }, []);

  const handleSelect = (premiseIdx: number, responseIdx: number) => {
    const newMatches = [...matches];
    newMatches[premiseIdx] = responseIdx;
    setMatches(newMatches);
  };

  const handleSubmit = () => {
    const time_spent = Math.floor((Date.now() - start) / 1000);
    const answer: [number, number][] = matches
      .map((respIdx, premiseIdx) =>
        respIdx !== null ? [premiseIdx, respIdx] as [number, number] : null
      )
      .filter(Boolean) as [number, number][];
    onSubmit({ answer, confidence_score: confidence, time_spent });
  };

  return (
    <div>
      <div className="flex gap-8 mb-4">
        <div>
          <h4 className="font-semibold mb-2">Premises</h4>
          <ul className="space-y-2">
            {premises.map((p, i) => (
              <li key={i} className="p-2 border rounded bg-gray-50">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Responses</h4>
          <ul className="space-y-2">
            {responses.map((r, i) => (
              <li key={i} className="p-2 border rounded bg-gray-50">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Match</h4>
          <ul className="space-y-2">
            {premises.map((_, premiseIdx) => (
              <li key={premiseIdx}>
                <select
                  className="input input-bordered"
                  value={matches[premiseIdx] ?? ""}
                  onChange={e =>
                    handleSelect(premiseIdx, Number(e.target.value))
                  }
                >
                  <option value="">--Chọn--</option>
                  {responses.map((_, respIdx) => (
                    <option key={respIdx} value={respIdx}>
                      {respIdx + 1}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ConfidenceSlider value={confidence} onChange={setConfidence} />
      <button className="mt-4 btn btn-primary" onClick={handleSubmit}>
        Nộp bài
      </button>
    </div>
  );
}