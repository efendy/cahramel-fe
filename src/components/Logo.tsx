import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/caramel.png"
      alt="caHRamel"
      width={32}
      height={32}
    />
  );
}

export function LogoMedium() {
  return (
    <Image
      className="mx-auto"
      src="/caramel.png"
      alt="caHRamel"
      height={48}
      width={48}
    />
  );
}