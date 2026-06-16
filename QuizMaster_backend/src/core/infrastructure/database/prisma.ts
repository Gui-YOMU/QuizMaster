import { PrismaClient } from "../generated/prisma/client.js";
import { adapter } from "./adapter.js";
import { checkRegexExtension } from "./extensions/checkRegexExtension.js";

export const prisma = new PrismaClient({ adapter });

export const prismaExtended = prisma
  .$extends(checkRegexExtension);
