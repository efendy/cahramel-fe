import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/caramel.png"
      alt="caHRamel"
      width={32}
      height={32}
    />
  );
};

export const LogoMedium = () => {
  return (
    <Image
      className="mx-auto"
      src="/caramel.png"
      alt="caHRamel"
      height={48}
      width={48}
    />
  );
};
