export const lastNameRegex = new RegExp(
  /^[A-ZÀ-Ý]([A-ZÀ-Ý]|\'[A-ZÀ-Ý]+|\-[A-ZÀ-Ý]+|\ [A-ZÀ-Ý]+)*$/,
  "m",
);
export const firstNameRegex = new RegExp(
  /^[A-ZÀ-Ý]([a-zà-ÿ]|\-[A-ZÀ-Ý][a-zà-ÿ]+|\ [A-ZÀ-Ý][a-zà-ÿ]+)*$/,
  "m",
);
export const mailRegex = new RegExp(
  /^([a-z0-9_])(([a-z0-9_\-]*)|(\.(?!\.)))*@([a-z0-9])(([a-z0-9])|(\-[a-z0-9]+)|(\.(?!\.)[a-z0-9]+))*(\.([a-z0-9])(([a-z0-9])|(\-[a-z0-9]+))*)+$/,
  "m",
);
export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{12,}$/,
);