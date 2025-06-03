"use client";
import { Icons } from "@/app/components/icons";
import {
  CheckCircleOutlined,
  ReportGmailerrorred,
  CloseOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { userList, userUpdate, User } from "@/app/lib/data/users";
import PopupChangePassword from "@/app/ui/account/change-password";

export default function UserInfomation() {
  const [userData, setUserData] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone_number: "",
    area: "",
    ward: "",
    address: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);

  const handleCloseChangePassword = () => {
    setIsChangePassOpen(false);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const users = await userList(token, 0, 10);

        // admin role 0
        const adminUser = users.find((user) => user.role === 0);

        if (adminUser) {
          console.log("Admin user found:", adminUser);
          setUserData(adminUser);
          setFormData({
            user_name: adminUser.user_name || "",
            email: adminUser.email || "",
            phone_number: "",
            area: "",
            ward: "",
            address: "",
          });
        } else {
          setError("Không tìm thấy tài khoản chủ cửa hàng.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Lỗi hệ thống, thử lai lại sau!");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!userData) return;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const payload: any = {
        user_name: formData.user_name,
        email: formData.email,
        phone_number: formData.phone_number,
        area: formData.area,
        ward: formData.ward,
        address: formData.address,
      };

      await userUpdate(token, userData.user_id, payload);
      setMessage("Cập nhật thông tin thành công!");
      setMessageType("success");

      setUserData((prev) =>
        prev
          ? {
              ...prev,
              user_name: formData.user_name,
              email: formData.email,
            }
          : null
      );
    } catch (err) {
      console.error("Error updating user data:", err);
      setMessage("Cập nhật thông tin thất bại!");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full items-center justify-center p-10">
        <p>Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full items-center justify-center p-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full relative">
        {message && (
          <div
            className={`toast-message ${
              messageType === "success"
                ? "success"
                : messageType === "error"
                ? "error"
                : ""
            }`}
          >
            {messageType === "success" ? (
              <CheckCircleOutlined style={{ color: "#1A73E8", fontSize: 20 }} />
            ) : (
              <ReportGmailerrorred style={{ color: "#D93025", fontSize: 20 }} />
            )}
            <span>{message}</span>
            <CloseOutlined
              className="close-btn"
              style={{ fontSize: 16, cursor: "pointer", color: "#5F6368" }}
              onClick={() => setMessage("")}
            />
          </div>
        )}

        <p className="text-2xl font-bold mb-2">Thông tin tài khoản</p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <p className="text-xl font-semibold col-span-1">Thông tin cá nhân</p>

          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-[0_2px_0_#D9D9D9] p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Họ và tên</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Họ và tên"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Email</p>
                <input
                  type="email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Số điện thoại</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Số điện thoại"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Khu vực</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-semibold">Phường/Xã</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold">Địa chỉ</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between pt-5 border-t">
              <button
                onClick={() => setIsChangePassOpen(true)}
                className="text-blue-500 font-semibold cursor-pointer"
              >
                Đổi mật khẩu
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-[#338BFF] text-white py-2 px-4 rounded-md hover:bg-[#2376e6] transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-1">
            <p className="text-xl font-semibold">Liên kết tài khoản</p>
            <p className="text-gray-500 text-sm">
              Kết nối dịch vụ đăng nhập bên ngoài để truy cập nhanh chóng và an
              toàn vào tài khoản POSX của bạn.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-[0_2px_0_#D9D9D9] p-6 flex flex-col gap-6">
            <button className="flex items-center gap-2 w-full mt-2 bg-white justify-between">
              <div className="flex items-center gap-2">
                <Icons.facebook className="size-5" />
                <span>Tài khoản của bạn chưa liên kết với Facebook</span>
              </div>
              <span className="text-blue-500 font-medium">Liên kết ngay</span>
            </button>

            <div className="border" />

            <button className="flex items-center gap-2 w-full mt-2 bg-white justify-between">
              <div className="flex items-center gap-2">
                <Icons.google className="size-4" />
                <span>Tài khoản của bạn chưa liên kết với Google</span>
              </div>
              <span className="text-blue-500 font-medium">Liên kết ngay</span>
            </button>
          </div>
        </div>
      </div>

      {isChangePassOpen && (
        <PopupChangePassword
          isOpen={isChangePassOpen}
          onClose={handleCloseChangePassword}
        />
      )}
    </>
  );
}
