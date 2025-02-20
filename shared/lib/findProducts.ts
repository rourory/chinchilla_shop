import { prisma } from "@/prisma/prisma-clent";
import { Category, Product, ProductVariation } from "@prisma/client";
import { WithExtraOptions } from "../components/shared/organisms/ChooseProductModal";

interface PayResultDetails {
  payResult?: string;
  orderId?: string;
}

export interface SearchParams extends PayResultDetails {
  query?: string;
  sortBy?: string;
  extraOptions?: string;
  priceFrom?: string;
  priceTo?: string;
}

export type CategoriesWithProductsAndVariationsAndExtraOptions =
  Array<CategoryWithProductsAndVariationsAndExtraOptions>;

type CategoryWithProductsAndVariationsAndExtraOptions = Category &
  WithProductsAndVariationsAndExtraOptions;

type WithProductsAndVariationsAndExtraOptions = {
  products: ProductsWithVariationsAndExtraOptions;
};

export type ProductsWithVariationsAndExtraOptions = Array<
  Product & WithProductVariations & WithExtraOptions
>;

type WithProductVariations = {
  productVariation: ProductVariation[];
};

export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 30000;

export const findProducts = async (
  params: SearchParams,
): Promise<CategoriesWithProductsAndVariationsAndExtraOptions> => {
  const extraOptionIds = params.extraOptions?.split(",").map(Number);
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          extraOptions: extraOptionIds
            ? { some: { id: { in: extraOptionIds } } }
            : undefined,
          productVariation: {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        orderBy: {
          id: "asc",
        },
        include: {
          productVariation: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
          extraOptions: true,
        },
      },
    },
  });

  return categories;
};
