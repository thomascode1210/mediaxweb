"use client";

import { Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ArrowOutward, StorefrontRounded } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { shopsList } from "../../lib/data/shops";

export default function Shops() {
  const [value, setValue] = React.useState("trial");
  const [shops, setShops] = useState<ShopCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShops() {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        
        const apiShops = await shopsList(token);
        const mappedShops: ShopCardProps[] = apiShops.map(shop => ({
          id: shop.shop_id,
          name: shop.name,
          domain: shop.slug ? `${shop.slug}.com` : `${shop.name.toLowerCase().replace(/\s+/g, '')}.com`,
        }));

        console.log("shops data:", mappedShops);
        setShops(mappedShops);
      } catch (err) {
        console.error("Error fetching shops:", err);
        setError("Không thể tải danh sách cửa hàng");
      } finally {
        setLoading(false);
      }
    }
    
    fetchShops();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="flex flex-col w-full">
      <p className="text-2xl font-bold mb-2">Quản lý cửa hàng</p>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Trả phí" value="paid" />
          <Tab label="Dùng thử" value="trial" />
        </TabList>

        <TabPanel value="paid">Chưa có</TabPanel>
        <TabPanel value="trial">
          {loading ? (
            <div>Đang tải...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shops.map((shop) => (
                <ShopCard key={shop.id} {...shop} />
              ))}
            </div>
          )}
        </TabPanel>
      </TabContext>
    </div>
  );
}

interface ShopCardProps {
  id: string;
  name: string;
  domain: string;
}

function ShopCard(
  props: ShopCardProps = {
    id: "shop-001",
    name: "Áo Dài Lụa Sen",
    domain: "aodailuasen.vn",
  }
) {
  const router = useRouter();
  return (
    <div className="rounded-2xl border border-[#dbdcdc] bg-white p-6 flex flex-col gap-2 w-full shadow-[0_2px_0_#D9D9D9]">
      <div className="p-2 bg-[#DEECFE] w-fit rounded-lg size-10 flex items-center justify-center">
        <StorefrontRounded className="text-[#338BFF]" />
      </div>
      <div className="flex flex-col gap-0">
        <span className="font-semibold">{props.name}</span>
        <span className="text-sm text-gray-500">{props.domain}</span>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <Link
          href="/tong-quan/quan-ly-chi-nhanh"
          className="text-[#338BFF] flex items-center font-medium"
        >
          <span>Quản lý chi nhánh</span>
          <ArrowOutward fontSize="medium" className="ml-3" />
        </Link>

        <button
          className="bg-[#338BFF] text-white rounded px-2.5 py-1"
          onClick={() => {
            router.push("/tong-quan/nang-cap");
          }}
        >
          Nâng cấp
        </button>
      </div>
    </div>
  );
}