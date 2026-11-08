import { useEffect, useState } from "react";

export function Logo({ className = "brand-mark" }) {
  return (
    <svg className={className} viewBox="0 0 28 22" aria-hidden="true">
      <rect x="1" y="10" width="6" height="11" rx="2" fill="#141414" />
      <rect x="11" y="4" width="6" height="17" rx="2" fill="#C4F04D" />
      <rect x="21" y="0" width="6" height="21" rx="2" fill="#141414" />
    </svg>
  );
}

export function CoinStack() {
  return (
    <svg className="coins" viewBox="0 0 160 120" aria-hidden="true">
      <ellipse cx="70" cy="98" rx="42" ry="10" fill="#8FBE22" />
      <ellipse cx="70" cy="88" rx="42" ry="11" fill="#C4F04D" />
      <path d="M28 80c0-6 19-11 42-11s42 5 42 11v8c0 6-19 11-42 11S28 94 28 88Z" fill="#101010" />
      <ellipse cx="70" cy="72" rx="42" ry="10" fill="#8FBE22" />
      <ellipse cx="70" cy="62" rx="42" ry="11" fill="#C4F04D" />
      <path d="M28 54c0-6 19-11 42-11s42 5 42 11v8c0 6-19 11-42 11S28 68 28 62Z" fill="#101010" />
      <ellipse cx="70" cy="46" rx="42" ry="10" fill="#8FBE22" />
      <ellipse cx="70" cy="36" rx="42" ry="11" fill="#C4F04D" />
      <circle cx="122" cy="40" r="26" fill="none" stroke="#C4F04D" strokeWidth="3" />
      <circle cx="122" cy="40" r="19" fill="none" stroke="#C4F04D" strokeWidth="1.6" strokeDasharray="2.5 3" />
      <text x="122" y="48" textAnchor="middle" fontSize="24" fontWeight="800" fill="#C4F04D">$</text>
    </svg>
  );
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function useDelayedFlag(active, delay = 150) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) {
      setShow(false);
      return undefined;
    }
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [active, delay]);
  return show;
}

export function CountUp({ value, format }) {
  const reduced = usePrefersReducedMotion();
  const target = Number(value) || 0;
  const [current, setCurrent] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setCurrent(target);
      return undefined;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 600);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  return <span className="tabular">{format ? format(current) : current}</span>;
}

export function IconButton({ label, children, ...props }) {
  return (
    <button type="button" className="icon-btn" aria-label={label} {...props}>
      {children}
    </button>
  );
}

export function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-back" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        {title ? <h3>{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}

export function EmptyState({ title, body, action }) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      {body ? <span>{body}</span> : null}
      {action ? <div style={{ marginTop: 12 }}>{action}</div> : null}
    </div>
  );
}

export function Segmented({ value, onChange, options }) {
  const index = Math.max(0, options.findIndex((option) => option.value === value));
  return (
    <div className="segment" role="tablist" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      <i style={{ width: `calc(${100 / options.length}% - 4px)`, transform: `translateX(${index * 100}%)` }} aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={value === option.value ? "on" : ""}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Bone({ h = 16, w = "100%", r = 10 }) {
  return <div className="skel" style={{ height: h, width: w, borderRadius: r }} />;
}

export function DashboardSkeleton() {
  return (
    <div className="bento" aria-hidden="true">
      <div className="card card-ink span-6" style={{ minHeight: 180 }}><Bone h={18} w="40%" /><Bone h={48} w="55%" /></div>
      <div className="card card-income span-3" style={{ minHeight: 180 }}><Bone h={18} w="50%" /><Bone h={36} w="60%" /></div>
      <div className="card card-expense span-3" style={{ minHeight: 180 }}><Bone h={18} w="50%" /><Bone h={36} w="60%" /></div>
      <div className="card card-chart span-5" style={{ minHeight: 280 }}><Bone h={20} w="50%" /><Bone h={160} /></div>
      <div className="card span-7" style={{ minHeight: 280 }}><Bone h={20} w="40%" /><Bone h={180} /></div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <Bone h={22} w="30%" />
      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {Array.from({ length: 6 }).map((_, index) => <Bone key={index} h={36} />)}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bento" aria-hidden="true">
      <div className="card card-chart span-12" style={{ minHeight: 280 }}><Bone h={22} w="36%" /><Bone h={180} /></div>
      <div className="card span-6" style={{ minHeight: 260 }}><Bone h={22} w="40%" /><Bone h={160} /></div>
      <div className="card span-6" style={{ minHeight: 260 }}><Bone h={22} w="40%" /><Bone h={160} /></div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="card" style={{ maxWidth: 720, margin: "0 auto" }} aria-hidden="true">
      <Bone h={28} w="40%" />
      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        <Bone h={48} /><Bone h={48} /><Bone h={48} /><Bone h={96} />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bento" aria-hidden="true">
      <div className="card span-5" style={{ minHeight: 320 }}><Bone h={72} w={72} r={99} /><Bone h={20} w="50%" /></div>
      <div className="card span-7" style={{ minHeight: 320 }}><Bone h={20} w="40%" /><Bone h={120} /></div>
    </div>
  );
}

export function PageSkeleton({ pathname = "/" }) {
  if (pathname === "/Profile") return <ProfileSkeleton />;
  if (pathname === "/Transactions") return <TableSkeleton />;
  if (pathname === "/Analytics" || pathname === "/Overview") return <ChartSkeleton />;
  if (pathname === "/AddTransaction" || pathname === "/Login" || pathname === "/SignUp") return <FormSkeleton />;
  return <DashboardSkeleton />;
}

export function Ring({ value, color = "var(--ink)" }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  return (
    <svg className="ring" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--hairline)" strokeWidth="6" />
      <circle
        className="draw"
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        transform="rotate(-90 36 36)"
      />
      <text x="36" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">{pct}%</text>
    </svg>
  );
}
