import { Component, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  House,
  List,
  Plus,
  UserRound,
} from "lucide-react";
import { Logo, PageSkeleton, useDelayedFlag } from "./primitives";
import { initials } from "./format";
import { prefetchByPath } from "./pages";
import { fetchUserUtils } from "../utils/auth";

const LINKS = [
  { to: "/", label: "Dashboard", icon: House, end: true },
  { to: "/AddTransaction", label: "Add Transaction", icon: Plus },
  { to: "/Transactions", label: "Transactions", icon: List },
  { to: "/Overview", label: "Overview", icon: CalendarDays },
  { to: "/Analytics", label: "Analytics", icon: Clock3 },
  { to: "/Profile", label: "Profile", icon: UserRound },
];

const TABS = LINKS.filter((link) => link.to !== "/Overview");

export function prefetch(path) {
  prefetchByPath[path]?.();
}

function NavItem({ item }) {
  const Icon = item.icon;
  return (
    <li>
      <NavLink
        to={item.to}
        end={item.end}
        title={item.label}
        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        onMouseEnter={() => prefetch(item.to)}
        onFocus={() => prefetch(item.to)}
      >
        <Icon strokeWidth={2} />
        <span className="nav-label">{item.label}</span>
      </NavLink>
    </li>
  );
}

export function Shell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = location.pathname === "/Login" || location.pathname === "/SignUp";
  const [user, setUser] = useState(null);
  const [more, setMore] = useState(false);
  const [offline, setOffline] = useState(typeof navigator !== "undefined" ? !navigator.onLine : false);

  useEffect(() => {
    const titles = {
      "/": "Dashboard",
      "/AddTransaction": "Add transaction",
      "/Transactions": "Transactions",
      "/Overview": "Overview",
      "/Analytics": "Analytics",
      "/Profile": "Profile",
      "/Login": "Log in",
      "/SignUp": "Sign up",
    };
    const name = titles[location.pathname];
    document.title = name && location.pathname !== "/" ? `${name} · MoneyMinder` : "MoneyMinder";
    setMore(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuth) return undefined;
    let alive = true;
    fetchUserUtils().then((next) => {
      if (alive) setUser(next);
    });
    return () => {
      alive = false;
    };
  }, [isAuth]);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <div className={`mm${isAuth ? " is-auth" : ""}`}>
      {!isAuth && (
        <header className="topbar">
          <button className="brand" type="button" onClick={() => navigate("/")}>
            <Logo />
            MoneyMinder
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
            <button
              type="button"
              className="mini mobile-only"
              aria-expanded={more}
              aria-label="More pages"
              onClick={() => setMore((open) => !open)}
            >
              More
            </button>
            {more && (
              <div className="more-pop">
                <NavLink to="/Overview" onMouseEnter={() => prefetch("/Overview")}>Overview</NavLink>
                <NavLink to="/Analytics" onMouseEnter={() => prefetch("/Analytics")}>Analytics</NavLink>
              </div>
            )}
            <button
              type="button"
              className="user-chip"
              aria-label={user ? `Profile of ${user.fullName}` : "Log in"}
              onClick={() => navigate(user ? "/Profile" : "/Login")}
            >
              <span className="avatar" aria-hidden="true">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="" width="36" height="36" />
                ) : (
                  initials(user?.fullName)
                )}
              </span>
              <span>{user?.fullName || "Log in"}</span>
            </button>
          </div>
        </header>
      )}

      {!isAuth && (
        <nav className="sidenav" aria-label="Primary">
          <ul>
            {LINKS.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </ul>
        </nav>
      )}

      <main className="main">
        {offline && (
          <div className="offline" role="status">
            You’re offline. Saving a change will wait until you’re back online.
          </div>
        )}
        <div key={location.pathname} className="page-enter">
          {children}
        </div>
      </main>

      {!isAuth && (
        <nav className="tabbar" aria-label="Mobile">
          {TABS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onMouseEnter={() => prefetch(item.to)}
                onFocus={() => prefetch(item.to)}
              >
                <Icon strokeWidth={2} />
                {item.label === "Add Transaction" ? "Add" : item.label.split(" ")[0]}
              </NavLink>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function RouteFallback() {
  const { pathname } = useLocation();
  const show = useDelayedFlag(true, 150);
  return show ? <PageSkeleton pathname={pathname} /> : null;
}

export class RouteBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    const message = String(error?.message || error || "");
    const chunk = /ChunkLoadError|dynamically imported module|Loading chunk/i.test(message);
    if (chunk && !sessionStorage.getItem("mm-chunk-reload")) {
      sessionStorage.setItem("mm-chunk-reload", "1");
      window.location.reload();
    }
  }

  componentDidMount() {
    sessionStorage.removeItem("mm-chunk-reload");
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section className="card" role="alert">
        <h2 className="section-title">Something went wrong</h2>
        <p className="label">This page didn’t finish loading. Retry, and if it keeps happening refresh the tab.</p>
        <div className="btn-row" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn"
            onClick={() => {
              this.setState({ error: null });
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }
}
