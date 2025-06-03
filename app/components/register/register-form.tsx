"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";

export default function RegisterForm() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="hidden md:flex w-full items-center text-center justify-center  bg-[url('/bg-posx.jpg')] bg-cover bg-no-repeat bg-center">
        <Icons.posX className="h-16 w-auto"/>
      </div>
      <div className="justify-center items-center flex flex-col gap-8 w-full md:w-[600px] px-10 py-[58px]">
        <p className="font-semibold text-2xl text-center">
          Dùng thử miễn phí 7 ngày của POSX
        </p>

        <input
          type="email"
          className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
          placeholder="Mật khẩu"
        />

        <input
          type="text"
          className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
          placeholder="Tên khách hàng"
        />

        <input
          type="text"
          className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
          placeholder="Số điện thoại"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <input
            type="text"
            className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
            placeholder="Tên cửa hàng"
          />

          <input
            type="text"
            className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
            placeholder="Ngành hàng"
          />
        </div>

        <input
          type="text"
          className="w-full border-2 border-[#3C3C4359] rounded-lg px-4"
          placeholder="Địa chỉ cửa hàng"
        />

        <div className="flex items-start gap-1 w-full">
          <input
            type="checkbox"
            className="border-2 border-[#3C3C4359] rounded mt-[3px] size-4"
          />
          <p className="text-sm">
            Tôi đã đọc, đồng ý với Chính sách bảo vệ dữ liệu cá nhân & Quy định
            sử dụng của PosX
          </p>
        </div>

        <button
          className="bg-[#338BFF] text-white rounded-lg p-2 w-full font-medium"
          onClick={() => router.push("/dang-ky/goi-dich-vu")}
        >
          Đăng ký
        </button>

        <div className="w-full flex items-center justify-center">
          <div className="h-[1px] bg-[#3C3C4359] w-full"></div>
          <span className="w-fit shrink-0 px-1 text-center text-sm text-[#3C3C4366]">
            Hoặc đăng ký
          </span>
          <div className="h-[1px] bg-[#3C3C4359] w-full"></div>
        </div>

        <div className="w-full justify-evenly flex gap-2">
          <button className="flex items-center justify-center border border-[#3C3C4359] rounded-lg w-full text-sm h-10 font-semibold">
            <Icons.facebook className="size-5 mr-1 shrink-0" />
            Facebook
          </button>
          <button className="flex items-center justify-center border border-[#3C3C4359] rounded-lg w-full text-sm h-10 font-semibold">
            <Icons.google className="size-4 mr-1 shrink-0" />
            Google
          </button>
        </div>

        <div className="w-full text-center flex gap-2 justify-center">
          <p>Bạn đã có tài khoản?</p>
          <Link href="/dang-nhap" className="text-blue-500">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
