import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type Common = { variant?: "fill" | "outline"; children: ReactNode; className?: string };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export default function Button(props: AsLink | AsButton) {
  const { variant = "fill", children, className = "" } = props;
  const cls = `${styles.btn} ${variant === "fill" ? styles.fill : styles.outline} ${className}`;

  if (props.href !== undefined) {
    const { href, variant: _v, children: _c, className: _cn, ...rest } = props as AsLink;
    return (
      <Link href={href} className={cls} {...rest}>
        <span>{children}</span>
      </Link>
    );
  }
  const { variant: _v, children: _c, className: _cn, ...rest } = props as AsButton;
  return (
    <button className={cls} {...rest}>
      <span>{children}</span>
    </button>
  );
}
