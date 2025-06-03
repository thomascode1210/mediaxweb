"use client";

import React, { useState } from "react";
import {
  CloseOutlined,
  ReportGmailerrorred,
} from "@mui/icons-material";
import { warehouseCreate } from "../../lib/data/warehouses";

interface PopupCreateBranchProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const PopupCreateBranch: React.FC<PopupCreateBranchProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    branchCode: "",
    phoneNumber: "",
    district: "",
    ward: "",
    address: "",
    description: "",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Không tìm thấy token xác thực");

      const apiData = {
        name: formData.name,
        description: `${formData.description || ''} - Mã chi nhánh: ${formData.branchCode}`,
        address: {
          name: formData.name,
          addressable_type: "warehouse",
          phone_number: formData.phoneNumber,
          province_code: 1,
          province_name: "Hà Nội",
          district_code: 1,
          district_name: formData.district || "Quận Ba Đình",
          ward_code: "00001",
          ward_name: formData.ward || "Phường Phúc Xá",
          address: formData.address || "Chưa có địa chỉ cụ thể",
        }
      };

      await warehouseCreate(token, apiData);

      setFormData({
        name: "",
        branchCode: "",
        phoneNumber: "",
        district: "",
        ward: "",
        address: "",
        description: "",
        isDefault: false,
      });

      onCreate();
      onClose();
    } catch (err: any) {
      setError(err.message || "Không thể tạo chi nhánh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
      <div className="relative w-full max-w-[612px] bg-white rounded-3xl shadow-[0_2px_0_#D9D9D9] p-6 pb-0">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Tạo chi nhánh</h2>
          <button onClick={onClose} className="text-gray-600">
            <CloseOutlined />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded flex items-center gap-2">
            <ReportGmailerrorred fontSize="small" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Tên chi nhánh</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quận/Huyện</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mã chi nhánh</label>
            <input
              type="text"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phường/Xã</label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-[#3C3C4359] rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="size-4 border border-[#3C3C4359] rounded-md"
            />
            <label className="block font-medium text-sm">
              Chọn làm chi nhánh mặc định
            </label>
          </div>
        </div>

        <p className="text-sm mt-4">
          Lưu ý: Sau khi chỉnh sửa mã chi nhánh sẽ không thể sửa về mã có tiền tố CN
        </p>

        <div className="flex gap-4 justify-end py-6 rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-[#338BFF] border border-[#338BFF] bg-white px-2.5 py-1 rounded-md font-semibold min-w-20"
            disabled={loading}
          >
            Thoát
          </button>
          <button
            onClick={handleCreate}
            className="bg-[#338BFF] text-white px-2.5 py-1 rounded-md font-semibold hover:bg-[#66B2FF] min-w-20"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCreateBranch;
