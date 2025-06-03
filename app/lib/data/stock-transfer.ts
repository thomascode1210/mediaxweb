//stock_transfers

import {
  TransactionTranferCreate,

  TransactionTranferUpdate,
} from "../definitions";
import { doRequest, getApiUrl } from "../utils";

export interface StockTransfer {
  stock_transfer_id: string;
  from_warehouse_id: string;
  to_warehouse_id: string;
  product_id: string;
  quantity: number;
  created_at: string; 
  updated_at: string; 
}


//danh sách phiếu chuyển
export async function stockTransferList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<{
    stock_transfers: StockTransfer[];
    total: number;
    page: number;
    limit: number;
}> {
  let url = `${getApiUrl("stock_transfers")}?skip=${skip}&limit=${limit}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const res = await doRequest(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
    "Không tìm thấy phiếu chuyển kho."
  );
  return res;
}

//chi tiết phiếu chuyển
export async function stockTransferDetail(
  token: string,
  id: string
): Promise<StockTransfer> {
  const url = getApiUrl(`stock_transfers/${id}`);
  return await doRequest(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
    `Không tìm thấy phiếu chuyển ID = ${id}`
  );
}

//tạo phiếu chuyển
export async function stockTransferCreate(
  token: string,
  formData: TransactionTranferCreate
): Promise<StockTransfer> {
  const url = getApiUrl("stock_transfers");
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    },
    "Tạo phiếu chuyển thất bại.",
    true
  );
}

//chỉnh sửa phiếu chuyển
export async function stockTransferUpdate(
  token: string,
  id: string,
  payload: TransactionTranferUpdate
) {
  const url = getApiUrl(`stock_transfers/${id}`);
  return await doRequest(
    url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
    "Cập nhật phiếu chuyển thất bại.",
    true
  );
}

//xác nhận hoàn thành phiếu chuyển
export async function stockTransferComplete(
  token: string,
  id: string
): Promise<StockTransfer> {
  const url = getApiUrl(`stock_transfers/${id}/complete`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Xác nhận hoàn thành phiếu chuyển thất bại.",
    true
  );
}

//hủy phiếu chuyển
export async function stockTransferCancel(
  token: string,
  id: string
): Promise<StockTransfer> {
  const url = getApiUrl(`stock_transfers/${id}/cancel`);
  return await doRequest(
    url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Hủy phiếu chuyển thất bại."
  );
}
