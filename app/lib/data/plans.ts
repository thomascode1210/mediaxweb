import { doRequest, getApiUrl } from "../utils";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_day: number;
  created_at: string;
  updated_at: string;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
}

//danh sách gói dịch vụ
export async function plansList(token: string): Promise<Plan[]> {
  const url = getApiUrl("plan");
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
    "Không tìm thấy gói dịch vụ."
  );
}

//chi tiết gói dịch vụ
export async function planDetail(token: string, id: string): Promise<Plan> {
  const url = getApiUrl(`plans/${id}`);
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
    "Không tìm thấy gói dịch vụ."
  );
}

//tạo gói dịch vụ
export async function planCreate(
  token: string,
  payload: {
    name: string;
    description: string;
    price: number;
    duration_day: number;
  }
): Promise<Plan> {
  const url = getApiUrl("plans");
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
    "Tạo gói dịch vụ thất bại."
  );
}

//chỉnh sửa gói dịch vụ
export async function planUpdate(
  token: string,
  id: string,
  payload: {
    name: string;
    description: string;
    price: number;
    duration_day: number;
  }
): Promise<Plan> {
  const url = getApiUrl(`plans/${id}`);
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
    "Chỉnh sửa gói dịch vụ thất bại."
  );
}

//danh sách user mua dịch vụ
export async function userPlanList(token: string): Promise<UserPlan[]> {
  const url = getApiUrl("user_plan");
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
    "Không tìm thấy gói dịch vụ."
  );
}

//chi tiết user mua dịch vụ
export async function userPlanDetail(token: string, id: string) {
  const url = getApiUrl(`user_plan/${id}`);
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
    "Không tìm thấy gói dịch vụ."
  );
}

//tạo user mua dịch vụ
export async function userPlanCreate(token: string, payload: any) {
  const url = getApiUrl("user_plan");
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
    "Tạo gói dịch vụ thất bại."
  );
}

//chỉnh sửa user mua dịch vụ
export async function userPlanUpdate(token: string, id: string, payload: any) {
  const url = getApiUrl(`user_plan/${id}`);
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
    "Chỉnh sửa gói dịch vụ thất bại."
  );
}
