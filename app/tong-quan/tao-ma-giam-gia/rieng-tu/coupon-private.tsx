"use client";

import { StorefrontRounded } from "@mui/icons-material";

export default function CouponPrivate() {
   return (
     <div className="flex flex-col w-full">
       <p className="text-2xl font-bold mb-6">Mã giảm giá riêng tư</p>
 
       <div className="bg-white rounded-lg p-6 shadow-[0_2px_0_#D9D9D9]">
         <p className="text-xl font-semibold">Thông tin cơ bản</p>
 
         <div className="mt-6 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
             <label className="col-span-1">Loại mã</label>
             <div className="bg-[#E3F2FF] rounded-lg p-4 col-span-1 md:col-span-2 flex items-center gap-3 w-fit">
               <StorefrontRounded className="text-[#338BFF]" />
               <span>Voucher riêng tư</span>
             </div>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Tên chương trình giảm giá</label>
             <div className="col-span-1 md:col-span-2">
               <div className="relative flex items-center">
                 <input
                   type="text"
                   className="w-full border border-[#3C3C4359] rounded-md p-2"
                 />
                 <span className="absolute right-2 text-sm text-[#3C3C4366]">
                   0/100
                 </span>
               </div>
 
               {/* <div className="flex justify-between text-xs mt-1">
                 <span className="text-red-500">Không được để trống ô</span>
                 <span className="text-gray-500">0/100</span>
               </div> */}
               <p className="text-[#3C3C43B2] text-sm mt-1">
                 Tên Voucher sẽ không được hiển thị cho Người mua
               </p>
             </div>
           </div>
 
           {/* Mã voucher */}
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Mã Voucher</label>
             <div className="col-span-1 md:col-span-2">
               <div className="relative flex items-center">
                 <span className="absolute left-2 text-sm text-[#3C3C4366] pr-2 border-r border-[#3C3C4359] w-12">
                   TDUN
                 </span>
                 <input
                   type="text"
                   className="w-full border border-[#3C3C4359] rounded-md pl-16 py-2 pr-2"
                 />
                 <span className="absolute right-2 text-sm text-[#3C3C4366]">
                   0/5
                 </span>
               </div>
 
               {/* <div className="flex justify-between text-xs mt-1">
                 <span className="text-red-500">Không được để trống ô</span>
                 <span className="text-gray-500">0/100</span>
               </div> */}
               <p className="text-[#3C3C43B2] text-sm mt-1">
                 Vui lòng chỉ nhập các kí tự chữ cái (A-Z), số (0-9); tối đa 5 kí
                 tự.
               </p>
               <p className="text-[#3C3C43B2] text-sm mt-1">
                 Mã giảm giá đầy đủ là: TDUN
               </p>
             </div>
           </div>
 
           {/* Thời gian sử dụng mã */}
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Thời gian sử dụng mã</label>
             <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
               <div className="flex flex-wrap items-center gap-4">
                 <input
                   type="text"
                   className="p-2 border border-[#3C3C4359] rounded-md"
                   placeholder="18:10 19-05-2025"
                 />
                 <hr className="bg-[#3C3C4359] w-10 h-[1px]" />
                 <input
                   type="text"
                   className="p-2 border border-[#3C3C4359] rounded-md"
                   placeholder="18:10 19-05-2025"
                 />
               </div>
 
               {/* <div className="flex items-center gap-2">
                 <input type="checkbox" className="rounded-md" />
                 <span className="text-gray-700">
                   Cho phép lưu mã trước Thời gian sử dụng
                 </span>
               </div>
 
               <input
                 type="text"
                 className="p-2 border border-[#3C3C4359] rounded-md"
                 placeholder="18:02 19-05-2025"
               />
 
               <p className="text-sm -mt-3">
                 Khi voucher có hiệu lực sử dụng, mục này sẽ không được chỉnh sửa
               </p> */}
             </div>
           </div>
         </div>
       </div>
 
       <div className="bg-white rounded-lg p-6 mt-6 shadow-[0_2px_0_#D9D9D9]">
         <p className="font-semibold text-xl">Thiết lập mã giảm giá</p>
 
         <div className="space-y-10 mt-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Loại giảm giá | Mức giảm</label>
             <div className="col-span-1 md:col-span-2 flex items-center gap-0">
               {/* <Select
                 options={[
                   { label: "Theo phần trăm", value: "percent" },
                   { label: "Theo số tiền", value: "money" },
                 ]}
                 onSelect={(value) => console.log(value)}
                 defaultValue="percent"
                 btnClassName="py-2.5 rounded-l-md rounded-r-none bg-gray-100 text-black text-base"
                 // wrapperClassName="h-full"
               /> */}
               <select className="border border-[#3C3C4359] border-l-none rounded-l-md px-3 py-2 min-w-44">
                 <option>Theo số tiền</option>
                 <option>Theo phần trăm</option>
               </select>
 
               <input
                 type="text"
                 className="w-full rounded-r-md p-2 border border-[#3C3C4359] "
                 // placeholder="abc"
               />
             </div>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Giá trị đơn tối thiểu</label>
             <div className="col-span-1 md:col-span-2">
               <div className="relative flex items-center">
                 <input
                   type="text"
                   className="w-full border border-[#3C3C4359] rounded-md p-2"
                 />
                 {/* <span className="absolute right-2 text-sm text-[#3C3C4366]">
                   0/100
                 </span> */}
               </div>
             </div>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Tổng số lượt sử dụng tối đa</label>
             <div className="col-span-1 md:col-span-2">
               <div className="relative flex items-center">
                 <input
                   type="text"
                   className="w-full border border-[#3C3C4359] rounded-md p-2"
                 />
                 {/* <span className="absolute right-2 text-sm text-[#3C3C4366]">
                   0/100
                 </span> */}
               </div>
               <p className="text-[#3C3C43B2] text-sm mt-1">
                 Tổng số mã giảm giá có thể sử dụng
               </p>
             </div>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <label className="col-span-1">Lượt sử dụng tối đa 1 người</label>
             <div className="col-span-1 md:col-span-2">
               <div className="relative flex items-center">
                 <input
                   type="text"
                   className="w-full border border-[#3C3C4359] rounded-md p-2"
                   placeholder="1"
                 />
                 {/* <span className="absolute right-2 text-sm text-[#3C3C4366]">
                   0/100
                 </span> */}
               </div>
               {/* <p className="text-[#3C3C43B2] text-sm mt-1">
                 Tổng số mã giảm giá có thể sử dụng
               </p> */}
             </div>
           </div>
         </div>
       </div>
 
       <div className="flex flex-wrap justify-end mt-6 gap-4">
         <button className="text-[#E50000] border border-[#E50000] text-sm rounded-lg px-4 py-2 flex items-center justify-center font-medium gap-2 h-10 min-w-40">
           <span>Hủy</span>
         </button>
         <button className="bg-[#338BFF] text-white text-sm rounded-lg px-4 py-2 flex items-center justify-center font-medium gap-2 h-10 min-w-40">
           <span>Xác nhận</span>
         </button>
       </div>
     </div>
   );
}
