import { Suspense } from "react";
import PageContent from "@/app/tong-quan/tao-ma-giam-gia/toan-shop/coupon-all";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo mã giảm giá - POSX",
};

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
