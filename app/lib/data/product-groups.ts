//product_groups

import { Product, ProductGroupResponse } from "../definitions";
import { doRequest, getApiUrl } from "../utils";

export interface ProductGroup {
  product_group_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}


//tạo nhóm sản phẩm
export async function productGroupCreate(
  token: string,
  payload: {
    name: string;
    description: string;
  }
): Promise<ProductGroup> {
  const url = getApiUrl("product_groups");
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
    "Tạo nhóm sản phẩm thất bại."
  );
}

//chi tiết nhóm sản phẩm
export async function productGroupDetail(
  token: string,
  id: string
): Promise<ProductGroup> {
  const url = getApiUrl(`product_groups/${id}`);
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
    `Không tìm thấy nhóm sản phẩm ID = ${id}`
  );
}

//lấy danh sách nhóm sản phẩm, search sản phẩm
export async function productGroupList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<ProductGroup[]> {
  let url = `${getApiUrl("product_groups")}?skip=${skip}&limit=${limit}`;
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
    "Failed to fetch products"
  );
  return res;
}

//câp nhật nhóm sản phẩm
export async function productGroupUpdate(
  token: string,
  id: string,
  payload: {
    name: string;
    description: string;
  }
): Promise<ProductGroup> {
  const url = getApiUrl(`product_groups/${id}`);
  return await doRequest(
    url,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    "Cập nhật nhóm sản phẩm thất bại."
  );
}

//xóa nhóm sản phẩm
export async function productGroupDelete(token: string, id: string) {
  const url = getApiUrl(`product_groups/${id}`);
  return await doRequest(
    url,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "Xóa nhóm sản phẩm thất bại."
  );
}