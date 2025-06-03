"use client";

import { warehouseDelete, warehouseDetail, warehouseUpdate } from "@/app/lib/data/warehouses";
import {
  CheckCircleOutline,
  CloseOutlined,
  ReportGmailerrorred,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

interface PopupEditBranchProps {
  isOpen: boolean;
  onClose: () => void;
  branchId: string | null;
}

export default function PopupEditBranch({
  isOpen,
  onClose,
  branchId,
}: PopupEditBranchProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !branchId) return;
    const token = localStorage.getItem("access_token") || "";
    warehouseDetail(token, branchId)
      .then((branch) => {
        setFormData({
          name: branch.name || "",
          branchCode: branch.warehouse_id || "",
          phoneNumber: branch.address?.phone_number || "",
          district: branch.address?.district_name || "",
          ward: branch.address?.ward_name || "",
          address: branch.address?.address || "",
          description: branch.description || "",
          isDefault: false, // Assuming default is false initially
        });
      })
      .catch((err) => {
        console.error("Error fetching branch details:", err);
        setError("Không thể tải thông tin chi nhánh. Vui lòng thử lại sau.");
      });
  }, [isOpen, branchId]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Không tìm thấy token xác thực");

      const apiData = {
        name: formData.name,
        description: `${formData.description || ""} - Mã chi nhánh: ${
          formData.branchCode
        }`,
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
        },
      };

      await warehouseUpdate(token, branchId!, apiData);

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

      //   onCreate();
      setMessage("Cập nhật chi nhánh thành công!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Không thể tạo chi nhánh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!branchId) return;

    const token = localStorage.getItem("access_token") || "";
    try {
      setLoading(true);
      setError(null);

      // Assuming you have a delete function similar to warehouseUpdate
      await warehouseDelete(token, branchId);

      setMessage("Xóa chi nhánh thành công!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Không thể xóa chi nhánh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
      <div className="relative w-full max-w-[612px] bg-white rounded-3xl shadow-[0_2px_0_#D9D9D9] p-6 pb-0">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Thông tin chi nhánh</h2>
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

        {message && (
          <div className="mb-4 p-2 bg-green-100 text-green-600 rounded flex items-center gap-2">
            <CheckCircleOutline fontSize="small" />
            <span>{message}</span>
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
          Lưu ý: Sau khi chỉnh sửa mã chi nhánh sẽ không thể sửa về mã có tiền
          tố CN
        </p>

        <div className="flex gap-4 justify-end py-6 rounded-b-2xl">
          <button
            onClick={handleDelete}
            className="text-red-500 border border-red-500 bg-white px-2.5 py-1 rounded-md font-semibold min-w-20"
            disabled={loading}
          >
            Xóa
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#338BFF] text-white px-2.5 py-1 rounded-md font-semibold hover:bg-[#66B2FF] min-w-20"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu chỉnh sửa"}
          </button>
        </div>
      </div>
    </div>
  );
}
