export default function Header() {
  return (
    <div className="header">
      <div className="left-section">
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 12 }}>
          <img className="ph-logo" src="/phlogo.png" alt="PH Logo" />
          <span className="portal-title">Philippine Visa Portal | 菲律宾签证门户</span>
        </a>
      </div>
      <div className="right-section">
        <span style={{ color: "#002576", cursor: "pointer" }}>Language: EN/ZH</span>
      </div>
    </div>
  );
}
