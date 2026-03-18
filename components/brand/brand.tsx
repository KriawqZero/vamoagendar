import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type BrandLogoProps = Omit<ComponentProps<"span">, "children"> & {
  /** Alt text usado nos SVGs */
  alt?: string;
  /** Altura em px (largura ajusta automaticamente) */
  height?: number;
  /** Prioriza carregamento (acima da dobra) */
  priority?: boolean;
};

export function BrandLogo({
  alt = "VamoAgendar",
  height = 22,
  priority,
  className,
  ...props
}: BrandLogoProps) {
  // viewBox: 3005x973 -> proporção ~3.09
  const width = Math.round(height * 3.09);

  return (
    <span className={className} {...props}>
      <Image
        src="/logo-1-dark.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="block dark:hidden"
      />
      <Image
        src="/logo-1-white.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block"
      />
    </span>
  );
}

type BrandMarkProps = Omit<ComponentProps<"span">, "children"> & {
  alt?: string;
  size?: number;
  priority?: boolean;
};

export function BrandMark({
  alt = "VamoAgendar",
  size = 24,
  priority,
  className,
  ...props
}: BrandMarkProps) {
  return (
    <span className={className} {...props}>
      <Image
        src="/icon.svg"
        alt={alt}
        width={size}
        height={size}
        priority={priority}
      />
    </span>
  );
}

type BrandLinkProps = Omit<ComponentProps<typeof Link>, "children" | "href"> & {
  href?: ComponentProps<typeof Link>["href"];
  variant?: "logo" | "mark";
  logoHeight?: number;
  markSize?: number;
};

export function BrandLink({
  href = "/",
  variant = "logo",
  logoHeight = 22,
  markSize = 24,
  className,
  ...props
}: BrandLinkProps) {
  return (
    <Link href={href} className={className} {...props}>
      {variant === "mark" ? (
        <BrandMark size={markSize} priority />
      ) : (
        <BrandLogo height={logoHeight} priority />
      )}
    </Link>
  );
}
