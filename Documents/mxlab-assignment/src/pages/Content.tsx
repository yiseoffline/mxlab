import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoCalendarOutline } from "react-icons/io5";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "@/api/product";
import type { Product } from "@/api/product";
import { IoIosArrowBack } from "react-icons/io";

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState<boolean>(true);
  // 날짜 선택용 상태
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setIsActive(data.isActive);
        setStartDate(data.startDate ? new Date(data.startDate) : undefined);
        setEndDate(data.endDate ? new Date(data.endDate) : undefined);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!product) return;

    const payload = {
      title: product.title,
      content: product.content,
      phoneNumber: product.phoneNumber,
      logoImageKey: product.logoImage.key,
      productImageKey: product.productImage.key,
      isActive: isActive,
      startDate: startDate?.toISOString().split("T")[0] ?? null,
      endDate: endDate?.toISOString().split("T")[0] ?? null,
      postingPeriodType: product.postingPeriodType,
      companyId: "company-id",
    };

    try {
      await updateProduct(id!, payload);
      alert("수정 완료!");
      navigate("/");
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정에 실패했습니다.");
    }
  };

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (!product) return <div className="p-6">데이터가 없습니다.</div>;

  return (
    <div className="p-2 max-w-4xl mx-auto">
      <div className="text-sm text-purple-500 mb-1">컨텐츠 관리</div>
      <div className="flex items-center mb-10">
        <IoIosArrowBack
          onClick={() => navigate("/")}
          className="w-8 h-8 cursor-pointer"
        />
        <div className="text-3xl font-bold">컨텐츠 상세 관리</div>
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <label className="font-semibold">제목 *</label>
        <Input
          value={product.title}
          onChange={(e) =>
            setProduct((prev) => prev && { ...prev, title: e.target.value })
          }
          className="mt-1"
        />
      </div>

      {/* 로고 이미지 */}
      <div className="mb-6">
        <label className="font-semibold">로고 이미지</label>
        <div className="mt-2 flex justify-center">
          <img
            src={product.logoImage.url}
            alt="logo"
            className="w-24 h-24 rounded-full border object-contain"
          />
        </div>
      </div>

      {/* 업체명 */}
      <div className="mb-6">
        <label className="font-semibold">업체명 *</label>
        <Input
          value={product.companyName}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, companyName: e.target.value } : prev
            )
          }
          className="mt-1"
        />
      </div>

      {/* 휴대폰 번호 */}
      <div className="mb-6">
        <label className="font-semibold">휴대폰 번호 *</label>
        <Input
          value={product.phoneNumber}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, phoneNumber: e.target.value } : prev
            )
          }
          className="mt-1"
        />
      </div>

      {/* 카드 이미지 */}
      <div className="mb-6">
        <label className="font-semibold">카드 이미지</label>
        <div className="mt-2 flex justify-center">
          <img
            src={product.productImage.url}
            alt="card"
            className="w-24 h-24 border object-cover"
          />
        </div>
      </div>

      {/* 내용 */}
      <div className="mb-6">
        <label className="font-semibold">내용 *</label>
        <Textarea
          value={product.content.replace(/<[^>]+>/g, "")}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, content: e.target.value } : prev
            )
          }
          className="mt-1 h-40"
        />
      </div>

      {/* 상태 */}
      <div className="mb-6">
        <label className="font-semibold mb-1 block">상태 *</label>
        <Select
          value={isActive ? "활성" : "비활성"}
          onValueChange={(val) => {
            setIsActive(val === "활성");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="상태 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="활성">활성</SelectItem>
            <SelectItem value="비활성">비활성</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 게시기간 */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">게시기간</label>
        <div className="flex gap-4">
          {/* 시작일 */}
          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <IoCalendarOutline className="mr-2 h-4 w-4" />
                  {startDate
                    ? startDate.toLocaleDateString("ko-KR")
                    : "시작일 없음"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          <span className="self-center">~</span>

          {/* 종료일 */}
          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <IoCalendarOutline className="mr-2 h-4 w-4" />
                  {endDate
                    ? endDate.toLocaleDateString("ko-KR")
                    : "종료일 없음"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center space-x-4 mt-8">
        <button className="px-16 py-2 border rounded-md text-gray-700 cursor-pointer">
          삭제
        </button>
        <button
          onClick={handleSave}
          className="px-16 py-2 bg-purple-600 text-white rounded-md cursor-pointer"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default Content;
