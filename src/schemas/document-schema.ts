import { z } from "zod";

export const documentSchema = z
  .object({
    documentName: z.string().min(1, "Campo obrigatório"),

    personType: z.enum(["pf", "pj"], {
      message: "Campo obrigatório",
    }),

    documentValue: z.string().min(1, "Campo obrigatório"),

    fullName: z.string().min(1, "Campo obrigatório"),

    cep: z.string().min(8, "Campo obrigatório"),

    street: z.string().min(1, "Campo obrigatório"),

    number: z.string().min(1, "Campo obrigatório"),

    city: z.string().min(1, "Campo obrigatório"),

    uf: z.string().min(2, "Campo obrigatório"),
  })
  .superRefine((data, ctx) => {
    const numbers = data.documentValue.replace(/\D/g, "");

    if (data.personType === "pf" && numbers.length !== 11) {
      ctx.addIssue({
        code: "custom",
        path: ["documentValue"],
        message: "CPF deve conter 11 números",
      });
    }

    if (data.personType === "pj" && numbers.length !== 14) {
      ctx.addIssue({
        code: "custom",
        path: ["documentValue"],
        message: "CNPJ deve conter 14 números",
      });
    }
  });

export type DocumentFormData = z.infer<typeof documentSchema>;
