"use client";

import {
  AccountCircleOutlined,
  CallOutlined,
  CheckCircleOutline,
  CheckCircleOutlined,
  CloseOutlined,
  LanguageOutlined,
  MailOutline,
  ReportGmailerrorred,
  SellOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { createPayment } from "@/app/lib/data/payment";
import { useState } from "react";

export default function RenewPlan() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSelectPlan = (planIndex: number) => {
    setSelectedPlan(planIndex);
  };

  const handlePayment = async () => {
    if (selectedPlan === null) {
      setMessage("Vui lòng chọn gói gia hạn.");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const paymentData = {
        payer_id: "user_123",
        receiver_id: "posx_system",
        payment_method: "online_banking",
        payment_status: "pending",
        payment_amount: 14400000,
        payment_reference: "plan_renewal",
        payment_note: "Gia hạn gói phần mềm POSX"
      };
      const result = await createPayment(token, paymentData);
      console.log("Payment created:", result);
      setMessage("Thanh toán thành công!");
      setMessageType("success");
      
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Lỗi hệ thống thánh toán. Vui lòng thử lại sau.");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };
  return (
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
            <CheckCircleOutlined
              style={{ color: "#1A73E8", fontSize: 20 }}
            />
          ) : (
            <ReportGmailerrorred
              style={{ color: "#D93025", fontSize: 20 }}
            />
          )}
          <span>{message}</span>
          <CloseOutlined
            className="close-btn"
            style={{ fontSize: 16, cursor: "pointer", color: "#5F6368" }}
            onClick={() => setMessage("")}
          />
        </div>
      )}
      <p className="text-2xl font-bold mb-2">Gia hạn gói phần mềm</p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <div className="p-6 bg-white flex flex-col gap-4 rounded-2xl shadow-[0_2px_0_#D9D9D9]">
            <p className="text-xl font-semibold">Thông tin khách hàng</p>

            <div className="flex flex-col">
              <div className="flex gap-4 items-center justify-between py-4 border-b">
                <div className="flex gap-2 items-center">
                  <AccountCircleOutlined />
                  <span className="font-medium">Tên khách hàng</span>
                </div>

                <p className="font-semibold">Trần Hương Giang</p>
              </div>

              <div className="flex gap-4 items-center justify-between py-4 border-b">
                <div className="flex gap-2 items-center">
                  <CallOutlined />
                  <span className="font-medium">Số điện thoại</span>
                </div>

                <p className="font-semibold">09748413016</p>
              </div>

              <div className="flex gap-4 items-center justify-between py-4 border-b">
                <div className="flex gap-2 items-center">
                  <MailOutline />
                  <span className="font-medium">Email</span>
                </div>

                <p className="font-semibold">tranhuonggianvn@gmail.com</p>
              </div>

              <div className="flex gap-4 items-center justify-between pt-4 pb-0">
                <div className="flex gap-2 items-center">
                  <LanguageOutlined />
                  <span className="font-medium">Tên site/ID cửa hàng</span>
                </div>

                <Link
                  href="#"
                  className="font-semibold text-[#338BFF] underline"
                >
                  Lilas Maison
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white flex flex-col gap-4 rounded-2xl shadow-[0_2px_0_#D9D9D9]">
            <p className="text-xl font-semibold">Thông tin khách hàng</p>

            <div className="flex flex-col gap-4">              
              <div 
                className={`border ${selectedPlan === 0 ? 'border-2 border-[#559EFF]' : 'border-[#4F495026]'} hover:border-2 hover:border-[#559EFF] rounded-2xl p-4 justify-between flex items-center cursor-pointer`}
                onClick={() => handleSelectPlan(0)}
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedPlan === 0}
                    onChange={() => handleSelectPlan(0)}
                    className="size-6 rounded-full border border-[#3C3C4359]"
                  />
                  <span className="font-semibold">1 tháng sử dụng</span>
                </div>

                <p className="font-semibold text-xl">
                  899,000đ
                  <span className="text-sm font-normal text-[#3C3C43B2]">
                    /tháng
                  </span>
                </p>
              </div>

              <div 
                className={`border ${selectedPlan === 1 ? 'border-2 border-[#559EFF]' : 'border-[#4F495026]'} hover:border-2 hover:border-[#559EFF] rounded-2xl p-4 cursor-pointer`}
                onClick={() => handleSelectPlan(1)}
              >
                <div className="justify-between flex items-center pb-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlan === 1}
                      onChange={() => handleSelectPlan(1)}
                      className="size-6 rounded-full border border-[#3C3C4359]"
                    />
                    <span className="font-semibold">12 tháng sử dụng</span>
                    <span className="ml-3 text-sm font-medium border-[0.5px] border-[#006CFB] text-[#006CFB] px-2 py-1 bg-[#DEE9FC] rounded-full">
                      Tiết kiệm 5,588,000đ
                    </span>
                  </div>

                  <p className="font-semibold text-xl">
                    899,000đ
                    <span className="text-sm font-normal text-[#3C3C43B2]">
                      /tháng
                    </span>
                  </p>
                </div>

                <div className="border w-full"></div>

                <div className="flex flex-col gap-3 py-3 px-6">
                  <ul className="space-y-4 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>
                        Accrual - CK 2,000,000đ (Thay CK phí khởi tạo)
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Mua/GH/NC 12 tháng - CK 3,588,000đ</span>
                    </li>
                  </ul>
                </div>
              </div>              
              <div 
                className={`border ${selectedPlan === 2 ? 'border-2 border-[#559EFF]' : 'border-[#4F495026]'} hover:border-2 hover:border-[#559EFF] rounded-2xl p-4 cursor-pointer`}
                onClick={() => handleSelectPlan(2)}
              >
                <div className="justify-between flex items-center pb-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlan === 2}
                      onChange={() => handleSelectPlan(2)}
                      className="size-6 rounded-full border border-[#3C3C4359]"
                    />
                    <span className="font-semibold">24 tháng sử dụng</span>
                    <span className="ml-3 text-sm font-medium border-[0.5px] border-[#006CFB] text-[#006CFB] px-2 py-1 bg-[#DEE9FC] rounded-full">
                      Tiết kiệm 9,176,000đ
                    </span>
                  </div>

                  <p className="font-semibold text-xl">
                    899,000đ
                    <span className="text-sm font-normal text-[#3C3C43B2]">
                      /tháng
                    </span>
                  </p>
                </div>

                <div className="border w-full"></div>

                <div className="flex flex-col gap-3 py-3 px-6">
                  <ul className="space-y-4 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>
                        Accrual - CK 2,000,000đ (Thay CK phí khởi tạo)
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Tặng 12 tháng</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Mua/GH/NC 24 tháng - CK 7,176,000đ</span>
                    </li>
                  </ul>
                </div>
              </div>              
              <div 
                className={`border ${selectedPlan === 3 ? 'border-2 border-[#559EFF]' : 'border-[#4F495026]'} hover:border-2 hover:border-[#559EFF] rounded-2xl p-4 cursor-pointer`}
                onClick={() => handleSelectPlan(3)}
              >
                <div className="justify-between flex items-center pb-3">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlan === 3}
                      onChange={() => handleSelectPlan(3)}
                      className="size-6 rounded-full border border-[#3C3C4359]"
                    />
                    <span className="font-semibold">36 tháng sử dụng</span>
                    <span className="ml-3 text-sm font-medium border-[0.5px] border-[#006CFB] text-[#006CFB] px-2 py-1 bg-[#DEE9FC] rounded-full">
                      Tiết kiệm 12,764,000đ
                    </span>
                  </div>

                  <p className="font-semibold text-xl">
                    899,000đ
                    <span className="text-sm font-normal text-[#3C3C43B2]">
                      /tháng
                    </span>
                  </p>
                </div>

                <div className="border w-full"></div>

                <div className="flex flex-col gap-3 py-3 px-6">
                  <ul className="space-y-4 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>
                        Accrual - CK 2,000,000đ (Thay CK phí khởi tạo)
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Tặng 18 tháng</span>
                    </li>

                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Mua/GH/NC 36 tháng - CK 10,764,000đ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 p-6 bg-white rounded-2xl shadow-[0_2px_0_#D9D9D9] flex flex-col gap-4 h-fit">
          <p className="text-xl font-semibold">Đơn hàng</p>
          <div className="flex flex-col">
            <div className="flex gap-4 items-center justify-between py-4 border-b font-semibold">
              <p>Gói Pro (24 tháng)</p>

              <p>21,576,000đ</p>
            </div>

            <div className="flex gap-4 items-center justify-between py-4 border-b font-semibold">
              <p>Phí hỗ trợ duy trì</p>

              <p>09748413016</p>
            </div>

            <div className="py-4 flex flex-col gap-4 border-b">
              <p className="font-semibold">Khuyến mại</p>
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-2">
                  <SellOutlined className="size-4" />
                  <span>Tặng 12 tháng</span>

                  <span className="flex-1 text-end">0đ</span>
                </li>
                <li className="flex items-center gap-2">
                  <SellOutlined className="size-4" />
                  <span>Chiết khấu (Pro )</span>

                  <span className="flex-1 text-end">-2,000,000đ</span>
                </li>

                <li className="flex items-center gap-2">
                  <SellOutlined className="size-4" />
                  <span>Chiết khấu (Pro )</span>

                  <span className="flex-1 text-end">-2,000,000đ</span>
                </li>
              </ul>

              <div className="grid grid-cols-3 gap-4 items-center">
                <input
                  className="col-span-2 py-[9px] px-2 border border-[#3C3C4359] rounded-md placeholder:text-[#3C3C4366]"
                  placeholder="Nhập mã khuyến mại"
                />
                <button className="col-span-1 bg-[#77777E1A] rounded-md text-[#3C3C4366] py-2 px-2.5 h-full">
                  Áp dụng
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex gap-4 items-center justify-between font-semibold">
                <p>Tổng tiền thanh toán</p>
                <span className="text-xl">14,400,000đ</span>
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-[#338BFF] py-2.5 px-4 rounded-lg text-white disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Tiếp tục"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
