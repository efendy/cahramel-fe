import Image from 'next/image';

export const enum LogoSize {
  sm = 24,
  md = 32,
  lg = 48,
}

export interface LogoProps {
  size?: LogoSize;
}

export default function Logo({size}: LogoProps) {
  if (!size) size = LogoSize.md;

  return <Image src="/caramel.png" alt="caHRamel" width={size} height={size} />;
}
