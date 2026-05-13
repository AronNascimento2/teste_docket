interface RequiredFieldProps {
  error?: boolean;
}

export const RequiredField = ({ error }: RequiredFieldProps) => {
  if (!error) return null;

  return <span className="text-sm text-red-500">Campo obrigatório</span>;
};
