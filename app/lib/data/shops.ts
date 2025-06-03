// import { ShopResponse } from "../definitions";
import { doRequest, getApiUrl } from "../utils";

export interface ShopResponse {
  shop_id: string;
  slug: string;
  name: string;
  shop_type: string;
  email?: string;
  phone_number?: string;
  logo_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export async function shopsList(token: string): Promise<ShopResponse[]> {
  const url = getApiUrl("shops");
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
    "Không tìm thấy cửa hàng."
  );
}

//lấy chi tiết cửa hàng
export async function shopDetail(
  token: string,
  id: string
): Promise<ShopResponse> {
  const url = getApiUrl(`shops/${id}`);
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
    `Không tìm thấy cửa hàng ID = ${id}`
  );
}

//tạo cửa hàng
export async function shopCreate(
  token: string,
  formData: {
    name: string;
    shop_type: string;
    email?: string;
    phone_number?: string;
    logo_url?: string;
    description?: string;
    slug?: string;
  }
): Promise<ShopResponse> {
  const url = getApiUrl("shops");
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
    "Tạo cửa hàng thất bại."
  );
}

//chỉnh sửa cửa hàng
export async function shopUpdate(
  token: string,
  id: string,
  formData: {
    name?: string;
    shop_type?: string;
    email?: string;
    phone_number?: string;
    logo_url?: string;
    description?: string;
    slug?: string;
  }
): Promise<ShopResponse> {
  const url = getApiUrl(`shops/${id}`);
  return await doRequest(
    url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    },
    "Cập nhật cửa hàng thất bại."
  );
}

//xoá cửa hàng
export async function shopDelete(
  token: string,
  id: string
): Promise<ShopResponse> {
  const url = getApiUrl(`shops/${id}`);
  return await doRequest(
    url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Xóa cửa hàng thất bại."
  );
}