import { doRequest, getApiUrl } from "../utils";

export interface Supplier {
  supplier_id: string;
  name: string;
  address_id: string;
  email: string;
  phone_number: string;
  debt: number;
  total_goods_receipt: number;
  total_amount_goods_receipt: number;
  total_return_goods_receipt: number;
  total_amount_return_goods_receipt: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

//lấy danh sách nhà cung cấp
export async function supplierList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<Supplier[]> {
  let url = `${getApiUrl("suppliers")}?skip=${skip}&limit=${limit}`;
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
    "Không tìm thấy nhà cung cấp."
  );
}

//lấy chi tiết nhà cung cấp
export async function supplierDetail(
  token: string,
  id: string
): Promise<Supplier> {
  const url = getApiUrl(`suppliers/${id}`);
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
    `Không tìm thấy nhà cung cấp ID = ${id}`
  );
}

// tạo nhà cung cấp mới
export async function supplierCreate(
  token: string,
  payload: any
  // payload: {
  //   name: string;
  //   address_id: string;
  //   email: string;
  //   phone_number: string;
  // }
): Promise<Supplier> {
  const url = getApiUrl("suppliers");
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
    "Tạo nhà cung cấp thất bại."
  );
}

// cập nhật nhà cung cấp
export async function supplierUpdate(
  token: string,
  id: string,
  payload: {
    name: string;
    address_id: string;
    email: string;
    phone_number: string;
    debt: number;
    // total_goods_receipt: number;
    // total_amount_goods_receipt: number;
    // total_return_goods_receipt: number;
    // total_amount_return_goods_receipt: number;
  }
): Promise<Supplier> {
  const url = getApiUrl(`suppliers/${id}`);
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
    "Cập nhật nhà cung cấp thất bại."
  );
}

// xóa nhà cung cấp
export async function supplierDelete(token: string, id: string): Promise<void> {
  const url = getApiUrl(`suppliers/${id}`);
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
    "Xóa nhà cung cấp thất bại."
  );
}
