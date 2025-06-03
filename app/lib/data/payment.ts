import { doRequest, getApiUrl } from "../utils";
import { Payment } from "../definitions";

export async function createPayment(
    token: string,
    payload: Omit<Payment, "payment_id" | "created_at" | "updated_at">
): Promise<Payment> {
    const url = getApiUrl("payments");
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
        "Tạo phiếu thanh toán thất bại."
    );
}