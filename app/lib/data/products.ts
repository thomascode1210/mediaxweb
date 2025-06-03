//products

// import { Product, ProductResponse } from "../definitions";
import { doRequest, getApiUrl } from "../utils";

export interface Product {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  import_price: number;
  retail_price: number;
  wholesale_price: number;
  category: string;
  barcode: string;
  is_active: boolean;
  weight: number;
  expiration_date: string;
  created_at: string; 
  updated_at: string; 
}


//lấy danh sách tất cả sản phẩm bảo gồm cả sản phẩm deactivate
export async function productsList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<Product[]> {
  let url = `${getApiUrl("products")}?skip=${skip}&limit=${limit}`;
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

//lấy chi tiết sản phẩm theo id
export async function productDetail(
  token: string,
  id: string
): Promise<Product> {
  const url = getApiUrl(`products/${id}`);
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
    `Không tìm thấy sản phẩm ID = ${id}`
  );
}

//tạo sản phẩm mới
export async function productCreate(
  token: string,
  payload: any
): Promise<Product> {
  const url = getApiUrl("products");
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
    "Tạo sản phẩm thất bại."
  );
}

//cập nhật sản phẩm
export async function productUpdate(
  token: string,
  id: string,
  payload: any
): Promise<Product> {
  const url = getApiUrl(`products/${id}`);
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
    "Cập nhật sản phẩm thất bại."
  );
}

//activate lại sản phẩm deactivate
export async function productActivate(
  token: string,
  id: string
): Promise<Product> {
  const url = getApiUrl(`products/${id}/activate`);

  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "Kích hoạt sản phẩm thất bại."
  );
}

//deactivate sản phẩm
export async function productDeactivate(
  token: string,
  id: string
): Promise<Product> {
  const url = getApiUrl(`products/${id}/deactivate`);

  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "Vô hiệu hóa sản phẩm thất bại."
  );
}