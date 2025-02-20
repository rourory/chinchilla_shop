import { Container } from "@/shared/components/shared/atoms/Container";
import Filters from "@/shared/components/shared/organisms/Filters";
import ProductsGroupList from "@/shared/components/shared/organisms/ProductsGroupList";
import Title from "@/shared/components/shared/atoms/Title";
import TopBar from "@/shared/components/shared/organisms/TopBar";
import { Suspense } from "react";
import { findProducts, SearchParams } from "@/shared/lib/findProducts";
import PayConfirmator from "@/shared/components/shared/atoms/PayConfirmator";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const categories = await findProducts(searchParams);
  return (
    <>
      <PayConfirmator searchParams={searchParams} />
      <Container className="mt-10">
        <Title text="Our products" size="lg" className="font-medium" />
      </Container>
      <TopBar
        categories={categories.filter((cat) => cat.products.length > 0)}
      />
      <Container className="pb-14 mt-10 px-20 max-w-[1440px]">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Suspense fallback={<div>Loading...</div>}>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.categoryName}
                      items={category.products}
                      categoryId={category.id}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
