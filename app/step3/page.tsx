"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stepper from "@/components/Stepper";
import { useFormContext } from "@/lib/store";

const documents = [
  "Valid Passport/Travel Document",
  "Chinese National ID",
  "Affidavit of Support & Guarantee",
  "Household Registry",
  "Air Ticket",
  "Invitation Letter",
  "Financial Proof",
  "Other Documents",
];

export default function Step3() {
  const router = useRouter();
  const { form, setDocuments } = useFormContext();
  const [selected, setSelected] = useState<string[]>(form.documents);
  const fileRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const toggle = (doc: string) => {
    const updated = selected.includes(doc)
      ? selected.filter((d) => d !== doc)
      : [...selected, doc];
    setSelected(updated);
    setDocuments(updated);
  };

  const handleFile = (doc: string) => {
    if (!selected.includes(doc)) {
      toggle(doc);
    }
  };

  const handleDelete = (doc: string) => {
    fileRefs.current.get(doc)!.value = "";
    toggle(doc);
  };

  return (
    <>
      <Header />
      <Stepper currentStep={3} />

      <div className="supporting-documents">
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#002576", margin: 0, fontSize: 24, fontWeight: 700, lineHeight: "34px" }}>
            Supporting Documents
          </h2>
          <p style={{ color: "rgba(68,70,83,1)", margin: "4px 0 0", fontSize: 24, fontWeight: 500, lineHeight: "34px" }}>
            支持文件
          </p>
        </div>

        <div className="documents-content" style={{ padding: 0 }}>
          <table className="documents-table">
            <thead>
              <tr>
                <th>Document Name<br />文件名称</th>
                <th>Attachment<br />附件</th>
                <th>Action<br />操作</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc}>
                  <td>{doc}</td>
                  <td className="attachment-cell">
                    {selected.includes(doc) && (
                      <span style={{ color: "#0d3276" }}>✓ Attached</span>
                    )}
                  </td>
                  <td className="action-cell">
                    <label className="upload-btn">
                      {selected.includes(doc) ? "Replace" : "Upload"}
                      <input
                        type="file"
                        hidden
                        ref={(el) => {
                          if (el) fileRefs.current.set(doc, el);
                        }}
                        onChange={() => handleFile(doc)}
                      />
                    </label>
                    {selected.includes(doc) && (
                      <button className="delete-btn" type="button" onClick={() => handleDelete(doc)}>
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="save-btn" onClick={() => router.push("/step2")}>
          Save for Later
        </button>
        <button type="button" className="next-btn" onClick={() => router.push("/step4")}>
          Next Step
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <Footer />
    </>
  );
}
