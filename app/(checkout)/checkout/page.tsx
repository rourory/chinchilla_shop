import { prisma } from "@/prisma/prisma-clent";
import { Container } from "@/shared/components/shared/atoms/Container";
import Title from "@/shared/components/shared/atoms/Title";
import CheckoutForm from "@/shared/components/shared/organisms/CheckoutForm";
import { getUserSession } from "@/shared/lib/get-user-session";
//12 0:08:00
export default async function CheckoutPage() {
  const session = await getUserSession()
  let user = null;
  if (session) {
    user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    })
  }
  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />
      <CheckoutForm user={user}/>
    </Container>
  );
}
