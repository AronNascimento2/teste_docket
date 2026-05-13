export type PersonType = "pf" | "pj" | "";

export interface FormType {
  documentName: string;
  personType: PersonType;
  documentValue: string;
  fullName: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  uf: string;
}
