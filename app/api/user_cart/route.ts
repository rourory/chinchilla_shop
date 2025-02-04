import { NextRequest, NextResponse } from "next/server";
import { console } from "inspector";
import {
  createCartIfNotExist,
  updateOrCreateCartItem,
  findCartByToken,
} from "./queries";

export interface CartItemCreateDTO {
  productVariationId: number;
  extraOptionIds: number[];
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as CartItemCreateDTO;

    if (!token) {
      token = crypto.randomUUID();
    }
    let cart = await createCartIfNotExist(token);

    await updateOrCreateCartItem(cart.id, data);

    cart = await createCartIfNotExist(cart.token);

    const response = NextResponse.json(cart);
    response.cookies.set("cartToken", cart.token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `Something went wrong (${error})` });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;
    if (!token) return NextResponse.json({ error: "Cart token not found" });

    const cart = await findCartByToken(token);
    if (!cart) return NextResponse.json({ error: "Cart not found" });

    const response = NextResponse.json(cart);
    response.cookies.set("cartToken", cart.token);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `Something went wrong (${error})` });
  }
}
