"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stepper from "@/components/Stepper";
import { useFormContext } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export default function Step4() {
  const router = useRouter();
  const { form, resetForm } = useFormContext();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const { applicant, passport, children, applicationInfo, visaHistory } = form;

      // 1. Insert applicant
      const { data: appData, error: appErr } = await supabase
        .from("applicant_information_t")
        .insert({
          surname: applicant.surname,
          firstname: applicant.firstname,
          sex: applicant.sex,
          birthplace: applicant.birthplace,
          birth_date: applicant.birthdate || null,
          citizenship: applicant.citizenship,
          applicant_address: applicant.address,
          applicant_contact_num: applicant.contact,
          occupation: applicant.occupation,
          employment_address: applicant.employmentAddress,
          father_name: applicant.father,
          mother_name: applicant.mother,
          civil_status: applicant.civilStatus,
          spouse_name: applicant.spouse || null,
          spouse_citizenship: applicant.spouseCitizenship || null,
        })
        .select("applicant_id")
        .single();

      if (appErr) throw appErr;
      const applicantId = appData.applicant_id;

      // 2. Insert passport
      if (passport.number) {
        const { error: passErr } = await supabase
          .from("passport_information_t")
          .insert({
            applicant_id: applicantId,
            passport_num: passport.number,
            passport_issued_date: passport.issuedDate || null,
            passport_expiry_date: passport.expiryDate || null,
            passport_issued_by: passport.issuedBy || null,
          });
        if (passErr) throw passErr;
      }

      // 3. Insert children + relationships
      for (const child of children) {
        const { data: childData, error: childErr } = await supabase
          .from("applicant_children_t")
          .insert({ child_name: child.name, child_age: Number(child.age) || null })
          .select("child_id")
          .single();

        if (childErr) throw childErr;

        const { error: relErr } = await supabase
          .from("parent_child_relationship_t")
          .insert({
            child_id: childData.child_id,
            applicant_id: applicantId,
            relationship_type: child.relationship,
          });
        if (relErr) throw relErr;
      }

      // 4. Insert sponsor (skip for now — no sponsor form fields)

      // 5. Insert application info
      const { data: applicationData, error: appInfoErr } = await supabase
        .from("application_information_t")
        .insert({
          applicant_id: applicantId,
          age_at_application: Number(applicationInfo.ageAtApplication) || null,
          port_of_entry: applicationInfo.portOfEntry,
          stay_length: Number(applicationInfo.stayLength) || null,
          entry_purpose: applicationInfo.entryPurpose,
          companion_name: applicationInfo.companionName || null,
          destination_after_phil: applicationInfo.destinationAfterPH,
          prev_had_visa: visaHistory ? 1 : 0,
        })
        .select("application_id")
        .single();

      if (appInfoErr) throw appInfoErr;

      // 6. Insert visa history
      if (visaHistory) {
        const { error: visaErr } = await supabase
          .from("visa_history_t")
          .insert({
            visa_num: `V${Date.now()}`,
            applicant_id: applicantId,
            visa_type: visaHistory.visaType,
            visa_issuing_officer: visaHistory.visaIssuedBy,
            visa_issued_date: visaHistory.visaIssuedDate || null,
            entry_date: visaHistory.entryDate || null,
            exit_date: visaHistory.exitDate || null,
            stay_duration: Number(visaHistory.stayDuration) || null,
          });
        if (visaErr) throw visaErr;
      }

      resetForm();
      router.push("/submit");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSubmitting(false);
    }
  };

  const { applicant, passport, children, applicationInfo, visaHistory } = form;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="form-row">
      <div className="field">
        <label>{label}</label>
        <input type="text" value={value} readOnly />
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <Stepper currentStep={4} />

      {/* Applicant Info Review */}
      <div className="applicant-information">
        <div className="section-title">
          <h2>Applicant Information</h2>
          <p>申请人信息</p>
        </div>
        <div className="form-content">
          <div className="form-row">
            <div className="field"><label>Surname</label><input type="text" value={applicant.surname} readOnly /></div>
            <div className="field"><label>First Name</label><input type="text" value={applicant.firstname} readOnly /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Sex</label><input type="text" value={applicant.sex} readOnly /></div>
            <div className="field"><label>Birth Date</label><input type="text" value={applicant.birthdate} readOnly /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Birth Place</label><input type="text" value={applicant.birthplace} readOnly /></div>
            <div className="field"><label>Citizenship</label><input type="text" value={applicant.citizenship} readOnly /></div>
          </div>
          <div className="field full-width"><label>Address</label><input type="text" value={applicant.address} readOnly /></div>
          <div className="form-row">
            <div className="field"><label>Contact</label><input type="text" value={applicant.contact} readOnly /></div>
            <div className="field"><label>Occupation</label><input type="text" value={applicant.occupation} readOnly /></div>
          </div>
          <div className="field full-width"><label>Employment Address</label><input type="text" value={applicant.employmentAddress} readOnly /></div>
          <div className="form-row">
            <div className="field"><label>Father</label><input type="text" value={applicant.father} readOnly /></div>
            <div className="field"><label>Mother</label><input type="text" value={applicant.mother} readOnly /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Civil Status</label><input type="text" value={applicant.civilStatus} readOnly /></div>
            <div className="field"><label>Spouse</label><input type="text" value={applicant.spouse} readOnly /></div>
          </div>
          <Row label="Spouse Citizenship" value={applicant.spouseCitizenship} />
        </div>
      </div>

      {/* Children Review */}
      <div className="children-section">
        <div className="section-title"><h2>Children</h2><p>孩子</p></div>
        <div className="children-content">
          {children.length === 0 ? (
            <p>No children declared.</p>
          ) : (
            children.map((child, i) => (
              <div className="child-card" key={i} style={{ marginBottom: 12 }}>
                <div className="child-header"><span>Child #{i + 1}</span></div>
                <div className="child-row">
                  <div className="field"><label>Name</label><input type="text" value={child.name} readOnly /></div>
                  <div className="field"><label>Age</label><input type="text" value={child.age} readOnly /></div>
                </div>
                <div className="field"><label>Relationship</label><input type="text" value={child.relationship} readOnly /></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Passport Review */}
      <div className="passport-information">
        <div className="section-title"><h2>Passport Information</h2><p>护照信息</p></div>
        <div className="form-content">
          <div className="form-row">
            <div className="field"><label>Passport Number</label><input type="text" value={passport.number} readOnly /></div>
            <div className="field"><label>Issued Date</label><input type="text" value={passport.issuedDate} readOnly /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Expiry Date</label><input type="text" value={passport.expiryDate} readOnly /></div>
            <div className="field"><label>Issued By</label><input type="text" value={passport.issuedBy} readOnly /></div>
          </div>
        </div>
      </div>

      {/* Application Info Review */}
      <div className="application-information">
        <div className="section-title"><h2>Application Information</h2><p>申请信息</p></div>
        <div className="form-content">
          <div className="form-row">
            <div className="field"><label>Port of Entry</label><input type="text" value={applicationInfo.portOfEntry} readOnly /></div>
            <div className="field"><label>Stay Length</label><input type="text" value={applicationInfo.stayLength} readOnly /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Entry Purpose</label><input type="text" value={applicationInfo.entryPurpose} readOnly /></div>
            <div className="field"><label>Age at Application</label><input type="text" value={applicationInfo.ageAtApplication} readOnly /></div>
          </div>
          <div className="field full-width"><label>Companion</label><input type="text" value={applicationInfo.companionName} readOnly /></div>
          <div className="field full-width"><label>Destination After PH</label><input type="text" value={applicationInfo.destinationAfterPH} readOnly /></div>
          <div className="checkbox-field">
            <input type="checkbox" checked={!!visaHistory} readOnly disabled />
            <label>Past visa application?</label>
          </div>
        </div>
      </div>

      {/* Visa History Review */}
      {visaHistory && (
        <div className="visa-history">
          <div className="section-title"><h2>Visa History</h2><p>签证记录</p></div>
          <div className="form-content">
            <div className="form-row">
              <div className="field"><label>Visa Type</label><input type="text" value={visaHistory.visaType} readOnly /></div>
              <div className="field"><label>Issued By</label><input type="text" value={visaHistory.visaIssuedBy} readOnly /></div>
            </div>
            <div className="form-row">
              <div className="field"><label>Issued Date</label><input type="text" value={visaHistory.visaIssuedDate} readOnly /></div>
              <div className="field"><label>Stay Duration</label><input type="text" value={visaHistory.stayDuration} readOnly /></div>
            </div>
            <div className="form-row">
              <div className="field"><label>Entry Date</label><input type="text" value={visaHistory.entryDate} readOnly /></div>
              <div className="field"><label>Exit Date</label><input type="text" value={visaHistory.exitDate} readOnly /></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 20px", color: "red" }}>
          {error}
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="save-btn" onClick={() => router.push("/step3")}>
          Back
        </button>
        <button type="button" className="next-btn" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>

      <Footer />
    </>
  );
}
