import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Link, Logo } from "../../components/common/navigation";
import { supabase } from "../../services/supabase";

export type AdminPage =
  | "overview"
  | "case-studies"
  | "team"
  | "leads"
  | "settings";

export default function AdminLayout({
  page,
  children,
}: {
  page: AdminPage;
  children: ReactNode;
}) {
  const navigate = useNavigate();

async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message);
    return;
  }

  navigate("/admin/login", { replace: true });
}
  const items: [AdminPage, string][] = [
    ["overview", "Overview"],
    ["case-studies", "Case Studies"],
    ["team", "Team"],
    ["leads", "Leads"],
    ["settings", "Settings"],
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Logo admin />

        <nav>
          {items.map(([p, label]) => (
            <Link
              to={p === "overview" ? "/admin" : `/admin/${p}`}
              className={page === p ? "active" : ""}
              key={p}
            >
              <span>{label.slice(0, 1)}</span>
              {label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="view-site">
          ← View public site
        </Link>

        <button
  type="button"
  className="logout"
  onClick={handleLogout}
>
  Log out
</button>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span>RUNBOPS / ADMIN</span>
            <h1>{items.find((item) => item[0] === page)?.[1]}</h1>
          </div>

          <div className="admin-actions">
            <button>
              <Icon name="search" />
            </button>

            <button>
              <Icon name="bell" />
            </button>

            <span>NO</span>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}