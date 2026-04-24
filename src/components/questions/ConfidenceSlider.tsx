import React from "react";

type ConfidenceSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function ConfidenceSlider({ value, onChange }: ConfidenceSliderProps) {
  return (
    <div className="my-4">
      <label className="block mb-2 font-medium">
        Mức độ tự tin: <span className="font-bold">{value}%</span>
      </label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}