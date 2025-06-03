import { doRequest, getApiUrl } from "../utils";

export interface ProductImage {
  id: string;
  product_id: string;
  is_default: boolean;
  url: string;
}

export async function productImagesList(
  token: string
): Promise<ProductImage[]> {
  const url = getApiUrl(`product_images`);
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
    "Không tìm thấy hình ảnh sản phẩm"
  );
}
