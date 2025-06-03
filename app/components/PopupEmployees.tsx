"use client";

import React, { useRef, useEffect } from "react";
import { User } from "../lib/data/users";
// import { User } from "@/app/lib/definitions";

interface PopupEmployeesProps {
  employees?: User[];
  onSelectEmployee: (employee: User) => void;
  onClose: () => void;
}

export default function PopupEmployees({
  employees,
  onSelectEmployee,
  onClose
}: PopupEmployeesProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // click ngoài -> đóng
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSelect = (emp: User) => {
    onSelectEmployee(emp);
    onClose();
  };

  return (
    <div
      ref={popupRef}
      className="absolute w-full bg-white border border-gray-300 rounded-md max-h-80 overflow-auto p-2 z-50"
    >
      {(employees || []).length === 0 && (
        <div className="p-2 text-center text-gray-500">Không tìm thấy nhân viên</div>
      )}

      {(employees || []).map((emp) => (
          <div
            key={emp.user_id}
            className="flex flex-col p-2 hover:bg-gray-100 cursor-pointer border-b"
            onClick={() => handleSelect(emp)}
          >
            <div className="text-black">{emp.user_name}</div>
            <div className="text-[#3C3C4359]">{emp.email || "-"}</div>
          </div>
        ))}
    </div>
  );
}
