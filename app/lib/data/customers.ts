import { doRequest, getApiUrl } from "../utils";

export interface Customer {
  id: string;
  full_name: string;
  group_id: number;
  cumulative_points: number;
  address_id: string;
  date_of_birth: string;
  email: string;
  total_spending: number;
  active: boolean;
  debt: number;
  created_at: string;
  updated_at: string;
}

export async function customerList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<{
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
}> {
  let url = `${getApiUrl("customers")}?skip=${skip}&limit=${limit}`;
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
    "Không tìm thấy khách hàng."
  );
}

export async function customerDetail(
  token: string,
  id: string
): Promise<Customer> {
  const url = getApiUrl(`customers/${id}`);
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
    `Không tìm thấy khách hàng ID = ${id}`
  );
}

export async function customerCreate(
  token: string,
  payload: any
  // payload: {
  //   full_name: string;
  //   group_id: number;
  //   cumulative_points: number;
  //   address_id: string;
  //   date_of_birth: string;
  //   email: string;
  //   total_spending: number;
  //   active: boolean;
  //   debt: number;
  // }
): Promise<Customer> {
  const url = getApiUrl("customers");
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
    "Tạo mới khách hàng không thành công."
  );
}

export async function customerUpdate(
  token: string,
  id: string,
  payload: any,
  // payload: {
  //   full_name: string;
  //   group_id: number;
  //   cumulative_points: number;
  //   address_id: string;
  //   date_of_birth: string;
  //   email: string;
  //   total_spending: number;
  //   active: boolean;
  //   debt: number;
  // }
): Promise<Customer> {
  const url = getApiUrl(`customers/${id}`);
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
    "Cập nhật khách hàng không thành công."
  );
}

export async function customerDelete(
  token: string,
  id: string,
) {
  const url = getApiUrl(`customers/${id}`);
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
    "Xoá khách hàng không thành công."
  );
}
