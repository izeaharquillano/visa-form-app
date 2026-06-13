"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SubmitPage() {
  return (
    <>
      <Header />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
        <div
          style={{
            background: "white",
            width: "100%",
            maxWidth: 800,
            border: "1px solid #C4C5D5",
            boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
            padding: 48,
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <h1 style={{ color: "rgba(0,37,118,1)", fontSize: 32, fontWeight: 700, lineHeight: "42px", margin: "0 0 8px" }}>
            Application Submitted
          </h1>
          <p style={{ color: "rgba(68,70,83,1)", fontSize: 24, fontWeight: 500, lineHeight: "34px", margin: "0 0 24px" }}>
            申请已提交
          </p>
          <p style={{ color: "#444", fontSize: 16, lineHeight: "24px", maxWidth: 500, margin: "0 auto" }}>
            Your visa application has been successfully submitted. You will be
            contacted regarding the status of your application.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
