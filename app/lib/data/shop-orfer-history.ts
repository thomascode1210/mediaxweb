import {
  Invoice,
  InvoiceItem,
  InvoiceListResponse,
  ServiceItem,
} from "../definitions";
import { doRequest, getApiUrl } from "../utils";

//danh sách đơn hàng
export async function shopOrderHistoryList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<InvoiceListResponse[]> {
  let url = `${getApiUrl("shop_order_history")}?skip=${skip}&limit=${limit}`;
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
    "Không tìm thấy đơn hàng."
  );
  return res;
}

//chi tiết đơn hàng
export async function shopOrderHistoryDetail(
  token: string,
  id: string
): Promise<Invoice> {
  const url = getApiUrl(`shop_order_history/${id}`);
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
    `Không tìm thấy đơn hàng ID = ${id}`
  );
}

interface ShopOrderHistoryCreate {
  customer_id: string;
  user_id: string;
  discount: number;
  deposit: number;
  deposit_method: string;
  discount_type: string;
  note: string;
  warehouse_id: string;
  is_delivery: boolean;
  delivery_partner: string;
  order_source: string;
  items: InvoiceItem[];
  service_items: ServiceItem[];
  extra_cost: number;
}

//tạo đơn hàng
export async function shopOrderHistoryCreate(
  token: string,
  payload: ShopOrderHistoryCreate
): Promise<Invoice> {
  const url = getApiUrl("shop_order_history");
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
    "Tạo đơn hàng thất bại."
  );
}

//chỉnh sửa đơn hàng

interface ShopOrderHistoryUpdate {
  payment_status: string;
  discount: number;
  deposit: number;
  deposit_method: string;
  discount_type: string;
  note: string;
  warehouse_id: string;
  is_delivery: boolean;
  delivery_partner: string;
  order_source: string;
  items: InvoiceItem[];
  service_items: ServiceItem[];
  extra_cost: number;
}

export async function shopOrderHistoryUpdate(
  token: string,
  id: string,
  payload: ShopOrderHistoryUpdate
): Promise<Invoice> {
  const url = getApiUrl(`shop_order_history/${id}`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
    "Chỉnh sửa đơn hàng thất bại."
  );
}

//hủy đơn hàng
export async function shopOrderHistoryCancel(
  token: string,
  id: string
): Promise<Invoice> {
  const url = getApiUrl(`shop_order_history/${id}/cancel`);
  return await doRequest(
    url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Hủy đơn hàng thất bại."
  );
}

//xác nhận hoàn thành đơn hàng thủ công
export async function shopOrderHistoryConfirm(token: string, id: string) {
  const url = getApiUrl(`shop_order_history/${id}/confirm`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Xác nhận đơn hàng thất bại."
  );
}
