import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createDocument } from "../../../services/createDocument";
import {
  formatCEP,
  formatCNPJ,
  formatCPF,
} from "../../../utils/document-formatter";
import {
  documentSchema,
  type DocumentFormData,
} from "../../../schemas/document-schema";
import { showToast } from "../../../components/ui/ShowToast";
import { getAddressByCep } from "../../../services/getAddressByCep";
import { useDocuments } from "../../../hooks/useDocuments";
import { Loader } from "../../../components/ui/Loader";

export const DocumentForm = () => {
  const { fetchDocuments } = useDocuments();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documentName: "",
      personType: "pf",
      documentValue: "",
      fullName: "",
      cep: "",
      street: "",
      number: "",
      city: "",
      uf: "",
    },
  });

  const personType = useWatch({
    control,
    name: "personType",
  });
  const cep = useWatch({
    control,
    name: "cep",
  });
  const inputClass = (field: keyof DocumentFormData) =>
    `rounded-xs border px-3 py-2 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-gray-400 focus:border-blue-500"
    }`;

  const onSubmit = async (data: DocumentFormData) => {
    const payload = {
      id: crypto.randomUUID(),
      title: data.documentName,
      person: {
        type: data.personType,
        document: data.documentValue,
        ...(data.personType === "pf"
          ? { name: data.fullName }
          : { corporateName: data.fullName }),
      },
      registryOffice: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        city: data.city,
        uf: data.uf,
      },
      created_at: new Date().toISOString(),
    };

    try {
      await createDocument(payload);
      showToast({
        message: "Documento criado com sucesso!",
        type: "success",
      });
      await fetchDocuments();
      reset();
    } catch {
      showToast({
        message: "Erro ao criar documento",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cep.replace(/\D/g, "");

      if (cleanCep.length !== 8) return;

      const response = await getAddressByCep(cleanCep);

      setValue("street", response.logradouro || "");
      setValue("city", response.localidade || "");
      setValue("uf", response.uf || "");
    };

    void fetchAddress();
  }, [cep, setValue]);

  return (
    <section className="flex  w-full flex-col rounded bg-[#ffffff] shadow-md lg:w-[60%]">
      {isSubmitting && <Loader fullscreen text="Processando..." />}
      <div className="flex items-center border-b-2 border-gray-200 p-4 px-6 ">
        <h2 className="text-2xl font-medium text-[#2e2d2c]">
          Adicionar documentos ao pedido
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-6 p-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="documentName" className="text-sm  text-gray-700">
              Nome do documento: <span className="text-red-500">*</span>
            </label>

            <input
              id="documentName"
              type="text"
              placeholder="Digite aqui"
              className={`${inputClass("documentName")} placeholder:text-gray-400 placeholder:font-light`}
              {...register("documentName")}
            />

            {errors.documentName && (
              <p className="text-sm text-red-500">
                {errors.documentName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-60">
            <label htmlFor="personType" className="text-sm  text-gray-700">
              Tipo de pessoa: <span className="text-red-500">*</span>
            </label>

            <select
              id="personType"
              className={inputClass("personType")}
              {...register("personType", {
                onChange: () => setValue("documentValue", ""),
              })}
            >
              <option value="pf">Pessoa Física</option>
              <option value="pj">Pessoa Jurídica</option>
            </select>

            {errors.personType && (
              <p className="text-sm text-red-500">
                {errors.personType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="documentValue" className="text-sm  text-gray-700">
              {personType === "pj" ? "CNPJ" : "CPF"}:{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              id="documentValue"
              type="text"
              placeholder="Digite aqui"
              maxLength={personType === "pj" ? 18 : 14}
              className={inputClass("documentValue")}
              {...register("documentValue", {
                onChange: (e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");

                  const limitedValue =
                    personType === "pj"
                      ? rawValue.slice(0, 14)
                      : rawValue.slice(0, 11);

                  const formattedValue =
                    personType === "pj"
                      ? formatCNPJ(limitedValue)
                      : formatCPF(limitedValue);

                  setValue("documentValue", formattedValue);
                },
              })}
            />

            {errors.documentValue && (
              <p className="text-sm text-red-500">
                {errors.documentValue.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm  text-gray-700">
              {personType === "pj" ? "Razão social" : "Nome completo"}:{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Digite aqui"
              className={inputClass("fullName")}
              {...register("fullName", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(
                    /[^a-zA-ZÀ-ÿ\s]/g,
                    "",
                  );
                },
              })}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>
        </div>

        <div className="pt-6">
          <h3 className="mb-4 text-lg font-semibold text-[#2e2d2c]">
            Dados do cartório
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-2 sm:w-50">
              {" "}
              <label htmlFor="cep" className="text-sm  text-gray-700">
                CEP: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Digite aqui"
                className={inputClass("cep")}
                {...register("cep", {
                  onChange: (e) => {
                    setValue("cep", formatCEP(e.target.value));
                  },
                })}
              />
              {errors.cep && (
                <p className="text-sm text-red-500">Campo obrigatório</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_180px]">
              <div className="flex flex-col gap-2">
                <label htmlFor="street" className="text-sm  text-gray-700">
                  Rua: <span className="text-red-500">*</span>
                </label>

                <input
                  placeholder="Digite aqui"
                  className={inputClass("street")}
                  {...register("street")}
                />

                {errors.street && (
                  <p className="text-sm text-red-500">Campo obrigatório</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="number" className="text-sm  text-gray-700">
                  Número: <span className="text-red-500">*</span>
                </label>

                <input
                  placeholder="Digite aqui"
                  className={inputClass("number")}
                  {...register("number")}
                />

                {errors.number && (
                  <p className="text-sm text-red-500">Campo obrigatório</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6  md:grid-cols-[3fr_180px]">
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm  text-gray-700">
                  Cidade: <span className="text-red-500">*</span>
                </label>

                <input
                  id="city"
                  type="text"
                  placeholder="Digite aqui"
                  className={inputClass("city")}
                  {...register("city", {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-ZÀ-ÿ\s]/g,
                        "",
                      );
                    },
                  })}
                />

                {errors.city && (
                  <p className="text-sm text-red-500">Campo obrigatório</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="uf" className="text-sm  text-gray-700">
                  UF: <span className="text-red-500">*</span>
                </label>

                <input
                  maxLength={2}
                  placeholder="Digite aqui"
                  className={inputClass("uf")}
                  {...register("uf", {
                    onChange: (e) => {
                      e.target.value = e.target.value
                        .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
                        .toUpperCase();
                    },
                  })}
                />

                {errors.uf && (
                  <p className="text-sm text-red-500">Campo obrigatório</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex sm:w-40 w-full cursor-pointer items-center justify-center rounded-full bg-[#3570b2]  py-1.5 text-white hover:bg-[#0770e7] disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="flex h-6 items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            "Criar documento"
          )}
        </button>
      </form>
    </section>
  );
};
