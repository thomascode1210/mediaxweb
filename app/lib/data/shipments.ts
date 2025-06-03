import { DeliveryCreate, DeliveryListResponse } from "../definitions";
import { doRequest, getApiUrl } from "../utils";

export interface Shipment {
  shipment_id: string;
  order_id: string;
  provider_id: number;
  payment_type_id: number;
  from_address_id: string;
  to_address_id: string;
  return_address_id: string;
  client_order_code: string;
  cod_amount: number;
  cod_failed_amount: number;
  content: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  service_type_id: number;
  pick_station: string | null;
  pick_shift: number;
  insurance_value: number;
  cupon: string | null;
  pickup_time: string | null;
  note: string;
  required_note: string;
  status: string;
  message: string | null;
  payment_status: string;
  service_fee: number;
  created_at: string;
  updated_at: string;
}

//lấy danh sách đơn vận chuyển
export async function shipmentsList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<Shipment[]> {
  let url = `${getApiUrl("shipments")}?skip=${skip}&limit=${limit}`;
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
    "Không tìm thấy đơn vận chuyển."
  );
  return res;
}

//tạo đơn vận chuyển
export async function shipmentsCreate(
  token: string,
  payload: {
    order_id: string;
    provider_id: number;
    payment_type_id: number;
    from_address_id: string;
    to_address_id: string;
    return_address_id: string;
    client_order_code: string;
    cod_amount: number;
    cod_failed_amount: number;
    content: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    service_type_id: number;
    pick_station: string | null;
    pick_shift: number;
    insurance_value: number;
    cupon: string | null;
    pickup_time: string | null;
    note: string;
    required_note: string;
    status: string;
    message: string | null;
    payment_status: string;
    service_fee: number;
  }
): Promise<Shipment> {
  const url = getApiUrl("shipments");
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
    "Tạo đơn vận chuyển thất bại."
  );
}

//lấy chi tiết đơn vận chuyển
export async function shipmentDetail(
  token: string,
  id: string
): Promise<Shipment> {
  const url = getApiUrl(`shipments/${id}`);
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
    "Không tìm thấy đơn vận chuyển."
  );
}

//Chỉnh sửa đơn vận chuyển
export async function shipmentUpdate(
  token: string,
  id: string,
  payload: {
    order_id: string;
    provider_id: number;
    payment_type_id: number;
    from_address_id: string;
    to_address_id: string;
    return_address_id: string;
    client_order_code: string;
    cod_amount: number;
    cod_failed_amount: number;
    content: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    service_type_id: number;
    pick_station: string | null;
    pick_shift: number;
    insurance_value: number;
    cupon: string | null;
    pickup_time: string | null;
    note: string;
    required_note: string;
    status: string;
    message: string | null;
    payment_status: string;
    service_fee: number;
  }
): Promise<Shipment> {
  const url = getApiUrl(`shipments/${id}`);
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
    "Cập nhật đơn vận chuyển thất bại."
  );
}

export interface ShippingProvider {
  id: string;
  name: string;
  contact_number: string;
  website: string;
  created_at: string;
  updated_at: string;
}

//danh sách nhà vận chuyển
export async function shippingProvidersList(
  token: string
): Promise<ShippingProvider[]> {
  const url = getApiUrl("shipping_providers");
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
    "Không tìm thấy nhà vận chuyển."
  );
}

//chi tiết nhà vận chuyển
export async function shippingProvidersDetail(
  token: string,
  id: string
): Promise<ShippingProvider> {
  const url = getApiUrl(`shipping_providers/${id}`);
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
    "Không tìm thấy nhà vận chuyển."
  );
}

//tạo nhà cung cấp vận chuyển
export async function shippingProvidersCreate(
  token: string,
  payload: {
    name: string;
    contact_number: string;
    website: string;
  }
): Promise<ShippingProvider> {
  const url = getApiUrl("shipping_providers");
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
    "Tạo nhà vận chuyển thất bại."
  );
}

//chỉnh sửa nhà vận chuyển
export async function shippingProvidersUpdate(
  token: string,
  id: string,
  payload: {
    name: string;
    contact_number: string;
    website: string;
  }
): Promise<ShippingProvider> {
  const url = getApiUrl(`shipping_providers/${id}`);
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
    "Cập nhật nhà vận chuyển thất bại."
  );
}
