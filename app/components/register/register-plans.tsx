"use client";

import {
  ArrowBack,
  AutoAwesome,
  AutoAwesomeRounded,
  CheckCircle,
  CheckCircleOutline,
  Circle,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

export default function RegisterPlans() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen gap-4 bg-[#F2F2F7] p-6">
      <div className="bg-white w-full h-full rounded-3xl p-10 flex flex-col flex-1">
        <button
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowBack />
          Quay lại
        </button>

        <div className={cn("flex flex-1 flex-col w-full h-full items-center",
          isLoading ? "justify-evenly" : "justify-center"
        )}>
          <div className="w-full flex flex-col gap-4">
            <Icons.posX className="h-12 w-auto mx-auto" />
            <p className="text-2xl text-center">
              {isLoading
                ? "Đang xây dựng trang web thương mại điện tử của bạn"
                : "Lựa chọn xây dựng cửa hàng phù hợp nhất với bạn"}
            </p>
          </div>

          {isLoading && <div className="loader"></div>}

          <div
            className={cn(
              "mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 px-8 max-w-full md:max-w-[75vw] 3xl:max-w-[65vw] justify-self-center",
              isLoading && "hidden"
            )}
          >
            <div className="flex flex-col gap-4 p-6 border border-[#4F49502E] rounded-3xl items-center">
              <div className="flex flex-col gap-4 w-full justify-start">
                <div>
                  <p className="font-semibold text-[32px] leading-[38px]">
                    Free
                  </p>
                  <p className="text-base">Dành cho người dùng thử</p>
                </div>

                <div className="flex items-end">
                  <p className="text-5xl">0₫</p>
                  <p className="text-base text-[#3C3C43B2]">/tháng</p>
                </div>
              </div>

              <button
                className="rounded-lg border border-[#0058CC] text-[#0058CC] w-full py-4 px-5 font-medium"
                onClick={() => setIsLoading(!isLoading)}
              >
                Bắt đầu ngay
              </button>

              <div className="w-full flex-1 bg-[#F7F7F7] p-4 rounded-2xl">
                <p className="text-xl font-semibold">Quyền lợi</p>
                <ul className="mt-4 space-y-4 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>Quản lý bán hàng cơ bản</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>Website bán hàng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>1 tên miền miễn phí</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>Hỗ trợ cơ bản</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 border border-[#4F49502E] rounded-3xl items-center">
              <div className="flex flex-col gap-4 w-full justify-start">
                <div>
                  <p className="font-semibold text-[32px] leading-[38px]">
                    Pro
                  </p>
                  <p className="text-base">Dành cho người dùng thử</p>
                </div>

                <div className="flex items-end">
                  <p className="text-5xl">299,000₫</p>
                  <p className="text-base text-[#3C3C43B2]">/tháng</p>
                </div>
              </div>

              <button
                className="rounded-lg bg-gradient-to-r from-[#CCD5FF] to-[#B2E5FF] text-[#0058CC] w-full py-4 px-5 font-medium"
                onClick={() => setIsLoading(!isLoading)}
              >
                Dùng thử 7 ngày
              </button>

              <div className="w-full flex-1 bg-[#F7F7F7] p-4 rounded-2xl">
                <p className="text-xl font-semibold">Quyền lợi</p>
                <ul className="mt-4 space-y-4 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>Quản lý bán hàng cơ bản</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>Agent bán hàng + Agent kho</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>Quản lý tồn kho chi tiết</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>100GB lưu trữ dữ liệu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleOutline className="text-[#47a316] size-4" />
                    <span>24/7 support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative rounded-3xl p-[2px] bg-gradient-to-l from-[#A3DEFE] via-[#559EFF] to-[#58C5FF]">
              <div className="absolute flex items-center gap-2 top-0 right-0 rounded-tr-3xl rounded-bl-3xl text-sm py-2 px-4 bg-gradient-to-l from-[#9CDCFF] to-[#E9F1FC]">
                <AutoAwesomeRounded className="size-3" />
                <span>Ưu đãi tốt nhất</span>
              </div>
              <div className="flex flex-col gap-4 p-6 bg-white rounded-3xl items-center">
                <div className="flex flex-col gap-4 w-full justify-start">
                  <div>
                    <p className="font-semibold text-[32px] leading-[38px]">
                      Premium
                    </p>
                    <p className="text-base">Dành cho người dùng thử</p>
                  </div>

                  <div className="flex items-end">
                    <p className="text-5xl">799,000₫</p>
                    <p className="text-base text-[#3C3C43B2]">/tháng</p>
                  </div>
                </div>

                <button
                  className="rounded-lg bg-gradient-to-r from-[#CCD5FF] to-[#B2E5FF] text-[#0058CC] w-full py-4 px-5 font-medium"
                  onClick={() => setIsLoading(!isLoading)}
                >
                  Dùng thử 7 ngày
                </button>

                <div className="w-full flex-1 bg-[#F7F7F7] p-4 rounded-2xl">
                  <p className="text-xl font-semibold">Quyền lợi</p>
                  <ul className="mt-4 space-y-4 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Toàn bộ chức năng</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Tích hợp đầy đủ Agent</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Phân tích chiến lược, Marketing AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>Không giới hạn lưu trữ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleOutline className="text-[#47a316] size-4" />
                      <span>24/7 support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingProgress() {}
