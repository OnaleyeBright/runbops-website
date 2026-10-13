import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export type IconName =
  | "arrow"
  | "menu"
  | "close"
  | "check"
  | "crm"
  | "erp"
  | "ai"
  | "growth"
  | "search"
  | "bell"
  | "plus"
  | "upload";

export function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    crm: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="10" r="3" />
        <path d="M3 19c.5-4 8.5-4 9 0M12 18c1-3 7-2.5 8 1" />
      </>
    ),
    erp: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="9" y="14" width="6" height="6" rx="1" />
        <path d="M7 10v2h10v-2M12 12v2" />
      </>
    ),
    ai: (
      <>
        <path d="M9 3h6l1 4 4 2v6l-4 2-1 4H9l-1-4-4-2V9l4-2 1-4Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    growth: (
      <>
        <path d="M4 18V9M10 18V5M16 18v-7M3 18h18" />
        <path d="m14 5 3-3 3 3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m0 0L7 9m5-5 5 5M4 16v4h16v-4" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Link({
  to,
  children,
  className = "",
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <RouterLink
      to={to}
      className={className}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      {...props}
    >
      {children}
    </RouterLink>
  );
}

export function Button({
  to,
  children,
  variant = "dark",
  type = "button",
  onClick,
  disabled = false,
}: {
  to?: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "yellow";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const content = (
    <>
      {children}
      <span className="button-arrow">
        <Icon name="arrow" size={17} />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`button button-${variant}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
export function Logo({ admin = false }: { admin?: boolean }) {
  return (
    <Link
      to={admin ? "/admin" : "/"}
      className="logo"
      aria-label="Runbops home"
    >
      <span className="logo-mark">
        <span />
        <span />
        <span />
      </span>

      <strong>runbops</strong>
      {admin && <small>admin</small>}
    </Link>
  );
}