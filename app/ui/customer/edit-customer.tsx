"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  getCustomerById,
  updateCustomer,
  getCustomerGroups,
  fetchDistricts,
  payCustomerAmount,
  fetchWards,
  fetchProvinces,
} from "@/app/lib/data";
// import { CustomerGroup } from "@/app/lib/definitions";
import {
  CloseOutlined,
  CheckCircleOutlined,
  ReportGmailerrorred,
  AddOutlined,
} from "@mui/icons-material";
// import provincesData from "@/app/provinces.json";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PaymentModal from "../payment";
import CustomerPopupSkeleton from "@/app/components/CustomerPopupSkeleton";
import {
  Customer,
  customerDelete,
  customerDetail,
  customerUpdate,
} from "@/app/lib/data/customers";
import {
  CustomerGroup,
  customerGroupsList,
} from "@/app/lib/data/customer-groups";
import { cn } from "@/app/lib/utils";
import PopupDelete from "@/app/components/PopupDelete";
import { addressCreate } from "@/app/lib/data/addresses";

interface PopupEditCustomerProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
  onSaved: (updated: Customer) => void;
}

export const mock_address = [
  {
    customer_id: "cus_001",
    address_id: "addr_001",
    is_default: true,
    address: {
      name: "Nguyễn Văn A",
      phone_number: "0912345678",
      province_code: 79,
      province_name: "TP. Hồ Chí Minh",
      district_code: 769,
      district_name: "Quận 1",
      ward_code: "00123",
      ward_name: "Phường Bến Nghé",
      address: "123 Lê Lợi, Phường Bến Nghé, Quận 1",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_002",
    address_id: "addr_002",
    is_default: false,
    address: {
      name: "Trần Thị B",
      phone_number: "0988123456",
      province_code: 123,
      province_name: "Hà Nội",
      district_code: 323,
      district_name: "Quận Hoàn Kiếm",
      ward_code: "00001",
      ward_name: "Phường Hàng Trống",
      address: "45 Tràng Thi, Phường Hàng Trống, Hoàn Kiếm",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_003",
    address_id: "addr_003",
    is_default: false,
    address: {
      name: "Lê Quốc Cường",
      phone_number: "0909123456",
      province_code: 48,
      province_name: "Đà Nẵng",
      district_code: 492,
      district_name: "Quận Hải Châu",
      ward_code: "20001",
      ward_name: "Phường Thạch Thang",
      address: "12 Bạch Đằng, Phường Thạch Thang, Hải Châu",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_004",
    address_id: "addr_004",
    is_default: false,
    address: {
      name: "Phạm Thị Duyên",
      phone_number: "0977123456",
      province_code: 31,
      province_name: "Hải Phòng",
      district_code: 303,
      district_name: "Quận Ngô Quyền",
      ward_code: "30001",
      ward_name: "Phường Máy Tơ",
      address: "15 Điện Biên Phủ, Máy Tơ, Ngô Quyền",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_005",
    address_id: "addr_005",
    is_default: false,
    address: {
      name: "Đỗ Minh Nhật",
      phone_number: "0933123456",
      province_code: 92,
      province_name: "Cần Thơ",
      district_code: 916,
      district_name: "Quận Ninh Kiều",
      ward_code: "60002",
      ward_name: "Phường An Khánh",
      address: "21 Nguyễn Văn Cừ, An Khánh, Ninh Kiều",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_006",
    address_id: "addr_006",
    is_default: false,
    address: {
      name: "Ngô Thị Lan",
      phone_number: "0966123456",
      province_code: 60,
      province_name: "Bình Dương",
      district_code: 592,
      district_name: "TP. Thủ Dầu Một",
      ward_code: "40003",
      ward_name: "Phường Phú Cường",
      address: "85 Đại lộ Bình Dương, Phú Cường, Thủ Dầu Một",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_007",
    address_id: "addr_007",
    is_default: false,
    address: {
      name: "Hoàng Văn Tùng",
      phone_number: "0944123456",
      province_code: 46,
      province_name: "Thừa Thiên Huế",
      district_code: 474,
      district_name: "TP. Huế",
      ward_code: "70001",
      ward_name: "Phường Phú Hội",
      address: "10 Nguyễn Huệ, Phú Hội, TP. Huế",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_008",
    address_id: "addr_008",
    is_default: false,
    address: {
      name: "Vũ Mai Hương",
      phone_number: "0917123456",
      province_code: 94,
      province_name: "Bạc Liêu",
      district_code: 946,
      district_name: "TP. Bạc Liêu",
      ward_code: "80001",
      ward_name: "Phường 1",
      address: "66 Trần Phú, Phường 1, TP. Bạc Liêu",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_009",
    address_id: "addr_009",
    is_default: false,
    address: {
      name: "Trịnh Quốc Việt",
      phone_number: "0985123456",
      province_code: 15,
      province_name: "Hòa Bình",
      district_code: 152,
      district_name: "TP. Hòa Bình",
      ward_code: "50002",
      ward_name: "Phường Tân Thịnh",
      address: "30 Chi Lăng, Tân Thịnh, TP. Hòa Bình",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
  {
    customer_id: "cus_010",
    address_id: "addr_010",
    is_default: false,
    address: {
      name: "Phan Bích Ngọc",
      phone_number: "0922123456",
      province_code: 26,
      province_name: "Gia Lai",
      district_code: 260,
      district_name: "TP. Pleiku",
      ward_code: "90003",
      ward_name: "Phường Yên Thế",
      address: "99 Nguyễn Tất Thành, Yên Thế, TP. Pleiku",
      created_at: "2025-05-12T17:40:00.000Z",
      updated_at: "2025-05-12T17:40:00.000Z",
    },
    created_at: "2025-05-12T17:40:00.000Z",
    updated_at: "2025-05-12T17:40:00.000Z",
  },
];

export default function PopupEditCustomer({
  isOpen,
  onClose,
  customerId,

  onSaved,
}: PopupEditCustomerProps) {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupOptions, setGroupOptions] = useState<CustomerGroup[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Tỉnh/Thành
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [province, setProvincel] = useState("");
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<{
    ProvinceID: number;
    ProvinceName: string;
  } | null>(null);

  // Quận/Huyện
  const [districtName, setDistrictNname] = useState("");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    DistrictID: number;
    DistrictName: string;
  } | null>(null);

  // Phường/Xã
  const [wardName, setWardName] = useState("");
  const [showWardDropdown, setShowWardDropdown] = useState(false);
  const [wardList, setWardList] = useState<any[]>([]);
  const [selectedWard, setSelectedWard] = useState<{
    WardCode: string;
    WardName: string;
  } | null>(null);

  const provinceDropdownRef = useRef<HTMLDivElement | null>(null);
  const districtDropdownRef = useRef<HTMLDivElement | null>(null);
  const wardDropdownRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false);
  const [debt, setDebt] = useState<number>(0);
  const [isProvincesFetched, setIsProvincesFetched] = useState(false);

  const [isCreateAddressOpen, setIsCreateAddressOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    if (isOpen && customerId) {
      setLoading(true);
      const token = localStorage.getItem("access_token") || "";
      customerDetail(token, customerId)
        .then(async (cus) => {
          setCustomer(cus);
          setFullName(cus.full_name || "");
          setBirthday(cus.date_of_birth || "");
          // setGroupName(cus.group_name || "");
          // setPhone(cus.phone || "");
          setEmail(cus.email || "");
          setDebt(cus.debt || 0);
          // setProvincel(cus.province || "");
          // setDistrictNname(cus.district_name || "");
          // setWardName(cus.ward_name || "");
          // setAddress(cus.address || "");

          // fill cus group
          const groups = await customerGroupsList(token, 0, 50);
          setGroupOptions(groups);
          const matchedGroup = groups.find((g) => g.id === cus.group_id);
          setGroupName(matchedGroup ? matchedGroup.name : "");

          // Reset selected
          setSelectedProvince(null);
          setSelectedDistrict(null);
          setSelectedWard(null);
          setDistrictList([]);
          setWardList([]);

          console.log("Customer detail:", cus);
        })
        .catch((err) => {
          console.error("Fetch customer detail error:", err);
          const errorResponse = JSON.parse(err.message);
          setMessage(`Lỗi: ${errorResponse.detail[0]?.msg}`);
          setMessageType("error");

          setTimeout(() => {
            setMessage("");
          }, 5000);
          // alert(err.message);
        });

      customerGroupsList(token, 0, 50)
        .then((groups) => {
          setGroupOptions(groups);
        })
        .catch((err) => {
          console.error("Fetch group options error:", err);
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false);
          }, 600)
        );
    }
  }, [isOpen, customerId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        provinceDropdownRef.current &&
        !provinceDropdownRef.current.contains(e.target as Node)
      ) {
        setShowProvinceDropdown(false);
      }
      if (
        districtDropdownRef.current &&
        !districtDropdownRef.current.contains(e.target as Node)
      ) {
        setShowDistrictDropdown(false);
      }
      if (
        wardDropdownRef.current &&
        !wardDropdownRef.current.contains(e.target as Node)
      ) {
        setShowWardDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProvincesData = async () => {
    if (!isProvincesFetched) {
      try {
        const provinces = await fetchProvinces();
        setProvinceList(provinces);
        setIsProvincesFetched(true);
      } catch (error: any) {
        console.error("Lỗi khi tải danh sách tỉnh/thành:", error);
        setMessage(error.message);
        setMessageType("error");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    }
  };

  const handleProvinceFocus = () => {
    setShowProvinceDropdown(true);
    fetchProvincesData();
  };

  const filteredProvinces = provinceList.filter((p: any) => {
    const query = province.toLowerCase();
    const matchByName = p.ProvinceName.toLowerCase().includes(query);
    const matchByExtension = p.NameExtension?.some((ext: string) =>
      ext.toLowerCase().includes(query)
    );
    return matchByName || matchByExtension;
  });

  const filteredDistricts = districtList.filter((d: any) => {
    const query = districtName.toLowerCase();
    const matchByName = d.DistrictName.toLowerCase().includes(query);
    const matchByExtension = d.NameExtension?.some((ext: string) =>
      ext.toLowerCase().includes(query)
    );
    return matchByName || matchByExtension;
  });

  const filteredWards = wardList.filter((w: any) => {
    const query = wardName.toLowerCase();
    const matchByName = w.WardName.toLowerCase().includes(query);
    const matchByExtension = w.NameExtension?.some((ext: string) =>
      ext.toLowerCase().includes(query)
    );
    return matchByName || matchByExtension;
  });

  const handleSelectProvince = async (province: any) => {
    setSelectedProvince({
      ProvinceID: province.ProvinceID,
      ProvinceName: province.ProvinceName,
    });
    setShowProvinceDropdown(false);
    setProvincel(province.ProvinceName);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistrictList([]);
    setWardList([]);
    setDistrictNname("");
    setWardName("");
    if (province.ProvinceID) {
      try {
        const d = await fetchDistricts(province.ProvinceID);
        setDistrictList(d);
      } catch (error: any) {
        // alert(error.message);
        const errorResponse = JSON.parse(error.message);
        setMessage(`Lỗi: ${errorResponse.detail[0]?.msg}`);
        setMessageType("error");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    }
  };

  const handleSelectDistrict = async (district: any) => {
    setSelectedDistrict({
      DistrictID: district.DistrictID,
      DistrictName: district.DistrictName,
    });
    setShowDistrictDropdown(false);
    setDistrictNname(district.DistrictName);
    setSelectedWard(null);
    setWardList([]);
    setWardName("");

    if (district.DistrictID) {
      try {
        const w = await fetchWards(district.DistrictID);
        setWardList(w);
      } catch (error: any) {
        // alert(error.message);
        const errorResponse = JSON.parse(error.message);
        setMessage(`Lỗi: ${errorResponse.detail[0]?.msg}`);
        setMessageType("error");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    }
  };

  const handleSelectWard = (ward: any) => {
    setSelectedWard({ WardCode: ward.WardCode, WardName: ward.WardName });
    setShowWardDropdown(false);
    setWardName(ward.WardName);
  };

  const handleSave = async () => {
    if (!customerId) return;

    const token = localStorage.getItem("access_token") || "";
    const payload = {
      full_name: fullName.trim(),
      date_of_birth: birthday || null,
      group_id: groupOptions.find((g) => g.name === groupName)?.id || "1",
      phone: phone.trim(),
      email: email.trim(),
      address: address,
      // province: selectedProvince?.ProvinceName || customer?.province || "",
      // district_id: selectedDistrict?.DistrictID || customer?.district_id || "",
      // district_name: selectedDistrict?.DistrictName || customer?.district_name || "",
      // ward_name: selectedWard?.WardName || customer?.ward_name || "",
      // ward_code: selectedWard?.WardCode || customer?.ward_code || "",

      // province: province.trim() || null,
      // district_id: districtName ? selectedDistrict?.DistrictID || null : null,
      // district_name: districtName.trim() || null,
      // ward_name: wardName.trim() || null,
      // ward_code: selectedWard?.WardCode || customer?.ward_code || "",
    };

    console.log(payload);

    try {
      const updated = await customerUpdate(token, customerId, payload);
      onSaved(updated);
      setMessage(`Đã lưu thay đổi`);
      setMessageType("success");
      setTimeout(() => {
        onClose();
        // window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error("Update customer error:", err.message);
      setMessage(`${err.message}`);
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
      if (customer?.id) {
        // await payCustomerAmount(token, customer?.id, remainToPay);

        const updatedCustomer = await customerDetail(token, customer.id);
        setDebt(updatedCustomer.debt);
        setCustomer(updatedCustomer);

        setMessage("Thanh toán thành công!");
        setMessageType("success");

        setTimeout(() => {
          setMessage("");
        }, 5000);
        setTimeout(() => {
          setIsOpenModalPayment(false);
        }, 1000);
      }
    } catch (err: any) {
      setMessage(err.message);
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token") || "";
    if (!customer?.id) return;
    try {
      await customerDelete(token, customer.id);

      setMessage("Đã xóa khách hàng thành công!");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error("Delete customer error:", err);
      setMessage(`${err.message}`);
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
        <CustomerPopupSkeleton />
      </div>
    );
  }

  if (!isOpen) return null;

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
      <div className="bg-white rounded-3xl shadow-[0_2px_0_#D9D9D9] p-4 3xl:p-6 w-full xl:w-[77%] max-h-[97vh]">
        <div className="flex justify-between mb-2 3xl:mb-6">
          <h2 className="text-2xl font-bold">Chi tiết khách hàng</h2>
          <button onClick={onClose} className="text-gray-600">
            <CloseOutlined />
          </button>
        </div>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <div className="grid grid-cols-6 grid-rows-2 gap-4 max-h-[80vh] 3xl:max-h-none">
            <div className="col-span-3 flex flex-col gap-2 3xl:gap-4 border border-gray-200 rounded-2xl p-6 shadow-[0_2px_0_#D9D9D9]">
              <h3 className="font-semibold text-xl">Thông tin cá nhân</h3>
              <div>
                <label className="text-sm mb-1 font-semibold">
                  Tên khách hàng
                </label>
                <input
                  className="w-full p-2 border rounded-lg border-gray-300 text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm mb-1 font-semibold">Ngày sinh</label>
                <div className="relative">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={birthday ? dayjs(birthday) : null}
                      onChange={(date) =>
                        setBirthday(date ? date.format("YYYY-MM-DD") : "")
                      }
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          fullWidth: true,
                          size: "small",
                          InputProps: {
                            sx: {
                              borderRadius: "8px",
                              textAlign: "right",
                              display: "flex",
                              alignItems: "center",
                              paddingRight: "8px",
                              gap: "2px",
                            },
                          },
                          inputProps: {
                            className: "placeholder-gray-400 focus:ring-0",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <div className="col-span-3 col-start-1 row-start-2 flex flex-col gap-2 3xl:gap-4 border border-gray-200 rounded-2xl p-6 shadow-[0_2px_0_#D9D9D9]">
              <h3 className="font-semibold text-xl">Thông tin quản lý</h3>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm mb-1">Mã khách hàng</label>
                  <input
                    disabled
                    className="w-full p-2 text-sm border rounded-lg border-gray-300 bg-gray-100"
                    placeholder={customer?.id || ""}
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-sm mb-1">Nhóm khách hàng</label>
                  <select
                    className="w-full text-sm p-2 border rounded-lg border-gray-300"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  >
                    {groupOptions.map((group) => (
                      <option key={group.id} value={group.name}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1">Công nợ</label>
                <div className="flex items-center gap-2">
                  <input
                    disabled
                    className="flex-1 p-2 text-sm text-left w-full border rounded-lg border-gray-300 bg-gray-100"
                    value={debt.toLocaleString("en-US") || "0"}
                  />
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-all"
                    onClick={() => setIsOpenModalPayment(true)}
                  >
                    Thanh toán
                  </button>
                  <PaymentModal
                    title="khách hàng"
                    isOpen={isOpenModalPayment}
                    onClose={() => setIsOpenModalPayment(false)}
                    onConfirm={handleConfirmPayment}
                  />
                </div>
              </div>
            </div>

            {/* <div className="col-span-3 row-span-2 col-start-4 row-start-1 flex flex-col gap-2 3xl:gap-4 border border-gray-200 rounded-2xl p-6 shadow-[0_2px_0_#D9D9D9]">
              <h3 className="font-semibold text-xl">Thông tin liên hệ</h3>
              <div>
                <label className="font-semibold text-sm mb-1">Số điện thoại</label>
                <input
                  className="w-full p-2 text-sm border rounded-md border-gray-300"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="font-semibold text-sm mb-1">Email</label>
                <input
                  className="w-full p-2 text-sm border rounded-md border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div ref={provinceDropdownRef}>
                <label className="font-semibold text-sm mb-1">Tỉnh/Thành Phố</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg border-gray-300 text-sm"
                    placeholder="Tìm kiếm Tỉnh/Thành..."
                    value={province}
                    onChange={(e) => {
                      setProvincel(e.target.value);
                      setShowProvinceDropdown(true);
                    }}
                    // onFocus={() => setShowProvinceDropdown(true)}
                    onFocus={handleProvinceFocus}
                  />
                  {showProvinceDropdown && (
                    <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-60 overflow-y-auto rounded-lg shadow-[0_2px_0_#D9D9D9]">
                      {filteredProvinces.map((p: any) => (
                        <li
                          key={p.ProvinceID}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                          onClick={() => handleSelectProvince(p)}
                        >
                          {p.ProvinceName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div ref={districtDropdownRef}>
                <label className="font-semibold text-sm mb-1">Quận/Huyện</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg border-gray-300 text-sm"
                    placeholder="Tìm kiếm Quận/Huyện..."
                    value={districtName}
                    onChange={(e) => {
                      setDistrictNname(e.target.value);
                      setShowDistrictDropdown(true);
                    }}
                    onFocus={() => setShowDistrictDropdown(true)}
                    // disabled={!selectedProvince}
                  />
                  {showDistrictDropdown && selectedProvince && (
                    <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-60 overflow-y-auto rounded-lg shadow-[0_2px_0_#D9D9D9]">
                      {filteredDistricts.map((d: any) => (
                        <li
                          key={d.DistrictID}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                          onClick={() => handleSelectDistrict(d)}
                        >
                          {d.DistrictName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div ref={wardDropdownRef}>
                <label className="font-semibold text-sm mb-1">Phường/Xã</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg border-gray-300 text-sm"
                    placeholder="Tìm kiếm Phường/Xã..."
                    value={wardName}
                    onChange={(e) => {
                      setWardName(e.target.value);
                      setShowWardDropdown(true);
                    }}
                    onFocus={() => setShowWardDropdown(true)}
                    // disabled={!selectedDistrict}
                  />
                  {showWardDropdown && selectedDistrict && (
                    <ul className="absolute z-10 bg-white border border-gray-200 w-full max-h-60 overflow-y-auto rounded-lg shadow-[0_2px_0_#D9D9D9]">
                      {filteredWards.map((w: any) => (
                        <li
                          key={w.WardCode}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                          onClick={() => handleSelectWard(w)}
                        >
                          {w.WardName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm mb-1">Địa chỉ</label>
                <input
                  className="w-full p-2 border rounded-lg border-gray-300 text-sm"
                  placeholder="Ví dụ: Số 12, ngõ 24 Vạn Phúc..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div> */}

            <div className="col-span-3 row-span-2 col-start-4 row-start-1 flex flex-col gap-2 3xl:gap-4 border border-gray-200 rounded-2xl p-6 shadow-[0_2px_0_#D9D9D9]">
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
              <div className="w-full flex flex-col gap-0 overflow-auto scrollbar-hide">
                {mock_address.map((address) => (
                  <AddressCard key={address.address_id} address={address} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={() => {
              setIsDeletePopupOpen(true);
              // setIsProductDetailHidden(true);
            }}
            // disabled={loading}
            className="text-white bg-red-500 px-14 py-2 rounded-lg hover:bg-red-700"
          >
            Xóa
          </button>
          <button
            onClick={handleSave}
            className="bg-[#338BFF] text-white px-4 py-2 rounded-lg text-[15px]"
          >
            Lưu chỉnh sửa
          </button>
        </div>
      </div>

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
              // setIsCreateAddressOpen(false);
              // window.location.reload();
            }, 1000);
          }}
        />
      )}

      {isDeletePopupOpen && (
        <PopupDelete
          isOpen={isDeletePopupOpen}
          onClose={() => {
            setIsDeletePopupOpen(false);
            // setIsProductDetailHidden(false);
          }}
          onConfirm={handleDelete}
          message={`Hệ thống sẽ xoá Khách hàng "${fullName}" và không thể khôi phục!`}
        />
      )}
    </div>
  );
}

interface AddressDetail {
  name: string;
  phone_number: string;
  province_code: number;
  province_name: string;
  district_code: number;
  district_name: string;
  ward_code: string;
  ward_name: string;
  address: string;
  created_at: string;
  updated_at: string;
}
interface CustomerAddress {
  customer_id: string;
  address_id: string;
  is_default: boolean;
  address: AddressDetail;
  created_at: string;
  updated_at: string;
}

export function AddressCard({ address }: { address: CustomerAddress }) {
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isDeleteAddressOpen, setIsDeleteAddressOpen] = useState(false);

  return (
    <>
      <div className="border-b border-[#4F49502E] flex justify-between py-3 items-center gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm line-clamp-1 break-all">
            <span className="font-semibold">{address.address.name}</span> |{" "}
            {address.address.phone_number}
          </p>

          <p className="text-sm line-clamp-1 break-all">
            {address.address.address}, {address.address.province_name}
          </p>
          {address.is_default && (
            <span className="px-2.5 py-1 text-[#17489E] bg-[#338BFF26] rounded-md w-fit text-xs font-semibold">
              Mặc định
            </span>
          )}
        </div>
        <div className="flex flex-col text-sm gap-2 text-[13px] 3xl:text-[15px] font-medium">
          <div className="flex justify-between">
            <button
              className="text-[#338BFF]"
              onClick={() => setIsEditAddressOpen(true)}
            >
              Cập nhật
            </button>
            <button
              className="text-[#E50000]"
              onClick={() => setIsDeleteAddressOpen(true)}
            >
              Xóa
            </button>
          </div>
          <button
            className={cn(
              "px-2 py-0.5 border border-black rounded-[4px]",
              address.is_default &&
                "bg-[#77777E1A] !border-none !text-[#3C3C4366]"
            )}
          >
            Thiết lập mặc định
          </button>
        </div>
      </div>

      {isEditAddressOpen && (
        <AddressDetail
          isOpen={isEditAddressOpen}
          onClose={() => setIsEditAddressOpen(false)}
          address={address}
        />
      )}

      {isDeleteAddressOpen && (
        <PopupDelete
          isOpen={isDeleteAddressOpen}
          onClose={() => setIsDeleteAddressOpen(false)}
          message="Bạn có chắc chắn muốn xóa địa chỉ này không?"
          onConfirm={() => {
            // handle delete address
            setIsDeleteAddressOpen(false);
          }}
        />
      )}
    </>
  );
}

export function CreateAddressPopup({
  isOpen,
  onClose,
  onCreate,
  onError,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  onError: () => void;
}) {
  const handleCreateCustomerAddress = async () => {
    const token = localStorage.getItem("access_token") || "";
    try {
      const payload = {
        id: "mock_address_0",
        name: "Mock Address 0",
        addressable_type: "warehouse",
        phone_number: "0987654320",
        province_code: 1,
        province_name: "Province 0",
        district_code: 10,
        district_name: "District 0",
        ward_code: "000",
        ward_name: "Ward 0",
        address: "023 Sample Street",
        created_at: "2025-05-29T08:47:51.263269Z",
        updated_at: "2025-05-29T08:47:51.263269Z",
        warehouse_id: "32323",
      };

      const new_add = await addressCreate(token, payload);
      onCreate();
    } catch (error) {
      console.error("Error creating address:", error);
      onError();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
      <div className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-[0_2px_0_#D9D9D9] overflow-hidden">
        <div className="flex justify-between pt-6 px-6">
          <p className="font-bold text-2xl">Thêm địa chỉ</p>
          <button className="text-[#3C3C43B2]" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-0.5">
            <p>Họ và tên</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p>Số điện thoại</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              placeholder="(84+) 123 123 123"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p>Phường/Xã, Quận/Huyện, Tỉnh/Thành phố</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              placeholder="Phường 1, Hoàn Kiếm, Hà Nội"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p>Địa chỉ cụ thể</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              placeholder="Số nhà 1, ngõ 2, ngách 3"
            />
          </div>
        </div>

        <div className="flex justify-end p-6 bg-[#F2F2F7] items-center">
          <button
            className="bg-[#338BFF] text-white px-4 py-2 rounded-lg text-[15px] w-[192px]"
            onClick={handleCreateCustomerAddress}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddressDetail({
  isOpen,
  onClose,
  address,
}: {
  isOpen: boolean;
  onClose: () => void;
  address: CustomerAddress;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60">
      <div className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-[0_2px_0_#D9D9D9] overflow-hidden">
        <div className="flex justify-between pt-6 px-6">
          <p className="font-bold text-2xl">Địa chỉ của tôi</p>
          <button className="text-[#3C3C43B2]" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-0.5">
            <p>Họ và tên</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              defaultValue={address.address.name}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p>Số điện thoại</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              defaultValue={address.address.phone_number}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p>Phường/Xã, Quận/Huyện, Tỉnh/Thành phố</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              defaultValue={`${address.address.ward_name}, ${address.address.district_name}, ${address.address.province_name}`}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p>Địa chỉ cụ thể</p>
            <input
              className="w-full h-10 rounded-md border-[#3C3C4359] px-2 py-[9px]"
              defaultValue={address.address.address}
            />
          </div>
        </div>

        <div className="flex justify-end p-6 bg-[#F2F2F7] items-center">
          <button
            className="bg-[#338BFF] text-white px-4 py-2 rounded-lg text-[15px] w-[192px]"
            onClick={onClose}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
