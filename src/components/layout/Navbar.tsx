import { useEffect, useState } from "react";
import { Icon, Link, Logo } from "../common/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 20);

    update();
    window.addEventListener("scroll", update);

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`navbar ${solid ? "solid" : ""}`}>
      <div className="nav-inner">
        <Logo />

        <nav className={open ? "nav-links open" : "nav-links"}>
          {["About", "Services", "Case Studies", "Team", "Contact"].map(
            (item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="nav-link"
              >
                {item}
                {item === "Services" && (
                  <span className="chevron">⌄</span>
                )}
              </Link>
            )
          )}

          <a
  href="https://cal.com/d/gk7w6zxCtSDMwuaoQ8mD1B/system-setup-discovery-meeting-session"
  target="_blank"
  rel="noopener noreferrer"
  className="button button-dark"
>
  Book a consultation
  <span className="button-arrow">
    <Icon name="arrow" size={17} />
  </span>
</a>
        </nav>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}