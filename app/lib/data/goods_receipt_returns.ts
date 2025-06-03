
import { doRequest, getApiUrl } from "../utils";

// export interface GoodsReceiptReturnItem {
//     id: string;
//     goods_receipt_id : string;
//     quantity: number;
// }

export interface GoodsReceiptReturn {
  id: string;
  goods_receipt_id: string;
  product_id: string;
  quantity: number;
  note: string;
  created_at: string; 
  updated_at: string; 
}


//lấy chi tiết phiếu trả
export async function goodsReceiptReturnDetail(
  token: string,
  id: string
): Promise<GoodsReceiptReturn> {
  const url = getApiUrl(`goods_receipt_returns/${id}`);
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
    "Không tìm thấy phiếu trả ID = " + id
  );
}

//cập nhật phiếu trả
export async function goodsReceiptReturnUpdate(
  token: string,
  id: string,
  payload: any
): Promise<GoodsReceiptReturn> {
  const url = getApiUrl(`goods_receipt_returns/${id}`);
  return await doRequest(
    url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
    "Không tìm thấy phiếu trả ID = " + id
  );
}

//xác nhận hoàn thành trả hàng
export async function goodsReceiptReturnConfirm(token: string, id: string) {
  const url = getApiUrl(`goods_receipt_returns/${id}/confirm`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
    "Xác nhận trả hàng thất bại."
  );
}

//tạo phiếu trả
export async function goodsReceiptReturnCreate(token: string, payload: any) {
  const url = getApiUrl(`goods_receipt_returns`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
    "Tạo phiếu trả thất bại."
  );
}

//lấy danh sách phiếu trả hàng
export async function goodsReceiptReturnList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<GoodsReceiptReturn[]> {
  let url = getApiUrl(`goods_receipt_returns?skip=${skip}&limit=${limit}`);
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
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
    "Không tìm thấy phiếu trả hàng."
  );
}

//hủy phiếu trả
export async function goodsReceiptReturnCancel(token: string, id: string) {
  const url = getApiUrl(`goods_receipt_returns/${id}`);
  return await doRequest(
    url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
    "Hủy phiếu trả hàng thất bại."
  );
}
