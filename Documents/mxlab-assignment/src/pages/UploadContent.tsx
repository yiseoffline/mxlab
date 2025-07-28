import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCalendarOutline } from "react-icons/io5";
import { createProduct } from "@/api/product";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const UploadContent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    title: string;
    companyName: string;
    phoneNumber: string;
    content: string;
    isActive: boolean;
    startDate: Date | null;
    endDate: Date | null;
    logoImageUrl: string;
    cardImageUrl: string;
    postingPeriodType: string;
  }>({
    title: "",
    companyName: "",
    phoneNumber: "",
    content: "",
    isActive: true,
    startDate: null,
    endDate: null,
    logoImageUrl: "",
    cardImageUrl: "",
    postingPeriodType: "",
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      [`${type}ImageUrl`]: url,
    }));
  };

  // 업로드
  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.content ||
      !form.phoneNumber ||
      !form.companyName
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const body = {
        title: form.title,
        content: form.content,
        phoneNumber: form.phoneNumber,
        logoImageKey: "logo-image-key",
        productImageKey: "product-image-key",
        isActive: form.isActive,
        startDate: form.startDate
          ? form.startDate.toISOString().split("T")[0]
          : null,
        endDate: form.endDate ? form.endDate.toISOString().split("T")[0] : null,
        postingPeriodType:
          form.startDate && form.endDate ? "LIMITED" : "PERMANENT",
        companyId: "047a29d0-1572-479a-8b38-041931715c26",
      };

      const res = await createProduct(body);
      alert("등록이 완료되었습니다.");
      navigate("/");
      console.log(res);
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2 className="text-purple-500 text-sm mb-2 ml-4">컨텐츠 관리</h2>
      <div className="flex items-center mb-10">
        <IoIosArrowBack
          onClick={() => navigate("/")}
          className="w-8 h-8 cursor-pointer"
        />
        <div className="text-3xl font-bold">컨텐츠 등록</div>
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">제목</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <Input
          placeholder="제목"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* 로고 이미지 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">로고 이미지</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <div className="flex justify-center">
          <div
            className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center relative cursor-pointer"
            onClick={() => logoInputRef.current?.click()}
          >
            {form.logoImageUrl ? (
              <img
                src={form.logoImageUrl}
                alt="logo"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <FaImage className="text-4xl text-white opacity-50" />
            )}
            <span className="absolute text-xs bg-purple-50 text-purple-500 border border-purple-500 px-2 py-0.5 rounded bottom-2">
              이미지 업로드
            </span>
            <input
              type="file"
              accept="image/*"
              ref={logoInputRef}
              onChange={(e) => handleImageUpload(e, "logo")}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* 업체명 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">업체명</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <Input
          placeholder="업체명"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
      </div>

      {/* 휴대폰번호 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">휴대폰번호</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <Input
          placeholder="휴대폰 번호"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />
      </div>

      {/* 카드 이미지 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">카드 이미지</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <div className="flex justify-center">
          <div
            className="w-32 h-32 rounded-md bg-gray-300 flex items-center justify-center relative cursor-pointer"
            onClick={() => cardInputRef.current?.click()}
          >
            {form.cardImageUrl ? (
              <img
                src={form.cardImageUrl}
                alt="card"
                className="rounded-md w-full h-full object-cover"
              />
            ) : (
              <FaImage className="text-4xl text-white opacity-50" />
            )}
            <span className="absolute text-xs bg-purple-50 text-purple-500 border border-purple-500 px-2 py-0.5 rounded bottom-2">
              이미지 업로드
            </span>
            <input
              type="file"
              accept="image/*"
              ref={cardInputRef}
              onChange={(e) => handleImageUpload(e, "card")}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* 내용 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">내용</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <Textarea
          rows={6}
          placeholder="상세글 내용"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </div>

      {/* 상태 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">상태</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>
        <Select
          value={form.isActive ? "활성" : "비활성"}
          onValueChange={(val) =>
            setForm({ ...form, isActive: val === "활성" })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="활성">활성</SelectItem>
            <SelectItem value="비활성">비활성</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 게시 기간 */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-1">
          <div className="font-semibold">게시기간</div>
          <div className="font-semibold text-purple-600">*</div>
        </div>

        {/* 상시게시 여부 체크박스 */}
        <div className="flex justify-end gap-2 mb-2">
          <Checkbox
            id="always"
            checked={form.postingPeriodType === "PERMANENT"}
            onCheckedChange={(checked) => {
              setForm((prev) => ({
                ...prev,
                postingPeriodType: checked ? "PERMANENT" : "FIXED_PERIOD",
                startDate: checked ? null : prev.startDate,
                endDate: checked ? null : prev.endDate,
              }));
            }}
          />
          <label htmlFor="always" className="text-sm font-medium leading-none">
            상시게시
          </label>
        </div>

        {/* 시작일 - 종료일 */}
        <div className="flex gap-2">
          {/* 시작일 */}
          <div className="flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={form.postingPeriodType === "PERMANENT"} // 비활성화
                >
                  <IoCalendarOutline className="mr-2 h-4 w-4" />
                  {form.startDate
                    ? form.startDate.toLocaleDateString("ko-KR")
                    : "시작일"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={(date) =>
                    setForm((prev) => ({ ...prev, startDate: date ?? null }))
                  }
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
                  disabled={form.postingPeriodType === "PERMANENT"} // 비활성화
                >
                  <IoCalendarOutline className="mr-2 h-4 w-4" />
                  {form.endDate
                    ? form.endDate.toLocaleDateString("ko-KR")
                    : "종료일"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={(date) =>
                    setForm((prev) => ({ ...prev, endDate: date ?? null }))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-2 rounded-md"
        >
          등록
        </Button>
      </div>
    </div>
  );
};

export default UploadContent;
