import { doRequest, getApiUrl } from "../utils";

export interface AiAgent {
  id: string;
  name: string;
  description: string;
  price: string;
  duration_day: number;
  created_at: string;
  updated_at: string;
}

export interface AiAgentListResponse {
  agents: AiAgent[];
  total: number;
  page: number;
  limit: number;
}

export async function aiAgentList(search?: string): Promise<AiAgentListResponse> {
    let url = `${getApiUrl("agents")}`;
    console.log("🚀 ~ aiAgentList ~ url:", url);
    if (search) {
      url += `?search=${encodeURIComponent(search)}`;
    }

    const res = await doRequest(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
        "Không tìm thấy agent."
      );
      console.log("🚀 ~ aiAgentList ~ res:", res)
      return res;
  }

// Lấy chi tiết agent theo id (không cần token)
export async function aiAgentDetail(id: string): Promise<AiAgent> {
  const url = `${getApiUrl("agents")}/${id}`;
  const res = await doRequest(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
    `Không tìm thấy agent ID = ${id}`
  );
  console.log("🚀 ~ aiAgentList ~ res:", res)
  return res;
}