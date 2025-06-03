"use client";

import React, { useEffect, useState } from "react";
import {
  getSuppliersById,
  updateSupplier,
  deactivateSupplier,
} from "@/app/lib/data";
// import { Supplier } from "@/app/lib/definitions";
import {
  CloseOutlined,
  ReportGmailerrorred,
  CheckCircleOutlined,
  AddOutlined,
} from "@mui/icons-material";
import PaymentModal from "../payment";
import { paySupplierAmount } from "@/app/lib/data";
import PopupDelete from "@/app/components/PopupDelete";
import EditPopupSkeleton from "@/app/components/EditPopupSkeleton";
import {
  Supplier,
  supplierDelete,
  supplierDetail,
  supplierUpdate,
} from "@/app/lib/data/suppliers";
import { AddressCard, CreateAddressPopup, mock_address } from "../customer/edit-customer";

interface PopupEditSupplierProps {
  isOpen: boolean;
  onClose: () => void;
  supplierId: string | null;
  onSaved: (updated: Supplier) => void;
}

const addresses = mock_address;

export default function PopupEditSupplier({
  isOpen,
  onClose,
  supplierId,
  onSaved,
}: PopupEditSupplierProps) {
  const [loading, setLoading] = useState(false);
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [debt, setDebt] = useState<number>(0);
  const [contactNameError, setContactNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false);
  const [supId, setSupId] = useState<string | null>(null);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isProductDetailHidden, setIsProductDetailHidden] = useState(false);
  const [isCreateAddressOpen, setIsCreateAddressOpen] = useState(false);

  useEffect(() => {
    if (isOpen && supplierId) {
      setLoading(true);
      // setError(null);
      setContactNameError(null);
      setEmailError(null);
      const token = localStorage.getItem("access_token") || "";
      supplierDetail(token, supplierId)
        .then((sup) => {
          console.log(sup);
          setSupId(sup.supplier_id);
          setContactName(sup.name || "");
          setPhone(sup.phone_number || "");
          setEmail(sup.email || "");
          setAddress(sup.address_id || "");
          setDebt(sup.debt || 0);
        })
        .catch((err) => {
          console.error("Fetch supplier detail error:", err.message);
          setMessage(`Lỗi: ${err.message}`);
          setMessageType("error");
          setTimeout(() => {
            setMessage("");
          }, 5000);
          // alert(err.message);
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false);
          }, 600)
        );
    }
  }, [isOpen, supplierId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
        <EditPopupSkeleton type="supplier" />
      </div>
    );
  }

  if (!isOpen) return null;

  const handleSave = async () => {
    setContactNameError(null);
    setEmailError(null);
    let isValid = true;

    if (!contactName.trim()) {
      setContactNameError("Tên nhà cung cấp không hợp lệ");
      isValid = false;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (email.trim() && !emailRegex.test(email.trim())) {
      setEmailError("Vui lòng nhập email hợp lệ");
      isValid = false;
    }

    if (!isValid || !supplierId) return;

    const token = localStorage.getItem("access_token") || "";
    const payload = {
      name: contactName.trim(),
      phone_number: phone.trim(),
      email: email.trim(),
      address_id: address.trim(),
      debt,
    };

    try {
      const updated = await supplierUpdate(token, supplierId, payload);
      onSaved(updated);
      setMessage("Cập nhật nhà cung cấp thành công!");
      setMessageType("success");

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000); // Chờ 2 giây rồi reload trang
    } catch (err: any) {
      console.error("Update supplier error:", err.message);
      setMessage(`Lỗi: ${err.message}`);
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleDelete = async () => {
    if (!supplierId) return;
    const token = localStorage.getItem("access_token") || "";

    try {
      await supplierDelete(token, supplierId);
      setMessage("Xóa Nhà cung cấp thành công!");
      setMessageType("success");

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error("Deactivate supplier error:", err.message);
      setMessage(`Lỗi: ${err.message}`);
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      // alert(err.message);
    }
  };

  const handleConfirmPayment = async (remainToPay: number) => {
    try {
      const token = localStorage.getItem("access_token") || "";
      if (supId) {
        await paySupplierAmount(token, supId, remainToPay);

        const updatedSupplier = await getSuppliersById(token, supId);
        setDebt(updatedSupplier.debt);

        setMessage("Thanh toán thành công!");
        setMessageType("success");

        setTimeout(() => {
          setMessage("");
          setIsOpenModalPayment(false);
        }, 1000);
      }
    } catch (err) {
      setMessage("Thanh toán thất bại!");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
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

      {!isProductDetailHidden && (
        <div className="bg-[#F2F2F7] rounded-3xl shadow-[0_2px_0_#D9D9D9] !pb-0 p-4 3xl:p-6 w-full xl:w-[77%] max-h-[97vh]">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Chi tiết nhà cung cấp</h2>
            <button onClick={onClose} className="text-gray-600">
              <CloseOutlined />
            </button>
          </div>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white col-span-1 flex flex-col gap-4  border border-gray-200 rounded-2xl p-6 shadow-[0_2px_0_#D9D9D9]">
                <div>
                  <label className="block text-sm mb-1">Tên nhà cung cấp</label>
                  <input
                    className="w-full p-2 border rounded-md border-gray-300"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    maxLength={500}
                  />
                  {/* {error && <p className="text-sm text-red-500 flex items-center">
                  <ReportGmailerrorred className="w-4 h-4 mr-1"/>
                  {error} */}
                  {contactNameError && (
                    <p className="text-sm text-red-500 flex items-center">
                      <ReportGmailerrorred className="w-4 h-4 mr-1" />
                      {contactNameError}
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm mb-1">Số điện thoại</label>
                  <input
                    className="w-full p-2 border rounded-md border-gray-300"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div> */}

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    className="w-full p-2 border rounded-md border-gray-300"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(null);
                    }}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 flex items-center">
                      <ReportGmailerrorred className="w-4 h-4 mr-1" />
                      {emailError}
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm mb-1">Địa chỉ</label>
                  <input
                    className="w-full p-2 border rounded-md border-gray-300"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div> */}

                <div>
                  <label className="block text-sm mb-1">Công nợ</label>
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 w-full p-2 border rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                      placeholder="Công nợ..."
                      disabled
                      value={debt.toLocaleString("en-ES")}
                    />
                    <button
                      className="px-4 py-[10px] rounded-lg text-white text-sm font-medium bg-[#338BFF] hover:bg-[#66B2FF] transition-all"
                      onClick={() => setIsOpenModalPayment(true)}
                    >
                      Thanh toán
                    </button>
                    <PaymentModal
                      title={contactName}
                      isOpen={isOpenModalPayment}
                      onClose={() => setIsOpenModalPayment(false)}
                      onConfirm={handleConfirmPayment}
                      allowNegative={true}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white col-span-1 flex flex-col gap-2 3xl:gap-4 border border-gray-200 rounded-2xl p-6 shadow-[0_2px_0_#D9D9D9]">
                <div className="flex w-full justify-between items-center">
                  <h3 className="font-semibold text-xl">Địa chỉ</h3>
                  <button
                    className="bg-[#338BFF] px-3 text-white h-8 3xl:h-10 text-[15px] rounded-lg flex items-center"
                    onClick={() => setIsCreateAddressOpen(true)}
                  >
                    <AddOutlined fontSize="small" />
                    Thêm địa chỉ
                  </button>
                </div>
                <div className="w-full flex flex-col gap-0 overflow-auto scrollbar-hide h-[60vh]">
                  {mock_address.map((address) => (
                    <AddressCard key={address.address_id} address={address} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-4 bg-gray-100 p-4 3xl:p-6 -mx-4 3xl:-mx-6 rounded-b-2xl">
            <button
              onClick={() => {
                setIsDeletePopupOpen(true);
                setIsProductDetailHidden(true);
              }}
              disabled={loading}
              className=" bg-[#E50000] text-white px-4 py-[10px] rounded-md"
            >
              Xóa nhà cung cấp
            </button>
            <button
              onClick={handleSave}
              className="bg-[#338BFF] text-white px-[16px] py-[10px] rounded-md"
            >
              Lưu chỉnh sửa
            </button>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <PopupDelete
          isOpen={isDeletePopupOpen}
          onClose={() => {
            setIsDeletePopupOpen(false);
            setIsProductDetailHidden(false);
          }}
          onConfirm={handleDelete}
          message={`Hệ thống sẽ xoá nhà cung cấp "${contactName}" và không thể khôi phục!`}
        />
      )}

      {isCreateAddressOpen && (
        <CreateAddressPopup
          isOpen={isCreateAddressOpen}
          onClose={() => setIsCreateAddressOpen(false)}
          onCreate={() => {
            setMessage("Tạo địa chỉ mới thành công!");
            setMessageType("success");
            setTimeout(() => {
              setMessage("");
              setIsCreateAddressOpen(false);
              // window.location.reload();
            }, 1000);
          }}
          onError={() => {
            setMessage("Tạo địa chỉ mới thất bại!");
            setMessageType("error");
            setTimeout(() => {
              setMessage("");
              setIsCreateAddressOpen(false);
            }, 1000);
          }}
        />
      )}
    </div>
  );
}
