export const Header = () => {
  return (
    <header
      className="relative min-h-16 w-full bg-cover"
      style={{
        backgroundImage: "url('src/assets/bg-header.png')",
        backgroundPosition: "97% center",
      }}
    >
      <img
        src="src/assets/logo.png"
        alt="Docket Logo"
        className="absolute -bottom-2 left-4.5 h-20 w-20"
      />
    </header>
  );
};
