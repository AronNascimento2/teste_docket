export const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer
      className="relative flex h-15 w-full items-center justify-center bg-cover bg-center bg-no-repeat text-center text-lg font-semibold text-white"
      style={{
        backgroundImage: "url('src/assets/bg-footer.png')",
      }}
    >
      <div className="flex items-center justify-center gap-1">
        <span>DOCKET</span>
        <span className="font-light">©</span>
        <span>2021-{date}</span>
      </div>
    </footer>
  );
};
