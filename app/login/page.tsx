"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      localStorage.setItem("dashboard_auth", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="applicant-information" style={{ gridTemplateColumns: "180px 1fr", maxWidth: 600 }}>
          <div className="section-title">
            <h2>Admin Login</h2>
            <p>管理员登录</p>
          </div>

          <div className="form-content">
            {error && <div className="login-error">{error}</div>}

            <div className="field" style={{ marginBottom: 16 }}>
              <label>Username / 用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label>Password / 密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <button className="next-btn" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
