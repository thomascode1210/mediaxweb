import { doRequest, getApiUrl } from "../utils";

export interface Agent {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_day: number;
  created_at: string;
  updated_at: string;
}

export interface UserAgent {
  id: string;
  user_id: string;
  agent_id: string;
  start_date: string;
  end_date: string;
}

//danh sách agents
export async function agentsList(token: string): Promise<Agent[]> {
  const url = getApiUrl("agents");
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
    "Không tìm thấy danh sách agents."
  );
}

//chi tiết agent
export async function agentsDetail(token: string, id: string): Promise<Agent> {
  const url = getApiUrl(`agents/${id}`);
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
    "Không tìm thấy agent."
  );
}

//tạo agent
export async function agentsCreate(
  token: string,
  payload: {
    name: string;
    description: string;
    price: number;
    duration_day: number;
  }
): Promise<Agent> {
  const url = getApiUrl(`agents`);
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
    "Không thể tạo agent."
  );
}

//list user mua agent
export async function userAgentList(token: string): Promise<UserAgent[]> {
  const url = getApiUrl("user_agent");
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
    "Không tìm thấy danh sách user mua agent."
  );
}
