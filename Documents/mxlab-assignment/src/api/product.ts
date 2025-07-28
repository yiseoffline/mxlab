// src/api/products.ts
import axios from "axios";

export interface Product {
  id: string;
  title: string;
  companyName: string;
  content: string;
  startDate: string | null;
  endDate: string | null;
  postingPeriodType: string;
  logoImageUrl: string;
  productImageUrl: string;
}

export interface ProductListResponse {
  items: Product[];
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDc3MzQ2Zi1hYzc5LTQxZTItOTdiOC01ZTkwZjBiYTRjYmUiLCJ1c2VySWQiOiJTZW95ZW9uTCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MzYyNjU0NSwiZXhwIjoxNzUzNjg3NzQ1fQ.xX681kYhYFU_K3G0vxi5iHS9mJpbs-U4RrZoeVZCVUg";

export const fetchProductList = async (
  page: number = 1,
  limit: number = 10
): Promise<ProductListResponse> => {
  const response = await axios.get("http://www.braincoach.kr/products", {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data.data;
};
