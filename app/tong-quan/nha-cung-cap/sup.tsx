"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import TableSupplier from "@/app/ui/supplier/table"; 
import CreateSupplierButton from "@/app/ui/supplier/buttons";
import RowsPerPage from "@/app/ui/rows-page";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

// import { Supplier } from "@/app/lib/definitions";
import { fetchSuppliersData } from "@/app/lib/data";
import ErrorPage from "../404/page";
import { Supplier, supplierList } from "@/app/lib/data/suppliers";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [totalSuppliers, setTotalSuppliers] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSuppliers() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("No access token found");
          setLoading(false);
          return;
        }

        const data = await supplierList(token, rowsPerPage, currentPage, query);
        console.log(data);
        setSuppliers(data);
        setTotalSuppliers(data.length);
      } catch (err: any) {
        console.error("Error fetching supplier data:", err);
        setError(err.message || "Error fetching supplier data");
      } finally {
        setLoading(false);
      }
    }

    loadSuppliers();
  }, [rowsPerPage, currentPage, query]);

  const totalPages = Math.ceil(totalSuppliers / rowsPerPage);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Danh sách nhà cung cấp</h1>
        <CreateSupplierButton />
      </div>
      <div className='bg-white p-6 rounded-2xl mt-6 border boder-[#DFDCE0] shadow-[0_2px_0_#D9D9D9]'>
        <div className="flex items-center justify-between gap-2 mb-6">
          <Search placeholder="Tìm kiếm theo tên nhà cung cấp, số điện thoại..." />
        </div>

        {loading && <InvoicesTableSkeleton />}
        {/* {error && (
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        )} */}

        {!loading && !error && (
          <TableSupplier initialData={suppliers} />
        )}

        <div className="mt-5 flex w-full justify-between">
          <RowsPerPage defaultValue={rowsPerPage} />
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
