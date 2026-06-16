import escape from "escape-html";
import { Prisma } from "../../generated/prisma/client.js";
import {
  firstNameRegex,
  lastNameRegex,
  mailRegex,
  passwordRegex,
} from "../../../../presentation/middlewares/regex.js";
import { AppError } from "../../../domain/errors/AppError.js";

function checkRegex(arg: string, regex: RegExp, field: string): string {
  if (!regex[Symbol.match](arg)) {
    throw new AppError({statusCode: 403, message: `Le format du ${field} n'est pas valide'.`});
  }
  return arg;
}

export const checkRegexExtension = Prisma.defineExtension({
  name: "checkRegex",
  query: {
    user: {
      create: ({ args, query }) => {
        checkRegex(escape(args.data.lastName), lastNameRegex, "nom de famille");
        checkRegex(escape(args.data.firstName), firstNameRegex, "prénom");
        checkRegex(escape(args.data.mail), mailRegex, "mail");
        checkRegex(args.data.password, passwordRegex, "mot de passe");
        return query(args);
      },
      update: ({ args, query }) => {
        if (args.data.lastName) checkRegex(escape(args.data.lastName as string), lastNameRegex, "nom de famille");
        if (args.data.firstName) checkRegex(escape(args.data.firstName as string), firstNameRegex, "prénom");
        return query(args);
      }
    },
  },
});
