import { doRequest, getApiUrl } from "../utils";

export interface Address {
  id: string;
  name: string;
  addressable_type: "warehouse" | string;
  phone_number: string;
  province_code: number;
  province_name: string;
  district_code: number;
  district_name: string;
  ward_code: string;
  ward_name: string;
  address: string;
  created_at: string;
  updated_at: string;
  warehouse_id: string;
}

export async function addressCreate(
  token: string,
  payload: any
): Promise<Address> {
  const url = getApiUrl(`addresses`);
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
    "Tạo địa chỉ thất bại."
  );
}
