export type Document = {
  id: string;
  title: string;

  person: {
    type: "pf" | "pj";
    name?: string;
    corporateName?: string;
    document: string;
  };

  registryOffice: {
    cep: string;
    street: string;
    number: string;
    city: string;
    uf: string;
  };

  created_at: string;
};
