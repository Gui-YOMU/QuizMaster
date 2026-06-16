import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export const adapter = new PrismaMariaDb(
  {
    connectionLimit: 5,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    password: process.env.DATABASE_PASSWORD as string,
    user: process.env.DATABASE_USER as string,
  }
)