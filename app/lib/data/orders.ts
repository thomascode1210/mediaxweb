import { doRequest, getApiUrl } from "../utils";

export interface Order {
  order_id: string;
  user_id: string;
  warehouse_id: string;
  deposit: number;
  order_date: string;
  total_value: number;
  status: string;
  web: string;
  note: string;
  is_delivery: boolean;
  delivery_partner: string;
  created_at: string;
  updated_at: string;
}

export async function orderList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<Order[]> {
  let url = `${getApiUrl("orders")}?skip=${skip}&limit=${limit}`;
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

export async function orderDetail(token: string, id: string): Promise<Order> {
  const url = getApiUrl(`orders/${id}`);
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

export async function orderCreate(
  token: string,
  payload: any
  // payload: {
  //   customer_id: string;
  //   user_id: string;
  //   discount: number;
  //   deposit: number;
  //   deposit_method: string;
  //   discount_type: string;
  //   note: string;
  //   warehouse_id: string;
  //   is_delivery: boolean;
  //   delivery_partner: string;
  // }
): Promise<Order> {
  const url = getApiUrl("orders");
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
    "Tạo đơn hàng thất bại."
  );
}

export async function orderUpdate(
  token: string,
  id: string,
  payload: any
): Promise<Order> {
  const url = getApiUrl(`orders/${id}`);
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
    "Cập nhật đơn hàng thất bại."
  );
}

export async function orderCancel(token: string, id: string) {
  const url = getApiUrl(`orders/${id}`);
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
    "Hủy đơn hàng thất bại."
  );
}
