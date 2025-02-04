/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/lib/utils";

interface Props {
  src: string;
  className?: string;
}

const CartItemImage: React.FC<Props> = ({ src, className }) => {
  return (
    <img
      className={cn("w-[60px] h-[60px] rounded-sm mt-1", className)}
      src={src}
    />
  );
};

export default CartItemImage;
