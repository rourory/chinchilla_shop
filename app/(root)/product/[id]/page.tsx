import { Container } from "@/shared/components/shared/atoms/Container";
import ProductImage from "@/shared/components/shared/atoms/ProductImage";
import Title from "@/shared/components/shared/atoms/Title";
import ProductVariationSwitcher from "@/shared/components/shared/molecules/ProductVariationSwitcher";
import { prisma } from "@/prisma/prisma-clent";
import { notFound } from "next/navigation";
import ProductFormContent from "@/shared/components/shared/organisms/ProductFormContent";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      category: { include: { products: true } },
      productVariation: true,
      extraOptions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10 min-h-[600px]">
      <ProductFormContent product={product} type="page"/>
    </Container>
  );
}
