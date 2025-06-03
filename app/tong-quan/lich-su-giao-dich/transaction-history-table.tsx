"use client";

import NoData from "@/app/components/NoData";
import StatusBadge from "@/app/ui/status";
import { Download, FileDownloadOutlined } from "@mui/icons-material";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface TableTransactionHistoryProps {
  data: {
    id: string;
    store: string;
    created_at: string;
    content: string;
    amount: number;
    status: string;
    action: string;
  }[];
}

const TableTransactionHistory: React.FC<TableTransactionHistoryProps> = ({
  data,
}) => {
  const columns: TableColumnsType = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      width: "12.4%",
      ellipsis: true,
    },
    {
      title: "Cửa hàng",
      dataIndex: "store",
      key: "store",
      width: "12.4%",
    },
    {
      title: "Ngày mua",
      dataIndex: "created_at",
      key: "created_at",
      width: "12.4%",
    },

    {
      title: "Nội dung giao dịch",
      dataIndex: "content",
      key: "content",
      width: "29%",
    },
    {
      title: "Thành tiền",
      dataIndex: "amount",
      key: "amount",
      width: "12.4%",
      render: (amount: number) => {
        return amount.toLocaleString("en-US");
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      width: "12.4%",
      render: (value) => <StatusBadge type="purchase_status" value={value} />,
    },
    {
      title: "Thao tác",
      //   dataIndex: "action",
      key: "action",
      ellipsis: true,
      render: () => {
        return (
          <div className="flex items-center justify-center w-full">
            <FileDownloadOutlined />
          </div>
        );
      },
    },
  ];

  const tableData = data.map((item) => ({
    ...item,
    key: item.id.toString(),
  }));

  return (
    <div className="">
      <Table
        columns={columns}
        dataSource={tableData}
        rowClassName={() => `hover:cursor-pointer`}
        tableLayout="fixed"
        pagination={false}
        showSorterTooltip={false}
        locale={{
          emptyText: (
            <NoData message="Hiện chưa có giao dịch nào" className="py-4" />
          ),
        }}
      />
    </div>
  );
};

export default TableTransactionHistory;
