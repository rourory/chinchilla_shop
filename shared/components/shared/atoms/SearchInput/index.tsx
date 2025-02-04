/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/shared/lib/utils";
import { ApiClients } from "@/shared/services/api-clients";
import { ProductWithVariations } from "@/shared/services/products";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

type SearchBarProps = { className?: string };

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [backdropVisible, setBackdropVisible] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [products, setProducts] = React.useState<ProductWithVariations[]>([]);

  const headerRef = React.useRef(null);

  const handleVariationClick = React.useCallback(() => {
    setBackdropVisible(false);
    setSearchQuery("");
    setProducts([]);
  }, []);

  useClickAway(headerRef, () => {
    setBackdropVisible(false);
  });

  useDebounce(
    () => {
      ApiClients.products
        .searchWithVariations(searchQuery)
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    300,
    [searchQuery],
  );

  return (
    <div className="mx-10 flex-1">
      {backdropVisible && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30",
            className,
          )}
        />
      )}
      <div
        ref={headerRef}
        className={cn(
          "flex rounded-2xl justify-between relative flex-1 h-8 z-40",
          className,
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-secondary pl-11"
          type="text"
          placeholder="Find a product..."
          onFocus={() => setBackdropVisible(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-16 shadow-md transition-all duration-200 invisible opacity-0 z-30 max-h-[70vh] overflow-clip",
              backdropVisible && "visible opacity-100 top-10",
            )}
          >
            {products.map((product) =>
              product.productVariation.map((variation) => (
                <Link
                  key={`${product.id}.${variation.id}`}
                  className="flex items-center px-3 py-2 hover:bg-primary/10 cursor-pointer gap-4 mx-2 rounded-xl"
                  href={`/product/${product.id}`}
                  onClick={handleVariationClick}
                >
                  <img
                    className="h-8 w-8 rounded-xl object-cover"
                    src={variation.imageUrl}
                    alt={"photo"}
                  />
                  <span>{`${product.productName}. ${variation.variationDescription}`}</span>
                </Link>
              )),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
