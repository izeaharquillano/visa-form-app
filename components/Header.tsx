"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("dashboard_auth") === "true");
  }, []);

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
        {loggedIn ? (
          <button className="sign-in-btn" onClick={() => router.push("/dashboard")}>
            Dashboard
          </button>
        ) : (
          <button className="sign-in-btn" onClick={() => router.push("/login")}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
