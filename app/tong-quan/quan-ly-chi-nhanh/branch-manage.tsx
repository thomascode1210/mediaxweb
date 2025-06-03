"use client";

import { useState, useEffect } from "react";
import TableTransactionHistory from "./branch-manage-table";
import PopupCreateBranch from "./create-branch";
import { warehousesList } from "../../lib/data/warehouses";

interface Branch { //mock interface chưa có
  id: string;
  name: string;
  address: string;
  area: string;
  exprired_at: string;
  status: string;
  isDefault: boolean;
  phone?: string;
  description?: string;
}

export default function BranchManage() {
  const [isCreateBranch, setIsCreateBranch] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const apiBranches = await warehousesList(token);
        const mappedBranches: Branch[] = apiBranches.map(branch => ({
          id: branch.warehouse_id,
          name: branch.name,
          address: branch.address?.address || 
                  `${branch.address?.district_name || ''}, ${branch.address?.province_name || ''}` || 
                  "Địa chỉ chưa cập nhật",
          area: "Miền Bắc",
          exprired_at: "2025-12-31",
          status: "active",
          isDefault: branch.warehouse_id === apiBranches[0].warehouse_id,
          phone: branch.address?.phone_number,
          description: branch.description,
        }));
        
        setBranches(mappedBranches);
      } catch (err) {
        console.error("Error fetching branches:", err);
        setError("Không thể tải danh sách chi nhánh");
      } finally {
        setLoading(false);
      }
    }
    
    fetchBranches();
  }, []);

  const handleCreateBranch = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No authentication token found");
      
      const apiBranches = await warehousesList(token);
      const mappedBranches: Branch[] = apiBranches.map(branch => ({
        id: branch.warehouse_id,
        name: branch.name,
        address: branch.address?.address || 
                `${branch.address?.district_name || ''}, ${branch.address?.province_name || ''}` || 
                "Địa chỉ chưa cập nhật",
        area: "Miền Bắc",
        exprired_at: "2025-12-31",
        status: "active",
        isDefault: branch.warehouse_id === apiBranches[0].warehouse_id,
        phone: branch.address?.phone_number,
        description: branch.description,
      }));
      
      setBranches(mappedBranches);
    } catch (error) {
      console.error("Error refreshing branches:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Quản lý chi nhánh</h1>
          <button
            className="px-4 py-2.5 bg-[#338BFF] text-white rounded-md"
            onClick={() => {
              setIsCreateBranch(true);
            }}
          >
            Tạo chi nhánh
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl mt-4 border boder-[#DFDCE0] shadow-[0_2px_0_#D9D9D9]">
            {loading ? (
              <div>Đang tải...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <TableTransactionHistory data={branches} />
          )}
        </div>
      </div>

      <PopupCreateBranch
        isOpen={isCreateBranch}
        onClose={() => setIsCreateBranch(false)}
        onCreate={handleCreateBranch}
      />
    </>
  );
}