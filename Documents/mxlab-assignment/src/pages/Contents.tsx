import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

import { fetchProductList } from "@/api/product";
import type { ProductListItem } from "@/api/product";

const Contents = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ProductListItem[]>([]);
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
    <div>
      <div className="text-sm text-purple-500 mb-1">설정</div>
      <div className="font-bold text-2xl ">컨텐츠 관리</div>
      <div className="flex justify-end pb-2">
        <Button
          onClick={() => navigate("/contents/upload")}
          className="cursor-pointer bg-white border border-purple-500 text-purple-500 hover:bg-purple-50"
        >
          컨텐츠 등록
        </Button>
      </div>
      <Table className="rounded-2xl border text-center">
        <TableHeader className="bg-gray-100">
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
                <TableCell className="p-0">
                  <div className="flex items-center justify-center h-full w-full py-4">
                    <img
                      src={item.logoImageUrl}
                      alt="logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell>{item.companyName}</TableCell>
                <TableCell>010-1234-5678</TableCell>
                <TableCell className="p-0">
                  <div className="flex items-center justify-center h-full w-full py-4">
                    <img
                      src={item.productImageUrl}
                      alt="card"
                      className="w-14 h-14 object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="inline-flex items-center justify-between gap-1 px-2 py-1 rounded-md bg-muted text-sm text-black cursor-pointer">
                        {item.isActive ? "활성" : "비활성"}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        className={`${
                          !item.isActive
                            ? "bg-purple-200 text-purple-500 font-semibold"
                            : ""
                        }`}
                      >
                        비활성
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${
                          item.isActive
                            ? "bg-purple-200 text-purple-500 font-semibold"
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
                    : "-"}
                </TableCell>
                <TableCell className="p-0">
                  <div className="flex items-center justify-center h-full w-full py-4">
                    <FaArrowRight
                      onClick={() => navigate(`/contents/${item.id}`)}
                      className="cursor-pointer text-gray-600"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Contents;
