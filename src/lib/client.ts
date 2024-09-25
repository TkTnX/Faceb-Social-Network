import { PrismaClient } from "@prisma/client";

// Используем глобальную переменную, чтобы избежать пересоздания клиента в development mode
let prisma: PrismaClient;

// @ts-ignore
if (typeof globalThis.prisma === "undefined") {
  prisma = new PrismaClient();

  if (process.env.NODE_ENV !== "production") {
    // В режиме разработки присваиваем клиент к глобальной переменной
    // @ts-ignore

    globalThis.prisma = prisma;
  }
} else {
  // В режиме разработки повторно используем уже созданный клиент
  // @ts-ignore

  prisma = globalThis.prisma;
}

export { prisma };
