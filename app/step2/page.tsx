"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stepper from "@/components/Stepper";
import { useFormContext } from "@/lib/store";

export default function Step2() {
  const router = useRouter();
  const { form, setApplicationInfo, setVisaHistory } = useFormContext();
  const { applicationInfo, visaHistory } = form;

  const [hasPastVisa, setHasPastVisa] = useState(visaHistory?.hasPastVisa ?? false);

  const updateInfo = (field: string, value: string) =>
    setApplicationInfo({ ...applicationInfo, [field]: value });

  const updateVisa = (field: string, value: string) =>
    setVisaHistory({ ...(visaHistory || { hasPastVisa: true, visaType: "", visaIssuedBy: "", visaIssuedDate: "", stayDuration: "", entryDate: "", exitDate: "" }), [field]: value });

  const togglePastVisa = (checked: boolean) => {
    setHasPastVisa(checked);
    if (!checked) {
      setVisaHistory(null);
    } else {
      setVisaHistory({ hasPastVisa: true, visaType: "", visaIssuedBy: "", visaIssuedDate: "", stayDuration: "", entryDate: "", exitDate: "" });
    }
  };

  const required = (v: string) => v.trim() !== "";

  const handleNext = () => {
    const missing: string[] = [];

    if (!required(applicationInfo.portOfEntry)) missing.push("Port of Entry");
    if (!required(applicationInfo.stayLength)) missing.push("Stay Length");
    if (!required(applicationInfo.entryPurpose)) missing.push("Entry Purpose");
    if (!required(applicationInfo.ageAtApplication)) missing.push("Age at Application");
    if (!required(applicationInfo.destinationAfterPH)) missing.push("Destination after Philippines");

    if (hasPastVisa) {
      if (!required(visaHistory?.visaType ?? "")) missing.push("Visa Type");
      if (!required(visaHistory?.visaIssuedBy ?? "")) missing.push("Visa Issued By");
      if (!required(visaHistory?.visaIssuedDate ?? "")) missing.push("Visa Issued Date");
      if (!required(visaHistory?.stayDuration ?? "")) missing.push("Stay Duration");
      if (!required(visaHistory?.entryDate ?? "")) missing.push("Entry Date");
      if (!required(visaHistory?.exitDate ?? "")) missing.push("Exit Date");
    }

    if (missing.length > 0) {
      alert("Please fill in the following fields:\n\n" + missing.join("\n"));
      return;
    }

    router.push("/step3");
  };

  return (
    <>
      <Header />
      <Stepper currentStep={2} />

      <div className="application-information">
        <div className="section-title">
          <h2>Application Information</h2>
          <p>申请信息</p>
        </div>

        <div className="form-content">
          <div className="form-row">
            <div className="field">
              <label>Port of Entry / 入境口岸 <span className="required">*</span></label>
              <input type="text" value={applicationInfo.portOfEntry} onChange={(e) => updateInfo("portOfEntry", e.target.value)} />
            </div>
            <div className="field">
              <label>Stay Length (days) / 停留时间 <span className="required">*</span></label>
              <input type="text" value={applicationInfo.stayLength} onChange={(e) => updateInfo("stayLength", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Entry Purpose / 入境目的 <span className="required">*</span></label>
              <input type="text" value={applicationInfo.entryPurpose} onChange={(e) => updateInfo("entryPurpose", e.target.value)} />
            </div>
            <div className="field">
              <label>Age at Application / 申请时年龄 <span className="required">*</span></label>
              <input type="number" value={applicationInfo.ageAtApplication} onChange={(e) => updateInfo("ageAtApplication", e.target.value)} />
            </div>
          </div>

          <div className="field full-width">
            <label>Companion Name / 同行人姓名</label>
            <input type="text" value={applicationInfo.companionName} onChange={(e) => updateInfo("companionName", e.target.value)} />
          </div>

          <div className="field full-width">
            <label>Destination after Philippines / 离开菲律宾后的目的地 <span className="required">*</span></label>
            <input type="text" value={applicationInfo.destinationAfterPH} onChange={(e) => updateInfo("destinationAfterPH", e.target.value)} />
          </div>

          <div className="checkbox-field">
            <input type="checkbox" id="past-visa" checked={hasPastVisa} onChange={(e) => togglePastVisa(e.target.checked)} />
            <label htmlFor="past-visa">
              Do you have any past visa application?<br />
              是否有过往签证申请记录？
            </label>
          </div>
        </div>
      </div>

      {hasPastVisa && (
        <div className="visa-history">
          <div className="section-title">
            <h2>Visa History</h2>
            <p>签证记录</p>
          </div>

          <div className="form-content">
            <div className="form-row">
              <div className="field">
                <label>Visa Type / 签证类型 <span className="required">*</span></label>
                <input type="text" value={visaHistory?.visaType ?? ""} onChange={(e) => updateVisa("visaType", e.target.value)} />
              </div>
              <div className="field">
                <label>Visa Issued By / 签发机关 <span className="required">*</span></label>
                <input type="text" value={visaHistory?.visaIssuedBy ?? ""} onChange={(e) => updateVisa("visaIssuedBy", e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Visa Issued Date / 签发日期 <span className="required">*</span></label>
                <input type="date" value={visaHistory?.visaIssuedDate ?? ""} onChange={(e) => updateVisa("visaIssuedDate", e.target.value)} />
              </div>
              <div className="field">
                <label>Stay Duration (days) / 停留期限 <span className="required">*</span></label>
                <input type="text" value={visaHistory?.stayDuration ?? ""} onChange={(e) => updateVisa("stayDuration", e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Entry Date / 入境日期 <span className="required">*</span></label>
                <input type="date" value={visaHistory?.entryDate ?? ""} onChange={(e) => updateVisa("entryDate", e.target.value)} />
              </div>
              <div className="field">
                <label>Exit Date / 出境日期 <span className="required">*</span></label>
                <input type="date" value={visaHistory?.exitDate ?? ""} onChange={(e) => updateVisa("exitDate", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="save-btn" onClick={() => router.push("/")}>
          Back
        </button>
        <button type="button" className="next-btn" onClick={handleNext}>
          Next Step →
        </button>
      </div>

      <Footer />
    </>
  );
}
