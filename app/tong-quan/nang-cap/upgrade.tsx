"use client";

import { Icons } from "@/app/components/icons";
import Image from "next/image";
import CustomerImg from "@/public/customers/balazs-orban.png";
import { useRouter } from "next/navigation";

const additionalServices: AdditionalServiceProps[] = [
  { name: "Chi nhánh", price: "160,000đ", unit: "Chi nhánh/Tháng" },
  { name: "Quản trị viên", price: "20,000đ", unit: "QTV/Tháng" },
  { name: "Dung lượng website", price: "120,000đ", unit: "Chi nhánh/Tháng" },
  { name: "Trang Instagram", price: "50,000đ", unit: "Page/Tháng" },
  {
    name: "Gian hàng trên sàn TMĐT",
    price: "30,000đ",
    unit: "Gian hàng/Tháng",
  },
  { name: "Fanpage", price: "50,000đ", unit: "Page/Tháng" },
  { name: "Dung lượng Social", price: "120,000đ", unit: "GB/Tháng" },
  { name: "Tài khoản nhân viên", price: "20,000đ", unit: "Tài khoản/Tháng" },
];

export default function UpgradePlan() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <p className="text-2xl font-bold mb-2">Nâng cấp gói phần mềm</p>

      <div className="mt-5 p-4 bg-white flex items-center justify-between gap-4 rounded-2xl shadow-[0_2px_0_#D9D9D9]">
        <div className="flex gap-2">
          <Image
            src={CustomerImg}
            alt="Customer"
            className="size-[76px] shrink-0 rounded-full"
            priority
            quality={100}
          />
          <div className="flex flex-col justify-evenly">
            <p>Gói phần mềm</p>
            <p className="text-xl font-semibold">Pro</p>
            <p className="text-sm text-gray-500">03/03/2017 - 17/09/2027</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="text-[#F59E0B] text-xl font-semibold">850</span>
              <span className="text-gray-400 text-sm">Ngày</span>
            </div>
            <div className="border" />
            <div className="flex flex-col items-center">
              <span className="text-[#F59E0B] text-xl font-semibold">17</span>
              <span className="text-gray-400 text-sm">Giờ</span>
            </div>
            <div className="border" />
            <div className="flex flex-col items-center">
              <span className="text-[#F59E0B] text-xl font-semibold">34</span>
              <span className="text-gray-400 text-sm">Phút</span>
            </div>
            <div className="border" />
            <div className="flex flex-col items-center">
              <span className="text-[#F59E0B] text-xl font-semibold">26</span>
              <span className="text-gray-400 text-sm">Giây</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/tong-quan/gia-han")}
            className="bg-[#338BFF] text-white text-sm rounded-lg px-4 py-2 flex items-center gap-2 h-10"
          >
            Gia hạn gói phần mềm
          </button>
        </div>
      </div>

      <div className="mt-5 p-4 bg-white flex flex-col gap-4 rounded-2xl shadow-[0_2px_0_#D9D9D9]">
        <p className="text-xl font-semibold">Dịch vụ đã mua</p>

        <div className="grid grid-cols-1 gap-1">
          <div className="flex gap-2 items-center justify-between border-b py-4">
            <p>Kho</p>
            <p>Từ: 21/11/2024 - Đến: 21/08/2027</p>
          </div>
          <div className="flex gap-2 items-center justify-between border-b py-4">
            <p>CN Thanh Hóa</p>
            <p>Từ: 21/11/2024 - Đến: 21/08/2027</p>
          </div>
          <div className="flex gap-2 items-center justify-between pt-4 pb-0">
            <p>Dung lượng Website</p>
            <div className=" flex flex-col flex-1 items-end justify-end">
              <p>Đã sử dụng: 1.57/5GB</p>
              <div className="w-[30%] h-2.5 bg-gray-200 rounded-full mt-1">
                <div className="h-2.5 w-[40%] bg-[#338BFF] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 bg-white flex flex-col gap-4 rounded-2xl shadow-[0_2px_0_#D9D9D9]">
        <p className="text-xl font-semibold">Dịch vụ mua thêm</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalServices.map((service, index) => (
            <AdditionalService
              key={index}
              name={service.name}
              price={service.price}
              unit={service.unit}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 p-4 bg-white flex flex-col gap-4 rounded-2xl shadow-[0_2px_0_#D9D9D9]">
        <p className="text-xl font-semibold">Tạo mã giảm giá</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[#4F495026] rounded-2xl p-6 flex flex-col justify-between gap-6 bg-white">
            <div>
              <p className="text-xl font-semibold">Mã giảm giá toàn shop</p>
              <p>Áp dụng cho tất cả các sản phẩm trong shop</p>
            </div>

            <button
              className="text-white bg-[#338BFF] text-sm rounded-lg px-4 py-2.5 flex items-center w-fit"
              onClick={() =>
                router.push("/tong-quan/tao-ma-giam-gia/toan-shop")
              }
            >
              Tạo mã
            </button>
          </div>
          <div className="border border-[#4F495026] rounded-2xl p-6 flex flex-col justify-between gap-6 bg-white">
            <div>
              <p className="text-xl font-semibold">Mã giảm giá riêng tư</p>
              <p>Áp dụng cho nhóm khách hàng hoặc khách hàng riêng</p>
            </div>

            <button
              className="text-white bg-[#338BFF] text-sm rounded-lg px-4 py-2.5 flex items-center w-fit"
              onClick={() => router.push("/tong-quan/tao-ma-giam-gia/rieng-tu")}
            >
              Tạo mã
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdditionalServiceProps {
  name: string;
  price: string;
  unit: string;
}

function AdditionalService({ name, price, unit }: AdditionalServiceProps) {
  return (
    <div className="border border-[#4F495026] rounded-2xl p-6 flex flex-col justify-between gap-6 bg-white">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-2xl font-semibold">
          {price}
          <span className="text-gray-400 text-sm font-normal">/{unit}</span>
        </p>
      </div>

      <button className="text-[#338BFF] bg-white text-sm rounded-lg px-4 py-2.5 flex items-center border border-[#338BFF] w-fit">
        Mua thêm
      </button>
    </div>
  );
}
