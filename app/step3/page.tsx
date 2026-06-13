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
        <div className="section-title" style={{ padding: 0, marginBottom: 20 }}>
          <h2>Supporting Documents</h2>
          <p>支持文件</p>
        </div>

        <div className="documents-content">
          <table className="documents-table">
            <thead>
              <tr>
                <th>Document Name<br />文件名称</th>
                <th>Attachment<br />依恋</th>
                <th>Action<br />行动</th>
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
                        🗑
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
          Back
        </button>
        <button type="button" className="next-btn" onClick={() => router.push("/step4")}>
          Next Step →
        </button>
      </div>

      <Footer />
    </>
  );
}
