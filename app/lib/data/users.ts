
import { doRequest, getApiUrl } from "../utils";

export interface User {
  user_id: string;
  user_name: string;
  email: string;
  role: number;
  work_shift: string;
}


//lấy danh sách nhân viên
export async function userList(
  token: string,
  skip: number,
  limit: number,
  search?: string
): Promise<User[]> {
  let url = `${getApiUrl("users")}?skip=${skip}&limit=${limit}`;
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
    "Không tìm thấy nhân viên."
  );
  return res;
}

//tạo nhân viên
export async function userCreate(
  token: string,
  payload: any
  // payload: {
  //   username: string;
  //   plan_id: string;
  //   agent_id: string;
  //   password: string;
  //   role: number;
  //   email: string;
  //   address_id: string;
  //   work_shift: string;
  //   phone_number: string;
  // }
): Promise<User> {
  const url = getApiUrl("users");
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
    "Tạo nhân viên thất bại."
  );
}

//cập nhật nhân viên
export async function userUpdate(
  token: string,
  id: string,
  payload: any
  // payload: {
  //   // username: string;
  //   plan_id: string;
  //   agent_id: string;
  //   password: string;
  //   role: number;
  //   email: string;
  //   address_id: string;
  //   work_shift: string;
  //   phone_number: string;
  // }
): Promise<User> {
  const url = getApiUrl(`users/${id}`);
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
    "Cập nhật nhân viên thất bại."
  );
}

//lấy chi tiết nhân viên
export async function userDetail(token: string, id: string): Promise<User> {
  const url = getApiUrl(`users/${id}`);
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
    `Không tìm thấy nhân viên ID = ${id}`
  );
}

//deactivate nhân viên
export async function userDeactivate(
  token: string,
  id: string
): Promise<User> {
  const url = getApiUrl(`users/deactivate/${id}`);
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
    `Deactivate nhân viên ID = ${id} thất bại.`
  );
}

//xóa nhân viên
export async function userDelete(token: string, id: string){
  const url = getApiUrl(`users/${id}`);
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
    `Xóa nhân viên thất bại.`
  );
}

//đăng nhập/xác thực
export async function signIn(
  // token: string,
  payload: {
    email: string;
    password: string;
  }
) {
  const url = getApiUrl("users/login");
  return await doRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
    "Đăng nhập thất bại."
  );
}

//đăng xuất
export async function signOut(token: string) {
  const url = getApiUrl("users/logout");
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
    "Đăng xuất thất bại."
  );
}

//thay đổi mật khẩu tài khoản
export async function changePassword(
  token: string,
  payload: {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  }
) {
  const url = getApiUrl("users/change_password");
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
    "Thay đổi mật khẩu thất bại."
  );
}
