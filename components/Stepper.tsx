import { Fragment } from "react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { num: 1, label: "Applicant Info", zh: "申请人信息" },
  { num: 2, label: "Application Info", zh: "申请信息" },
  { num: 3, label: "Supporting Docs", zh: "证明文件" },
  { num: 4, label: "Review", zh: "预览" },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="visa-header">
      <h1>APPLICATION FOR NON-IMMIGRANT VISA TO THE PHILIPPINES</h1>
      <h2>菲律宾非移民签证申请表</h2>

      <div className="stepper">
        {steps.map((s, i) => (
          <Fragment key={s.num}>
            {i > 0 && (
              <div className={`line ${i < currentStep ? "active-line" : ""}`} />
            )}
            <div className={`step ${i < currentStep ? "active" : ""}`}>
              <div className="circle">{s.num}</div>
              <p>{s.label}</p>
              <span>{s.zh}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
