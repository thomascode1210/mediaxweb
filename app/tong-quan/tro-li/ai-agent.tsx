"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";
import { AiAgentListResponse , aiAgentList ,  AiAgent } from "@/app/lib/data/ai-agent";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const pathname = usePathname();
  const { replace } = useRouter();
  const [showBanner, setShowBanner] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [assistantList, setAssistantList] = useState<AiAgent[]>([]);
  console.log("🚀 ~ Page ~ assistantList:", assistantList);
  const [loading, setLoading] = useState(true);

  const faqList = [
    {
      question: "Trợ lý AI hoạt động như thế nào trong hệ thống PosX?",
      answer:
        "Trợ lý kết nối với dữ liệu bán hàng, kho và khách hàng của bạn để tự động đưa ra quyết định, cảnh báo hoặc đề xuất thông qua telegram hoặc email – giống như một trợ lý giỏi theo thời gian thực.",
    },
    {
      question: "AI Agent có phù hợp với doanh nghiệp nhỏ không?",
      answer: "Có, AI Agent linh hoạt và dễ tích hợp cho mọi quy mô doanh nghiệp.",
    },
    {
      question: "Cách tích hợp AI vào hệ thống?",
      answer: "Chúng tôi cung cấp API và hướng dẫn tích hợp chi tiết cho đội ngũ kỹ thuật.",
    },
    {
      question: "AI Agent có miễn phí không?",
      answer: "Có bản dùng thử miễn phí. Sau đó, bạn có thể chọn gói phù hợp.",
    },
    {
      question: "Tôi có thể sử dụng nhiều AI Agent cùng lúc không?",
      answer: "Hoàn toàn có thể, hệ thống hỗ trợ nhiều AI Agent hoạt động song song.",
    },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const data: AiAgentListResponse = await aiAgentList();
        console.log("🚀 ~ loadData ~ data:", data);
        setAssistantList(data.agents);
      } catch (err: any) {
        console.log("🚀 ~ loadData ~ err:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {showBanner && (
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[96%] text-white text-center p-4 flex items-center justify-center gap-2 z-50 rounded-b-[12px]"
          style={{ background: "linear-gradient(90deg, #373E4C 0%, #22252D 100%)" }}
        >
          <span>Còn 7 ngày dùng thử miễn phí</span>
          <Link href="/tong-quan/nang-cap">
            <button className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded hover:bg-blue-600 transition">
              Nâng cấp
            </button>
          </Link>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-lg"
            onClick={() => setShowBanner(false)}
          >
            ×
          </button>
        </div>
      )}
      <div className={`w-full transition-all duration-300 ${showBanner ? 'mt-12' : 'mt-0'}`}>
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-2xl md:text-2xl font-semibold">Trợ lí A.I</h1>
        </div>

        <div className="bg-white mb-4 rounded-2xl border boder-[#DFDCE0] shadow-[0_2px_0_#D9D9D9]">
          <div className="rounded-2xl px-[5%] py-[40px] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left - Text */}
            <div className="md:w-1/3 text-left">
              <h2 className="font-semibold text-lg mb-2">Trợ lý ảo A.I là gì?</h2>
              <p className="text-sm leading-relaxed">
                Trợ lý AI là tập hợp các AI chuyên biệt trong hệ sinh thái PosX, hoạt động như những trợ lý quản lý chuyên nghiệp.
                <br />
                Từ quản lý kho, bán hàng, marketing đến lập kế hoạch – Trợ lý làm việc 24/7 không ngơi nghỉ.
              </p>
            </div>

            {/* Right - Images */}
            <div className="md:w-2/2 flex flex-col md:flex-row gap-4">
              <Image
                src="/ai-assistant-1.png"
                alt="AI Assistant 1"
                width={260}
                height={309}
                className="w-full h-[309px]"
              />
              <Image
                src="/ai-assistant-2.png"
                alt="AI Assistant 2"
                width={284}
                height={237}
                className="w-full h-[237px] "
              />
            </div>
          </div>
          <div className="rounded-2xl bg-[#F8F9FB] py-10 px-4">
            <div className="mx-auto">
              <h2 className="text-xl font-semibold mb-6">Danh sách trợ lý ảo</h2>

              {loading ? (
                <div>Đang tải...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {assistantList.map((assistant, index) => (
                    <div
                      key={assistant.id}
                      className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 flex flex-col gap-3 w-full"
                    >
                      <div className="flex gap-3 items-start">
                        <Image
                          src="/ai-avatar-default.png"
                          alt={assistant.name}
                          width={284}
                          height={237}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold">{assistant.name}</h3>
                          <p className="text-sm text-gray-500 leading-snug line-clamp-3">
                            {assistant.description}
                          </p>
                        </div>
                      </div>
                      <hr className="border-t border-gray-200" />
                      <div className="flex flex-col xl:flex-row justify-between text-sm items-start gap-1 sm:gap-0">
                        <span className="text-blue-600 font-semibold">
                          {assistant.price}đ<span className="text-gray-600 font-normal">/tháng</span>
                        </span>
                        <span className="text-gray-800 flex items-center gap-1">
                          ⭐ <span className="font-semibold">4.9</span>
                          <span className="text-gray-500">(70 tích hợp)</span>
                        </span>
                      </div>
                      <button 
                        onClick={() => replace(`/tong-quan/tro-li/${assistant.id}`)}
                        className="mt-1 bg-blue-500 hover:bg-blue-600 transition text-white font-medium text-sm py-2 rounded-lg"
                      >
                        Xem chi tiết ↗
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border boder-[#DFDCE0] shadow-[0_2px_0_#D9D9D9]">
          <h2 className="font-semibold mb-2">Câu hỏi thường gặp</h2>
          {faqList.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0">
                <button
                  onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
                  className="w-full text-left py-4 flex justify-between items-center font-medium text-sm"
                >
                  <span>{faq.question}</span>
                  <span className="text-lg">{index === activeIndex ? "−" : "+"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {index === activeIndex && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-gray-600 pb-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
