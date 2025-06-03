"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { aiAgentDetail, AiAgent } from "@/app/lib/data/ai-agent";
import Link from 'next/link';

const mockAgent = {
  name: "Agent Kho",
  avatar: "/ai-agent-avatar-default.png",
  rating: 5.0,
  reviews: 7062,
  online: true,
  skills: [
    "Phân tích tồn kho",
    "Xử lý nhập – xuất kho",
    "Tối ưu tồn kho",
    "Kiểm soát số số & phát hiện bất thường"
  ],
  description: `Sit hac pellentesque nam purus malesuada enim egestas nullam. Gravida tempus quis amet magna diam lacus. Mattis odio sagittis cursus condimentum commodo vulputate massa gravida vivamus. Est a tellus sollicitudin id. Sit nisi non cras dictum commodo sed massa potenti facilisis. Turpis diam ut in sit magna risus amet nullam. Facilisi molestie non imperdiet eget eu commodo lacus est magna. Nibh leo amet est nibh nullam sed. Volutpat nulla ac scelerisque vitae. Enim dapibus scelerisque eu elementum ante vitae nullam. Quam volutpat facilisis et diam diam egestas cursus pellentesque. In Proin id ut justo tincidunt nec dolor. Consequat est amet in mi in quis.\n\nSed sed elit ac ut elitero dictum cursus morbi. Pulvinar vivarra scelerisque adipiscing mi aliquam. Sed congue ipsum nisi nulla dui congue. Imperdiet in id dolor diam egestas. Commodo elit tellus consectetur tempor faucibus in. Amet eu mi consectetur non mattis massa tincidunt quis hac. Commodo laoreet faucibus lectus est. Ut urna hendrerit sed gravida. Enim vel molestie ullamcorper pellentesque. Ut faucibus pellentesque volutpat tellus. Elementum ac semper ultricies vitae a molestie. Tortor sit ultricies fames vestibulum sit dis euismod interdum ut. Tempus rutrum felis nulla ac.`,
  demoImage: "/demo-ai.png" 
};

export default function AgentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [agent, setAgent] = useState<typeof mockAgent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    setLoading(true);
    aiAgentDetail(params.id as string)
      .then((data) => {
        setAgent({
          ...mockAgent,
          // chỉ override các trường có từ API
          name: data.name || mockAgent.name,
          description: data.description || mockAgent.description,
        });
      })
      .catch(() => setAgent(mockAgent))
      .finally(() => setLoading(false));
  }, [params?.id]);

  const displayAgent = agent || mockAgent;

  return (
    <div className="min-h-screen bg-[#F6F7F9] py-6">
      <div className="mx-auto">
        {/* Nút quay lại */}
        <button
          className="mb-4 flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
          onClick={() => router.push('/tong-quan/tro-li')}
        >
          <span className="text-xl">←</span>
          <span>Trợ lý kho</span>
        </button>

        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#DFDCE0] shadow p-4 max-w-5xl mx-auto">
            {/* Phần trên: ảnh + text */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <Image
                  src={displayAgent.avatar}
                  alt={displayAgent.name}
                  width={2000}
                  height={2000}
                  className="w-full object-cover rounded-2xl border"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-semibold">{displayAgent.name}</span>
                    {displayAgent.online && (
                      <span className="ml-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Đang online</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-base">{displayAgent.rating}</span>
                    <span className="text-yellow-500 text-base">★★★★★</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600 text-base">{displayAgent.reviews.toLocaleString()} đánh giá</span>
                  </div>
                  <div className="font-semibold mb-1 mt-2">Kỹ năng</div>
                  <ul className="flex flex-col gap-2 mb-3">
                    {displayAgent.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 text-green-600 rounded-full">
                          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M4 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
           
                  <button className="w-fit mt-1 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">Tích hợp ngay</button>

                </div>
              </div>
            </div>
            {/* Phần dưới: mô tả + demo */}
            <div className="mt-8">
              <div className="font-semibold text-lg mb-2">Mô tả</div>
              <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed mb-8">
                {displayAgent.description}
              </div>
              <div className="font-semibold text-lg mb-2">Demo</div>
              <Image
                src={displayAgent.demoImage}
                alt="Demo"
                width={2000}
                height={2000}
                className="w-full rounded-xl object-cover border"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 