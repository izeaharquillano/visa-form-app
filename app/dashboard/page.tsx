"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSupabase } from "@/lib/supabase";

interface TableConfig {
  table: string;
  pk: string;
  columns: { key: string; label: string; type?: "text" | "number" | "date" | "select"; options?: string[]; db: string }[];
  dbToLocal: Record<string, string>;
  localToDb: Record<string, string>;
}

const TAB_NAMES = [
  "Applicant Information",
  "Passport Information",
  "Children",
  "Sponsor Information",
  "Application Information",
  "Visa History",
  "Supporting Documents",
];

const tableConfigs: Record<string, TableConfig> = {
  "Applicant Information": {
    table: "applicant_information_t",
    pk: "applicant_id",
    columns: [
      { key: "applicant_id", label: "ID", type: "number", db: "applicant_id" },
      { key: "surname", label: "Surname", db: "surname" },
      { key: "firstname", label: "First Name", db: "firstname" },
      { key: "sex", label: "Sex", type: "select", options: ["Male", "Female"], db: "sex" },
      { key: "birth_date", label: "Birth Date", type: "date", db: "birth_date" },
      { key: "birthplace", label: "Birth Place", db: "birthplace" },
      { key: "citizenship", label: "Citizenship", db: "citizenship" },
      { key: "applicant_address", label: "Address", db: "applicant_address" },
      { key: "applicant_contact_num", label: "Contact", db: "applicant_contact_num" },
      { key: "occupation", label: "Occupation", db: "occupation" },
      { key: "civil_status", label: "Civil Status", type: "select", options: ["Single", "Married", "Widowed"], db: "civil_status" },
    ],
    dbToLocal: { applicant_id: "applicant_id", surname: "surname", firstname: "firstname", sex: "sex", birth_date: "birth_date", birthplace: "birthplace", citizenship: "citizenship", applicant_address: "applicant_address", applicant_contact_num: "applicant_contact_num", occupation: "occupation", civil_status: "civil_status" },
    localToDb: { applicant_id: "applicant_id", surname: "surname", firstname: "firstname", sex: "sex", birth_date: "birth_date", birthplace: "birthplace", citizenship: "citizenship", applicant_address: "applicant_address", applicant_contact_num: "applicant_contact_num", occupation: "occupation", civil_status: "civil_status" },
  },
  "Passport Information": {
    table: "passport_information_t",
    pk: "passport_id",
    columns: [
      { key: "passport_id", label: "Passport ID", type: "number", db: "passport_id" },
      { key: "applicant_id", label: "Applicant ID", type: "number", db: "applicant_id" },
      { key: "passport_num", label: "Passport Number", db: "passport_num" },
      { key: "passport_issued_date", label: "Issued Date", type: "date", db: "passport_issued_date" },
      { key: "passport_expiry_date", label: "Expiry Date", type: "date", db: "passport_expiry_date" },
      { key: "passport_issued_by", label: "Issued By", db: "passport_issued_by" },
    ],
    dbToLocal: { passport_id: "passport_id", applicant_id: "applicant_id", passport_num: "passport_num", passport_issued_date: "passport_issued_date", passport_expiry_date: "passport_expiry_date", passport_issued_by: "passport_issued_by" },
    localToDb: { passport_id: "passport_id", applicant_id: "applicant_id", passport_num: "passport_num", passport_issued_date: "passport_issued_date", passport_expiry_date: "passport_expiry_date", passport_issued_by: "passport_issued_by" },
  },
  Children: {
    table: "applicant_children_t",
    pk: "child_id",
    columns: [
      { key: "child_id", label: "Child ID", type: "number", db: "child_id" },
      { key: "child_name", label: "Child Name", db: "child_name" },
      { key: "child_age", label: "Child Age", type: "number", db: "child_age" },
    ],
    dbToLocal: { child_id: "child_id", child_name: "child_name", child_age: "child_age" },
    localToDb: { child_id: "child_id", child_name: "child_name", child_age: "child_age" },
  },
  "Sponsor Information": {
    table: "sponsor_information_t",
    pk: "sponsor_id",
    columns: [
      { key: "sponsor_id", label: "Sponsor ID", type: "number", db: "sponsor_id" },
      { key: "sponsor_name", label: "Sponsor Name", db: "sponsor_name" },
      { key: "sponsor_address", label: "Sponsor Address", db: "sponsor_address" },
      { key: "sponsor_contact_num", label: "Sponsor Contact", db: "sponsor_contact_num" },
    ],
    dbToLocal: { sponsor_id: "sponsor_id", sponsor_name: "sponsor_name", sponsor_address: "sponsor_address", sponsor_contact_num: "sponsor_contact_num" },
    localToDb: { sponsor_id: "sponsor_id", sponsor_name: "sponsor_name", sponsor_address: "sponsor_address", sponsor_contact_num: "sponsor_contact_num" },
  },
  "Application Information": {
    table: "application_information_t",
    pk: "application_id",
    columns: [
      { key: "application_id", label: "Application ID", type: "number", db: "application_id" },
      { key: "applicant_id", label: "Applicant ID", type: "number", db: "applicant_id" },
      { key: "port_of_entry", label: "Port of Entry", db: "port_of_entry" },
      { key: "stay_length", label: "Stay Length (days)", type: "number", db: "stay_length" },
      { key: "entry_purpose", label: "Entry Purpose", db: "entry_purpose" },
      { key: "age_at_application", label: "Age at Application", type: "number", db: "age_at_application" },
      { key: "companion_name", label: "Companion", db: "companion_name" },
      { key: "destination_after_phil", label: "Destination after PH", db: "destination_after_phil" },
    ],
    dbToLocal: { application_id: "application_id", applicant_id: "applicant_id", port_of_entry: "port_of_entry", stay_length: "stay_length", entry_purpose: "entry_purpose", age_at_application: "age_at_application", companion_name: "companion_name", destination_after_phil: "destination_after_phil" },
    localToDb: { application_id: "application_id", applicant_id: "applicant_id", port_of_entry: "port_of_entry", stay_length: "stay_length", entry_purpose: "entry_purpose", age_at_application: "age_at_application", companion_name: "companion_name", destination_after_phil: "destination_after_phil" },
  },
  "Visa History": {
    table: "visa_history_t",
    pk: "visa_num",
    columns: [
      { key: "visa_num", label: "Visa Number", db: "visa_num" },
      { key: "applicant_id", label: "Applicant ID", type: "number", db: "applicant_id" },
      { key: "visa_type", label: "Visa Type", db: "visa_type" },
      { key: "visa_issuing_officer", label: "Issuing Officer", db: "visa_issuing_officer" },
      { key: "visa_issued_date", label: "Issued Date", type: "date", db: "visa_issued_date" },
      { key: "entry_date", label: "Entry Date", type: "date", db: "entry_date" },
      { key: "exit_date", label: "Exit Date", type: "date", db: "exit_date" },
      { key: "stay_duration", label: "Stay Duration", type: "number", db: "stay_duration" },
    ],
    dbToLocal: { visa_num: "visa_num", applicant_id: "applicant_id", visa_type: "visa_type", visa_issuing_officer: "visa_issuing_officer", visa_issued_date: "visa_issued_date", entry_date: "entry_date", exit_date: "exit_date", stay_duration: "stay_duration" },
    localToDb: { visa_num: "visa_num", applicant_id: "applicant_id", visa_type: "visa_type", visa_issuing_officer: "visa_issuing_officer", visa_issued_date: "visa_issued_date", entry_date: "entry_date", exit_date: "exit_date", stay_duration: "stay_duration" },
  },
  "Supporting Documents": {
    table: "supporting_documents_t",
    pk: "document_id",
    columns: [
      { key: "document_id", label: "Document ID", type: "number", db: "document_id" },
      { key: "application_id", label: "Application ID", type: "number", db: "application_id" },
      { key: "document_name", label: "Document Name", db: "document_name" },
    ],
    dbToLocal: { document_id: "document_id", application_id: "application_id", document_name: "document_name" },
    localToDb: { document_id: "document_id", application_id: "application_id", document_name: "document_name" },
  },
};

function cellValue(value: any): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

async function fetchTableData(config: TableConfig): Promise<any[]> {
  const supabase = getSupabase();
  const { data, error } = await (supabase as any)
    .from(config.table)
    .select("*")
    .order(config.pk, { ascending: false });
  if (error) throw error;
  return data || [];
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<any>({});
  const [newRow, setNewRow] = useState<any>({});

  const tabName = TAB_NAMES[activeTab];
  const config = tableConfigs[tabName];

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await fetchTableData(config);
      setData(rows);
    } catch (err: any) {
      console.error("Failed to fetch:", err);
    }
    setLoading(false);
    setEditingId(null);
    setEditRow({});
    setNewRow({});
  }, [config]);

  useEffect(() => {
    if (localStorage.getItem("dashboard_auth") !== "true") {
      router.push("/login");
      return;
    }
    loadData();
  }, [tabName, router, loadData]);

  const handleLogout = () => {
    localStorage.removeItem("dashboard_auth");
    router.push("/");
  };

  const startEdit = (row: any) => {
    setEditingId(cellValue(row[config.pk]));
    setEditRow({ ...row });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRow({});
  };

  const saveEdit = async () => {
    try {
      const supabase = getSupabase();
      const dbRow: any = {};
      for (const col of config.columns) {
        if (col.key !== config.pk) {
          dbRow[col.db] = editRow[col.key] ?? null;
        }
      }
      const { error } = await (supabase as any)
        .from(config.table)
        .update(dbRow)
        .eq(config.pk, editRow[config.pk]);
      if (error) throw error;
      await loadData();
      setEditingId(null);
      setEditRow({});
    } catch (err: any) {
      alert("Failed to save: " + (err?.message || err?.details || "Unknown error"));
    }
  };

  const deleteRow = async (row: any) => {
    if (!confirm("Delete this row?")) return;
    try {
      const supabase = getSupabase();
      const { error } = await (supabase as any)
        .from(config.table)
        .delete()
        .eq(config.pk, row[config.pk]);
      if (error) throw error;
      await loadData();
    } catch (err: any) {
      alert("Failed to delete: " + (err?.message || err?.details || "Unknown error"));
    }
  };

  const addRow = async () => {
    const nonPkCols = config.columns.filter((c) => c.key !== config.pk);
    const hasEmpty = nonPkCols.some(
      (col) => newRow[col.key] === undefined || newRow[col.key] === ""
    );
    if (hasEmpty) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const supabase = getSupabase();
      const dbRow: any = {};
      for (const col of config.columns) {
        if (col.key !== config.pk) {
          dbRow[col.db] = newRow[col.key] ?? null;
        }
      }
      const { error } = await (supabase as any)
        .from(config.table)
        .insert(dbRow);
      if (error) throw error;
      await loadData();
      setNewRow({});
    } catch (err: any) {
      alert("Failed to add: " + (err?.message || err?.details || "Unknown error"));
    }
  };

  const renderCell = (col: any, value: any, onChange: (v: any) => void) => {
    if (col.type === "select") {
      return (
        <select value={cellValue(value)} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {(col.options || []).map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    return (
      <input
        type={col.type || "text"}
        value={cellValue(value)}
        onChange={(e) => onChange(col.type === "number" ? Number(e.target.value) : e.target.value)}
      />
    );
  };

  return (
    <>
      <Header />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="dashboard-container" style={{ flex: 1 }}>
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-add-sidebar">
              <p className="sidebar-title">Add New Row</p>
              {config.columns
                .filter((col) => col.key !== config.pk)
                .map((col) => (
                  <div key={col.key}>
                    {col.type === "select" ? (
                      <select
                        value={cellValue(newRow[col.key])}
                        onChange={(e) => setNewRow((prev: any) => ({ ...prev, [col.key]: e.target.value }))}
                      >
                        <option value="">{col.label}</option>
                        {(col.options || []).map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={col.type || "text"}
                        placeholder={col.label}
                        value={cellValue(newRow[col.key])}
                        onChange={(e) =>
                          setNewRow((prev: any) => ({
                            ...prev,
                            [col.key]: col.type === "number" ? Number(e.target.value) : e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                ))}
              <button className="dashboard-add-btn" onClick={addRow}>
                + Add Row
              </button>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="dashboard-tabs">
                {TAB_NAMES.map((name, i) => (
                  <button
                    key={name}
                    className={`dashboard-tab${i === activeTab ? " active" : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      {config.columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                      ))}
                      <th style={{ width: 120 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={config.columns.length + 1} style={{ textAlign: "center", color: "#666", padding: 20 }}>
                          Loading...
                        </td>
                      </tr>
                    )}
                    {!loading && data.length === 0 && (
                      <tr>
                        <td colSpan={config.columns.length + 1} style={{ textAlign: "center", color: "#666", padding: 20 }}>
                          No rows yet.
                        </td>
                      </tr>
                    )}
                    {!loading && data.map((row) => {
                      const rowKey = cellValue(row[config.pk]);
                      const editing = editingId === rowKey;
                      return (
                        <tr key={rowKey}>
                          {config.columns.map((col) => (
                            <td key={col.key}>
                              {editing && col.key !== config.pk ? (
                                renderCell(col, editRow[col.key], (v) =>
                                  setEditRow((prev: any) => ({ ...prev, [col.key]: v }))
                                )
                              ) : (
                                cellValue(row[col.key])
                              )}
                            </td>
                          ))}
                          <td>
                            <div className="dashboard-actions">
                              {editing ? (
                                <>
                                  <button className="dashboard-save-btn" onClick={saveEdit}>
                                    Save
                                  </button>
                                  <button className="dashboard-cancel-btn" onClick={cancelEdit}>
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="dashboard-edit-btn" onClick={() => startEdit(row)}>
                                    Edit
                                  </button>
                                  <button className="dashboard-delete-btn" onClick={() => deleteRow(row)}>
                                    ✕
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
