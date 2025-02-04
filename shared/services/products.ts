import { Product, ProductVariation } from "@prisma/client";
import { axiosInstance } from "./fetcher-instance";
import { ApiRoutes } from "./api-routes";

export type ProductWithVariations = Product & {
  productVariation: ProductVariation[];
};

export const searchWithVariations = async (
  query: string,
): Promise<ProductWithVariations[]> => {
  const { data } = await axiosInstance.get<ProductWithVariations[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    },
  );
  return data;
};
