
import { doRequest, getApiUrl } from "../utils";

export interface CustomerGroup {
  id: number;
  name: string;
  discount_type: string;
  discount_value: number;
  description: string;
  created_at: string;
  updated_at: string; 
}

//lấy danh sách nhóm khách hàng
export async function customerGroupsList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<CustomerGroup[]> {
  let url = `${getApiUrl("customer_groups")}`;
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
    "Không tìm thấy nhóm khách hàng."
  );
  return res;
}

//tạo mới nhóm khách hàng
export async function customerGroupCreate(
  token: string,
  payload: {
    name: string;
    discount_type: string;
    description: string;
  }
): Promise<CustomerGroup> {
  const url = getApiUrl("customer_groups");
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
    "Tạo mới nhóm khách hàng không thành công."
  );
}

//lấy chi tiết nhóm khách hàng
export async function customerGroupDetail(
  token: string,
  id: number
): Promise<CustomerGroup> {
  const url = getApiUrl(`customer_groups/${id}`);
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
    `Không tìm thấy nhóm khách hàng ID = ${id}`
  );
}

//cập nhật nhóm khách hàng
export async function customerGroupUpdate(
  token: string,
  id: number,
  payload: {
    name: string;
    discount_type: string;
    discount: number;
    description: string;
  }
): Promise<CustomerGroup> {
  const url = getApiUrl(`customer_groups/${id}`);
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
    "Cập nhật nhóm khách hàng không thành công."
  );
}

//xóa nhóm khách hàng
export async function customerGroupDelete(
  token: string,
  id: string,
) {
  const url = getApiUrl(`customer_groups/${id}`);
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
    `Xóa nhóm khách hàng không thành công.`
  );
}
