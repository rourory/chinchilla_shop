import ChooseProductModal from "@/shared/components/shared/organisms/ChooseProductModal";
import { prisma } from "@/prisma/prisma-clent";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
  params,
}: {
  params: { id: string };
}) {

  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
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
  return <ChooseProductModal product={product} />;
}
