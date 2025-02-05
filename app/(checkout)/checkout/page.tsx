import { Container } from "@/shared/components/shared/atoms/Container";
import Title from "@/shared/components/shared/atoms/Title";
import CheckoutForm from "@/shared/components/shared/organisms/CheckoutForm";

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />
      <CheckoutForm />
    </Container>
  );
}
