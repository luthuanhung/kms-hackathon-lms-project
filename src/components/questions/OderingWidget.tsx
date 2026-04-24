"use client";

import React, { useState, useEffect } from "react";
import ConfidenceSlider from "./ConfidenceSlider";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

type Props = {
  items: string[];
  onSubmit: (result: { answer: string[]; confidence_score: number; time_spent: number }) => void;
};

function reorder(list: string[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}


export default function OrderingWidget({ items, onSubmit }: Props) {
  const [order, setOrder] = useState(items);
  const [confidence, setConfidence] = useState(50);
  // Khởi tạo start ngay khi mount, không cần effect
  const [start] = useState(() => Date.now());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setOrder(reorder(order, result.source.index, result.destination.index));
  };

  // CHỈ GIỮ LẠI ĐÚNG 1 HÀM handleSubmit (Phiên bản an toàn)
  const handleSubmit = async () => {
    if (typeof onSubmit !== 'function') {
      console.error("🚨 Lỗi: Chưa truyền prop onSubmit vào OrderingWidget!");
      alert("Lỗi hệ thống: Không tìm thấy hàm xử lý nộp bài.");
      return;
    }

    const current_time = Date.now();
    const time_spent = start === 0 || start > current_time 
      ? 0 
      : Math.floor((current_time - start) / 1000);

    try {
      await onSubmit({ answer: order, confidence_score: confidence, time_spent });
    } catch (error) {
      console.error("🚨 Lỗi khi thực thi onSubmit từ Component cha:", error);
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ordering-list">
          {(provided) => (
            <ul
              className="space-y-2 mb-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {order.map((item, idx) => (
                <Draggable key={item} draggableId={item} index={idx}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 border rounded bg-white ${
                        snapshot.isDragging ? "bg-blue-50" : ""
                      }`}
                    >
                      {item}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      
      <ConfidenceSlider value={confidence} onChange={setConfidence} />
      
      <button className="mt-4 btn btn-primary" onClick={handleSubmit}>
        Nộp bài
      </button>
    </div>
  );
}