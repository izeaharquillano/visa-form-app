"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stepper from "@/components/Stepper";
import { useFormContext, type Child } from "@/lib/store";

export default function Step1() {
  const router = useRouter();
  const { form, setApplicant, setPassport, setChildren } = useFormContext();
  const { applicant, passport, children } = form;

  const update = (field: string, value: string) =>
    setApplicant({ ...applicant, [field]: value });

  const updatePassport = (field: string, value: string) =>
    setPassport({ ...passport, [field]: value });

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updated = children.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    setChildren(updated);
  };

  const addChild = () =>
    setChildren([...children, { name: "", age: "", relationship: "" }]);

  const removeChild = (index: number) => {
    if (children.length <= 1) return;
    setChildren(children.filter((_, i) => i !== index));
  };

  const required = (v: string) => v.trim() !== "";

  const handleNext = () => {
    const missing: string[] = [];

    if (!required(applicant.surname)) missing.push("Surname");
    if (!required(applicant.firstname)) missing.push("First Name");
    if (!applicant.sex || applicant.sex === "Select") missing.push("Sex");
    if (!required(applicant.birthdate)) missing.push("Birth Date");
    if (!required(applicant.birthplace)) missing.push("Birth Place");
    if (!required(applicant.citizenship)) missing.push("Citizenship");
    if (!required(applicant.address)) missing.push("Applicant Address");
    if (!required(applicant.contact)) missing.push("Contact Number");
    if (!required(applicant.occupation)) missing.push("Occupation");
    if (!required(applicant.employmentAddress)) missing.push("Employment Address");
    if (!required(applicant.father)) missing.push("Father's Name");
    if (!required(applicant.mother)) missing.push("Mother's Name");
    if (!applicant.civilStatus || applicant.civilStatus === "Select") missing.push("Civil Status");
    if (!required(passport.number)) missing.push("Passport Number");
    if (!required(passport.issuedDate)) missing.push("Passport Issued Date");
    if (!required(passport.expiryDate)) missing.push("Passport Expiry Date");
    if (!required(passport.issuedBy)) missing.push("Passport Issued By");

    if (missing.length > 0) {
      alert("Please fill in the following fields:\n\n" + missing.join("\n"));
      return;
    }

    setApplicant(applicant);
    setPassport(passport);
    setChildren(children);
    router.push("/step2");
  };

  return (
    <>
      <Header />

      <Stepper currentStep={1} />

      {/* Applicant Information */}
      <div className="applicant-information">
        <div className="section-title">
          <h2>Applicant Information</h2>
          <p>申请人信息</p>
        </div>

        <div className="form-content">
          <div className="form-row">
            <div className="field">
              <label>Surname / 姓 <span className="required">*</span></label>
              <input type="text" value={applicant.surname} onChange={(e) => update("surname", e.target.value)} />
            </div>
            <div className="field">
              <label>First Name / 名 <span className="required">*</span></label>
              <input type="text" value={applicant.firstname} onChange={(e) => update("firstname", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Sex / 性别 <span className="required">*</span></label>
              <select value={applicant.sex} onChange={(e) => update("sex", e.target.value)}>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="field">
              <label>Birth Date / 出生日期 <span className="required">*</span></label>
              <input type="date" value={applicant.birthdate} onChange={(e) => update("birthdate", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Birth Place / 出生地 <span className="required">*</span></label>
              <input type="text" value={applicant.birthplace} onChange={(e) => update("birthplace", e.target.value)} />
            </div>
            <div className="field">
              <label>Citizenship / 国籍 <span className="required">*</span></label>
              <input type="text" value={applicant.citizenship} onChange={(e) => update("citizenship", e.target.value)} />
            </div>
          </div>

          <div className="field full-width">
            <label>Applicant Address / 申请人地址 <span className="required">*</span></label>
            <input type="text" value={applicant.address} onChange={(e) => update("address", e.target.value)} />
          </div>

          <div className="form-row">
            <div className="field">
              <label>Contact Number / 联系电话 <span className="required">*</span></label>
              <input type="text" value={applicant.contact} onChange={(e) => update("contact", e.target.value)} />
            </div>
            <div className="field">
              <label>Occupation / 职业 <span className="required">*</span></label>
              <input type="text" value={applicant.occupation} onChange={(e) => update("occupation", e.target.value)} />
            </div>
          </div>

          <div className="field full-width">
            <label>Employment Address / 工作地址 <span className="required">*</span></label>
            <input type="text" value={applicant.employmentAddress} onChange={(e) => update("employmentAddress", e.target.value)} />
          </div>

          <div className="form-row">
            <div className="field">
              <label>Father&apos;s Name / 父亲的名字 <span className="required">*</span></label>
              <input type="text" value={applicant.father} onChange={(e) => update("father", e.target.value)} />
            </div>
            <div className="field">
              <label>Mother&apos;s Name / 母亲的名字 <span className="required">*</span></label>
              <input type="text" value={applicant.mother} onChange={(e) => update("mother", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Civil Status / 公民身份 <span className="required">*</span></label>
              <select value={applicant.civilStatus} onChange={(e) => update("civilStatus", e.target.value)}>
                <option>Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
              </select>
            </div>
            <div className="field">
              <label>Spouse Name / 配偶姓名</label>
              <input type="text" value={applicant.spouse} onChange={(e) => update("spouse", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Spouse Citizenship / 配偶公民权</label>
              <input type="text" value={applicant.spouseCitizenship} onChange={(e) => update("spouseCitizenship", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      <div className="children-section">
        <div className="section-title">
          <h2>Children</h2>
          <p>孩子</p>
        </div>

        <div className="children-content">
          <div id="children-container">
            {children.length === 0 && (
              <p style={{ color: "#666", marginBottom: 12 }}>No children added yet.</p>
            )}
            {children.map((child, i) => (
              <div className="child-card" key={i} style={{ marginBottom: 12 }}>
                <div className="child-header">
                  <span>Child #{i + 1} | 孩子#{i + 1}</span>
                  <button className="remove-btn" type="button" onClick={() => removeChild(i)}>
                    Remove | 消除
                  </button>
                </div>
                <div className="child-row">
                  <div className="field">
                    <label>Child Name / 孩子姓名</label>
                    <input type="text" value={child.name} onChange={(e) => updateChild(i, "name", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Child Age / 儿童年龄</label>
                    <input type="number" value={child.age} onChange={(e) => updateChild(i, "age", e.target.value)} />
                  </div>
                </div>
                <div className="field">
                  <label>Relationship Type / 关系类型</label>
                  <select value={child.relationship} onChange={(e) => updateChild(i, "relationship", e.target.value)}>
                    <option>Select / 选择</option>
                    <option>Mother</option>
                    <option>Father</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <button className="add-child-btn" type="button" onClick={addChild}>
            + Add Another Child | 添加另一个孩子
          </button>
        </div>
      </div>

      {/* Passport Information */}
      <div className="passport-information">
        <div className="section-title">
          <h2>Passport Information</h2>
          <p>护照信息</p>
        </div>

        <div className="form-content">
          <div className="form-row">
            <div className="field">
              <label>Passport Number / 护照号码 <span className="required">*</span></label>
              <input type="text" value={passport.number} onChange={(e) => updatePassport("number", e.target.value)} />
            </div>
            <div className="field">
              <label>Passport Issued Date / 护照签发日期 <span className="required">*</span></label>
              <input type="date" value={passport.issuedDate} onChange={(e) => updatePassport("issuedDate", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Passport Expiry Date / 护照到期日 <span className="required">*</span></label>
              <input type="date" value={passport.expiryDate} onChange={(e) => updatePassport("expiryDate", e.target.value)} />
            </div>
            <div className="field">
              <label>Passport Issued By / 护照签发者 <span className="required">*</span></label>
              <input type="text" value={passport.issuedBy} onChange={(e) => updatePassport("issuedBy", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="next-btn" onClick={handleNext}>
          Next Step →
        </button>
      </div>

      <Footer />
    </>
  );
}
