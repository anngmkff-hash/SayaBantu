import React, { useEffect, useState } from "react";

/* ================= AUTH HEADER ================= */
const useAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token || ""}` };
};

/* ================= TAB TYPE ================= */
type TabKey =
  | "logo"
  | "wa"
  | "services"
  | "emails"
  | "addresses"
  | "socials"
  | "users";

/* ================= UI STYLES ================= */
const UIStyles = () => (
  <style>{`
    .sb-container{max-width:1100px;margin:0 auto;padding:16px}
    .sb-h1{font-size:22px;font-weight:700;margin:6px 0 16px}
    .sb-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
    .sb-tab{padding:8px 12px;border-radius:10px;border:1px solid #e5e7eb;font-weight:700}
    .sb-tab--active{background:#10b981;color:white;border-color:#10b981}
  `}</style>
);

/* ================= TAB BUTTON ================= */
const TabBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    className={`sb-tab ${active ? "sb-tab--active" : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
);

/* ================= TABS ================= */
const Tabs: React.FC<{ active: TabKey; onChange: (k: TabKey) => void }> = ({
  active,
  onChange,
}) => (
  <div className="sb-tabs">
    <TabBtn active={active === "logo"} onClick={() => onChange("logo")}>
      Logo
    </TabBtn>
    <TabBtn active={active === "wa"} onClick={() => onChange("wa")}>
      WhatsApp
    </TabBtn>
    <TabBtn active={active === "services"} onClick={() => onChange("services")}>
      Layanan
    </TabBtn>
    <TabBtn active={active === "emails"} onClick={() => onChange("emails")}>
      Email
    </TabBtn>
    <TabBtn
      active={active === "addresses"}
      onClick={() => onChange("addresses")}
    >
      Alamat
    </TabBtn>
    <TabBtn active={active === "socials"} onClick={() => onChange("socials")}>
      Sosmed
    </TabBtn>
    <TabBtn active={active === "users"} onClick={() => onChange("users")}>
      Users
    </TabBtn>
  </div>
);

/* ================= HALAMAN UTAMA ================= */
const SettingsPage: React.FC = () => {
  const [active, setActive] = useState<TabKey>("logo");

  // ==================================================
  // 🔐 AUTH GUARD ADMIN (WAJIB – INI YANG KEMARIN KURANG)
  // ==================================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      window.location.replace("/login");
    }
  }, []);
  // ==================================================

  return (
    <div className="sb-container">
      <UIStyles />
      <h1 className="sb-h1">Pengaturan Website</h1>

      <Tabs active={active} onChange={setActive} />

      {active === "logo" && <div>Panel Logo</div>}
      {active === "wa" && <div>Panel WhatsApp</div>}
      {active === "services" && <div>Panel Services</div>}
      {active === "emails" && <div>Panel Emails</div>}
      {active === "addresses" && <div>Panel Addresses</div>}
      {active === "socials" && <div>Panel Socials</div>}
      {active === "users" && <div>Panel Users</div>}
    </div>
  );
};

export default SettingsPage;
