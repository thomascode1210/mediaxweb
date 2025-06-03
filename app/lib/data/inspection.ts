import { doRequest, getApiUrl } from "../utils";

export interface Inspection {
  id: string;
  goods_receipt_id: string;
  user_id: string;
  warehouse_id: string;
  status: string;
  note: string;
}

export async function inspectionReportsList(
  token: string,
  skip: number,
  limit: number,
  query: string
): Promise<Inspection[]> {
  const url = getApiUrl(
    `inspection_reports?skip=${skip}&limit=${limit}&query=${query}`
  );
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
    "Không tìm thấy phiếu kiểm"
  );
}

export async function inspectionReportsDetail(
  token: string,
  id: string
): Promise<Inspection> {
  const url = getApiUrl(`inspection_reports/${id}`);
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
    "Không tìm thấy phiếu kiểm ID = " + id
  );
}

export async function inspectionReportsUpdate(
  token: string,
  id: string,
  payload: any
): Promise<Inspection> {
  const url = getApiUrl(`inspection_reports/${id}`);
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
    "Không tìm thấy phiếu kiểm ID = " + id
  );
}

export async function inspectionReportsCreate(
  token: string,
  payload: any
): Promise<Inspection> {
  const url = getApiUrl(`inspection_reports`);
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
    "Tạo phiếu kiểm thất bại."
  );
}

export async function inspectionReportsCancel(
  token: string,
  id: string
): Promise<Inspection> {
  const url = getApiUrl(`inspection_reports/${id}`);
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
    "Hủy phiếu kiểm thất bại."
  );
}
