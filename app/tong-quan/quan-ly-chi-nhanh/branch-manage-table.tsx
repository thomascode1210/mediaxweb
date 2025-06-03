"use client";

import NoData from "@/app/components/NoData";
import StatusBadge from "@/app/ui/status";
import {
  CheckCircle,
  Download,
  FileDownloadOutlined,
} from "@mui/icons-material";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import PopupEditBranch from "./edit-branch";

interface TableBranchManageProps {
  data: {
    id: string;
    name: string;
    address: string;
    area: string;
    exprired_at: string;
    status: string;
    isDefault: boolean;
  }[];
}

const TableBranchManage: React.FC<TableBranchManageProps> = ({ data }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const columns: TableColumnsType = [
    {
      title: "Tên chi nhánh",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Mã CN",
      dataIndex: "id",
      key: "id",
      width: "12.4%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "15%",
    },

    {
      title: "Khu vực",
      dataIndex: "area",
      key: "area",
      width: "12.4%",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "exprired_at",
      key: "exprired_at",
      width: "12.4%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      width: "12.4%",
      render: (value) => <StatusBadge type="branch_status" value={value} />,
    },
    {
      title: <div className="truncate w-full text-center">CN Mặc định</div>,
      dataIndex: "isDefault",
      key: "isDefault",
      width: "12.4%",
      ellipsis: true,
      render: (value) => {
        return (
          <div className="flex items-center justify-center w-full">
            {value && <CheckCircle className="text-green-500" />}
          </div>
        );
      },
    },
  ];

  const tableData = data.map((item) => ({
    ...item,
    key: item.id.toString(),
  }));

  const handleRowClick = (record: any) => {
    setSelectedId(record.id);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        rowClassName={() => `hover:cursor-pointer`}
        tableLayout="fixed"
        pagination={false}
        showSorterTooltip={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
        })}
        locale={{
          emptyText: (
            <NoData message="Hiện chưa có giao dịch nào" className="py-4" />
          ),
        }}
      />

      {isEditOpen && selectedId && (
        <PopupEditBranch
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          branchId={selectedId}
        />
      )}
    </>
  );
};

export default TableBranchManage;
