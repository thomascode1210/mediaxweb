import React, { useEffect, useState, useRef  } from "react";
import Image from "next/image";
// import { Product } from "@/app/lib/definitions";
import { fetchProductsName } from "@/app/lib/data";
import { getApiUrl, debounce } from "@/app/lib/utils";
import NoData from "./NoData";
import { Product, productsList } from "../lib/data/products";

interface PopupProductListProps {
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  isFocused: boolean;
  onClose?: () => void;
}

const PopupProductList: React.FC<PopupProductListProps> = ({
  searchQuery,
  onSelectProduct,
  isFocused,
  onClose,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const debouncedFetch = useRef(
    debounce(async (query: string) => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      try {
        const  products  = await productsList(token || "", 0, 50, query);
        console.log(products)
        setProducts(products);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  useEffect(() => {
    if (isFocused) {
      debouncedFetch.current(searchQuery || "");
    } else {
      setProducts([]);
    }
  }, [searchQuery, isFocused]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) && onClose) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  console.log(products)

  return (
    <div 
      ref={popupRef}
      className="absolute top-full mt-2 ml-1 w-full max-h-[440px] bg-white border border-gray-300 rounded-lg overflow-y-auto z-20"
    >
      {loading && <div className="p-4 text-center">Đang tải dữ liệu...</div>}

      {!loading && products.length === 0 && (
        // <div className="p-4 text-center">Không có sản phẩm nào.</div>
        <NoData message="Không có sản phẩm nào" className="py-4" />
      )}

      {products
        .map((product) => {
          const imageSrc = "/customers/amy-burns.png";
            // product.images && product.images.length > 0
            //   ? getApiUrl(product.images[0].url.slice(1))
            //   : "/customers/amy-burns.png";

          return (
            <div
              key={product.product_id}
              className="flex justify-between items-center p-2 hover:bg-[#338BFF26] cursor-pointer border-b border-gray-200"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelectProduct(product)}
            >
              <div className="flex items-center">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="rounded mr-3 h-12 w-12 object-fill"
                  //unoptimized
                />
                <div>
                  <p className="text-[15px] font-semibold line-clamp-1 break-all">{product.name}</p>
                  <p className="text-[13px] text-gray-500">Mã: {product.product_id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-semibold">
                  {/* {product.retail_price.toLocaleString("en-ES")} */}
                  100000
                </p>
                <p className="text-[13px] text-gray-500">
                  Kho Thợ Nhuộm:{" "}
                  <span className="font-semibold text-black">
                    0
                    {/* {product.thonhuom_can_sell} */}
                  </span>{" "}
                  | Kho Terra:{" "}
                  <span className="font-semibold text-black">
                    0
                    {/* {product.terra_can_sell} */}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PopupProductList;
