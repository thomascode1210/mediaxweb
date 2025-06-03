//warehouses

import { WarehouseResponse } from "../definitions";
import { doRequest, getApiUrl } from "../utils";

//lấy danh sách kho
export async function warehousesList(
  token: string
): Promise<WarehouseResponse[]> {
  const url = getApiUrl("warehouses");
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
    "Không tìm thấy kho hàng."
  );
}

//lấy chi tiết kho hàng
export async function warehouseDetail(
  token: string,
  id: string
): Promise<WarehouseResponse> {
  const url = getApiUrl(`warehouses/${id}`);
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
    `Không tìm thấy kho hàng ID = ${id}`
  );
}

//tạo kho hàng
export async function warehouseCreate(
  token: string,
  formData: {
    name: string;
    description?: string;
    address?: {
      name: string;
      addressable_type: string;
      phone_number: string;
      province_code: number;
      province_name: string;
      district_code: number;
      district_name: string;
      ward_code: string;
      ward_name: string;
      address: string;
    };
  }
): Promise<WarehouseResponse> {
  const url = getApiUrl("warehouses");
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
    },
    "Tạo kho hàng thất bại."
  );
}

//chỉnh sửa kho hàng
export async function warehouseUpdate(
  token: string,
  id: string,
  formData: {
    name: string;
    description?: string;
    address?: {
      name: string;
      addressable_type: string;
      phone_number: string;
      province_code: number;
      province_name: string;
      district_code: number;
      district_name: string;
      ward_code: string;
      ward_name: string;
      address: string;
    };
  }
): Promise<WarehouseResponse> {
  const url = getApiUrl(`warehouses/${id}`);
  console.log(typeof formData);
  return await doRequest(
    url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
    },
    "Cập nhật kho hàng thất bại."
  );
}

//xoá kho hàng
export async function warehouseDelete(token: string, id: string) {
  const url = getApiUrl(`warehouses/${id}`);
  return await doRequest(
    url,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "Xóa kho hàng thất bại."
  );
}
