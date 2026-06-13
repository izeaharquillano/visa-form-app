"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface Applicant {
  surname: string;
  firstname: string;
  sex: string;
  birthdate: string;
  birthplace: string;
  citizenship: string;
  address: string;
  contact: string;
  occupation: string;
  employmentAddress: string;
  father: string;
  mother: string;
  civilStatus: string;
  spouse: string;
  spouseCitizenship: string;
}

export interface Passport {
  number: string;
  issuedDate: string;
  expiryDate: string;
  issuedBy: string;
}

export interface Child {
  name: string;
  age: string;
  relationship: string;
}

export interface Sponsor {
  name: string;
  address: string;
  contact: string;
}

export interface ApplicationInfo {
  portOfEntry: string;
  stayLength: string;
  entryPurpose: string;
  ageAtApplication: string;
  companionName: string;
  destinationAfterPH: string;
}

export interface VisaHistory {
  hasPastVisa: boolean;
  visaType: string;
  visaIssuedBy: string;
  visaIssuedDate: string;
  stayDuration: string;
  entryDate: string;
  exitDate: string;
}

export interface FormData {
  applicant: Applicant;
  passport: Passport;
  children: Child[];
  sponsor: Sponsor;
  applicationInfo: ApplicationInfo;
  visaHistory: VisaHistory | null;
  documents: string[];
}

const defaultForm: FormData = {
  applicant: {
    surname: "",
    firstname: "",
    sex: "",
    birthdate: "",
    birthplace: "",
    citizenship: "",
    address: "",
    contact: "",
    occupation: "",
    employmentAddress: "",
    father: "",
    mother: "",
    civilStatus: "",
    spouse: "",
    spouseCitizenship: "",
  },
  passport: {
    number: "",
    issuedDate: "",
    expiryDate: "",
    issuedBy: "",
  },
  children: [],
  sponsor: { name: "", address: "", contact: "" },
  applicationInfo: {
    portOfEntry: "",
    stayLength: "",
    entryPurpose: "",
    ageAtApplication: "",
    companionName: "",
    destinationAfterPH: "",
  },
  visaHistory: null,
  documents: [],
};

interface FormContextValue {
  form: FormData;
  setApplicant: (data: Applicant) => void;
  setPassport: (data: Passport) => void;
  setChildren: (data: Child[]) => void;
  setSponsor: (data: Sponsor) => void;
  setApplicationInfo: (data: ApplicationInfo) => void;
  setVisaHistory: (data: VisaHistory | null) => void;
  setDocuments: (data: string[]) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<FormData>(defaultForm);

  const setApplicant = (data: Applicant) =>
    setForm((prev) => ({ ...prev, applicant: data }));

  const setPassport = (data: Passport) =>
    setForm((prev) => ({ ...prev, passport: data }));

  const setChildren = (data: Child[]) =>
    setForm((prev) => ({ ...prev, children: data }));

  const setSponsor = (data: Sponsor) =>
    setForm((prev) => ({ ...prev, sponsor: data }));

  const setApplicationInfo = (data: ApplicationInfo) =>
    setForm((prev) => ({ ...prev, applicationInfo: data }));

  const setVisaHistory = (data: VisaHistory | null) =>
    setForm((prev) => ({ ...prev, visaHistory: data }));

  const setDocuments = (data: string[]) =>
    setForm((prev) => ({ ...prev, documents: data }));

  const resetForm = () => setForm(defaultForm);

  return (
    <FormContext.Provider
      value={{
        form,
        setApplicant,
        setPassport,
        setChildren,
        setSponsor,
        setApplicationInfo,
        setVisaHistory,
        setDocuments,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
}
