import { Product, PurchaseItem } from "../definitions";
import { doRequest, getApiUrl } from "../utils";

export interface GoodsReceiptItem {
  goods_receipt_id: string;
  product_id: string;
  quantity: number;
  price: number;
  discount: number;
  note: string;
}

export interface GoodsReceipt {
  goods_receipt_id: string;
  supplier_id: string;
  warehouse_id: string;
  user_id: string;
  note: string;
  discount: number;
  extra_fee: number;
  paid_amount: number;
  status: string;
  delivery_date: string;
  active: boolean;
  items: GoodsReceiptItem[];
  created_at: string;
  updated_at: string;
}

//thanh toán theo đơn cho nhà cung cấp
export async function goodsReceiptPay(
  token: string,
  id: string,
  amount: number
) {
  const url = getApiUrl(`goods_receipts/${id}/pay`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    },
    "Thanh toán thất bại."
  );
}

//lấy danh sách phiếu nhập
export async function goodsReceiptList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<GoodsReceipt[]> {
  let url = `${getApiUrl("goods_receipts")}?skip=${skip}&limit=${limit}`;
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
    "Không tìm thấy ds phiếu nhập."
  );
  return res;
}

//tạo phiếu nhập
export async function goodsReceiptCreate(
  token: string,

  payload: {
    supplier_id: string;
    user_id: string;
    warehouse_id: string;
    note: string;
    discount: number;
    extra_fee: number;
    status: string;
    delivery_date: string;
    items: {
      product_id: string;
      quantity: number;
      price: number;
      discount: number;
      note: string;
    }[];
  }
) {
  const url = getApiUrl("goods_receipts");
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
    "Tạo phiếu nhập thất bại."
  );
}

//lấy chi tiết phiếu nhập
export async function goodsReceiptDetail(
  token: string,
  id: string
): Promise<GoodsReceipt> {
  const url = getApiUrl(`goods_receipts/${id}`);
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
    "Không tìm thấy phiếu nhập ID = " + id
  );
}

//cập nhật phiếu nhập
export async function goodsReceiptUpdate(
  token: string,
  id: string,
  payload: {
    supplier_id: string;
    staff_id: string;
    warehouse_id: string;
    note: string;
    discount: number;
    extra_fee: number;
    status: string;
    delivery_date: string;
    items: GoodsReceiptItem[];
  }
): Promise<GoodsReceipt> {
  const url = getApiUrl(`goods_receipts/${id}`);
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
    "Cập nhật phiếu nhập thất bại."
  );
}

//hủy phiếu nhập
export async function goodsReceiptCancel(
  token: string,
  id: string
): Promise<GoodsReceipt> {
  const url = getApiUrl(`goods_receipts/${id}/cancel`);
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
    "Hủy phiếu nhập thất bại."
  );
}

export async function goodsReceiptDelete(
  token: string,
  id: string
): Promise<GoodsReceipt> {
  const url = getApiUrl(`goods_receipts/${id}`);
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
    "Hủy phiếu nhập thất bại."
  );
}

//xác nhận nhập hàng phiếu nhập
export async function goodsReceiptConfirm(
  token: string,
  id: string
): Promise<GoodsReceipt> {
  const url = getApiUrl(`goods_receipts/${id}/confirm`);
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
    "Xác nhận nhập hàng phiếu nhập thất bại."
  );
}

//lấy danh sách item phiếu nhập
export async function goodsReceiptItemsList(
  token: string
): Promise<GoodsReceiptItem[]> {
  const url = getApiUrl(`goods_receipt_items`);
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
    "Không tìm thấy item phiếu nhập."
  );
}

//chi tiết item phiếu nhập
export async function goodsReceiptItemsDetail(
  token: string,
  id: string
): Promise<GoodsReceiptItem> {
  const url = getApiUrl(`goods_receipt_items/${id}`);
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
    "Không tìm thấy item ID = " + id
  );
}

//tạo item phiếu nhập
export async function goodsReceiptItemsCreate(
  token: string,
  payload: GoodsReceiptItem
): Promise<GoodsReceiptItem> {
  const url = getApiUrl(`goods_receipt_items`);
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
    "Tạo item phiếu nhập thất bại."
  );
}

//cập nhật item phiếu nhập
export async function goodsReceiptItemsUpdate(
  token: string,
  id: string,
  payload: GoodsReceiptItem
): Promise<GoodsReceiptItem> {
  const url = getApiUrl(`goods_receipt_items/${id}`);
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
    "Cập nhật item phiếu nhập thất bại."
  );
}
