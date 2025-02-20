import { prisma } from "./prisma-clent";
import products from "./mock-constants/products";
import extraOptions from "./mock-constants/extraOptions";
import categories from "./mock-constants/categories";
import { hashSync } from "bcrypt";
import productVariations from "./mock-constants/productVariation";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User One",
        email: "userOne@yandex.com",
        password: hashSync("12345", 10),
        role: "USER",
        verified: new Date(),
        phone: "+375445552233",
      },
      {
        fullName: "User Two",
        email: "userTwo@yandex.com",
        password: hashSync("12345", 10),
        role: "USER",
        verified: new Date(),
        phone: "+375445552233",
      },
      {
        fullName: "Admin",
        email: "admin@yandex.com",
        password: hashSync("54321", 10),
        role: "ADMIN",
        verified: new Date(),
        phone: "+375445552233",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.extraOption.createMany({
    data: extraOptions,
  });

  await prisma.product.create({
    data: {
      categoryId: 1,
      productName: "Nike Air Max 90",
      extraOptions: {
        connect: extraOptions.slice(0, 2),
      },
    },
  });
  await prisma.product.create({
    data: {
      categoryId: 1,
      productName: "Nike Air Max 270",
      extraOptions: {
        connect: extraOptions.slice(1, 3),
      },
    },
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.productVariation.createMany({
    data: productVariations,
  });

  await prisma.cart.createMany({
    data: [
      { userId: 1, token: "token1" },
      { userId: 2, token: "token2" },
      { userId: 3, token: "token3" },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      quantity: 1,
      cartId: 1,
      extraOptions: {
        connect: extraOptions.slice(0, 2),
      },
    },
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 2,
      quantity: 2,
      cartId: 1,
      extraOptions: {
        connect: extraOptions.slice(4, 6),
      },
    },
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 3,
      quantity: 1,
      cartId: 1,
      extraOptions: {
        connect: extraOptions.slice(2, 4),
      },
    },
  });

  await prisma.cartItem.createMany({
    data: [
      { productItemId: 4, quantity: 1, cartId: 2 },
      { productItemId: 5, quantity: 2, cartId: 2 },
      { productItemId: 6, quantity: 1, cartId: 2 },
      { productItemId: 7, quantity: 1, cartId: 3 },
      { productItemId: 8, quantity: 1, cartId: 3 },
      { productItemId: 9, quantity: 3, cartId: 3 },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ExtraOption" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "_ExtraOptionToProduct" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "_CartItemToExtraOption" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
