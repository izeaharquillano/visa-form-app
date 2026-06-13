"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SubmitPage() {
  return (
    <>
      <Header />
      <div className="success-container" style={{ flex: 1 }}>
        <h1>Application Submitted</h1>
        <p>申请已提交</p>
        <p>
          Your visa application has been successfully submitted. You will be
          contacted regarding the status of your application.
        </p>
      </div>
      <Footer />
    </>
  );
}
