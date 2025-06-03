"use client";

import TableTransactionHistory from "./transaction-history-table";

const mockTransactionHistory = {
  data: [
    {
      id: "txn_001",
      store: "Shop Hoa Hồng",
      created_at: "2025-05-20",
      content: "Thanh toán đơn hàng #A1023",
      amount: 450000,
      status: "received_paid",
      action: "Xem chi tiết",
    },
    {
      id: "txn_002",
      store: "Cửa Hàng Mộc",
      created_at: "2025-05-19",
      content: "Đơn hàng chờ thanh toán",
      amount: 280000,
      status: "received_unpaid",
      action: "Thanh toán ngay",
    },
    {
      id: "txn_003",
      store: "Điện Máy Xanh",
      created_at: "2025-05-18",
      content: "Thanh toán thiết bị mới",
      amount: 1200000,
      status: "pending",
      action: "Hủy giao dịch",
    },
    {
      id: "txn_004",
      store: "Văn Phòng Phẩm An Khang",
      created_at: "2025-05-17",
      content: "Mua sổ tay + bút",
      amount: 85000,
      status: "received_paid",
      action: "In hóa đơn",
    },
    {
      id: "txn_005",
      store: "Nhà Sách FAHASA",
      created_at: "2025-05-16",
      content: "Đặt sách lập trình",
      amount: 310000,
      status: "canceled",
      action: "Đặt lại",
    },
  ],
};



export default function TransactionHistory() {
  return (
    <div className="flex flex-col w-full">
      <p className="text-2xl font-bold mb-2">Lịch sử giao dịch</p>

      <div className='bg-white p-6 rounded-2xl mt-4 border boder-[#DFDCE0] shadow-[0_2px_0_#D9D9D9]'>
        <TableTransactionHistory data={mockTransactionHistory.data} />
      </div>
    </div>
  );
}
