import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaArrowRight } from "react-icons/fa";

import { fetchProductList } from "@/api/product";
import type { Product } from "@/api/product";

const ContentsManagement = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductList(1, 10);
        setItems(data.items);
      } catch (err) {
        console.error("데이터 로드 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="text-sm text-purple-500 mb-1">설정</div>
      <div className="font-bold text-2xl mb-6">컨텐츠 관리</div>

      <Table className="rounded-2xl border text-center">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-center">번호</TableHead>
            <TableHead className="text-center">로고 이미지</TableHead>
            <TableHead className="text-center">업체명</TableHead>
            <TableHead className="text-center">휴대폰번호</TableHead>
            <TableHead className="text-center">카드 이미지</TableHead>
            <TableHead className="text-center">제목</TableHead>
            <TableHead className="text-center">상태</TableHead>
            <TableHead className="text-center">게시기간</TableHead>
            <TableHead className="text-center">상세 관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                로딩 중...
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                컨텐츠가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{items.length - index}</TableCell>
                <TableCell>
                  <img
                    src={item.logoImageUrl}
                    alt="logo"
                    className="w-10 h-10 object-contain"
                  />
                </TableCell>
                <TableCell>{item.companyName}</TableCell>
                <TableCell>010-1234-5678</TableCell>
                <TableCell>
                  <img
                    src={item.productImageUrl}
                    alt="card"
                    className="w-14 h-14 object-cover"
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="inline-flex items-center justify-between gap-1 px-2 py-1 rounded-md bg-muted text-sm text-black cursor-pointer">
                        {item.postingPeriodType}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        className={`${
                          item.postingPeriodType === "비활성"
                            ? "text-purple-500 font-semibold"
                            : ""
                        }`}
                      >
                        비활성
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${
                          item.postingPeriodType === "PERMANENT"
                            ? "text-purple-500 bg-purple-100font-semibold"
                            : ""
                        }`}
                      >
                        활성
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  {item.startDate && item.endDate
                    ? `${item.startDate} ~ ${item.endDate}`
                    : "상시"}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <FaArrowRight className="cursor-pointer" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentsManagement;
