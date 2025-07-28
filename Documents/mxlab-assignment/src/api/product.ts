// src/api/products.ts
import axios from "axios";

export interface Product {
  id: string;
  title: string;
  companyName: string;
  content: string;
  phoneNumber: string;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  postingPeriodType: string;
  logoImage: { url: string; key: string };
  productImage: { url: string; key: string };
}

export interface ProductListItem {
  id: string;
  title: string;
  companyName: string;
  startDate: string | null;
  endDate: string | null;
  postingPeriodType: string;
  logoImageUrl: string;
  productImageUrl: string;
}

export interface ProductListResponse {
  items: ProductListItem[];
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

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`http://www.braincoach.kr/products/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data.data;
};

export const updateProduct = async (id: string, body: Partial<Product>) => {
  const response = await axios.patch(`/products/${id}`, body, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const createProduct = async (body: Product | Partial<Product>) => {
  const response = await axios.post("http://www.braincoach.kr/products", body, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
