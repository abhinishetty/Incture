import React, { useState } from "react";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const departmentOptions = [
  { value: "Engineering", label: "Engineering" },
  { value: "HR", label: "HR" },
  { value: "Sales", label: "Sales" },
];
const locationOptions = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Delhi", label: "Delhi" },
];
const relationOptions = [
  { value: "Parent", label: "Parent" },
  { value: "Sibling", label: "Sibling" },
  { value: "Spouse", label: "Spouse" },
  { value: "Friend", label: "Friend" },
  { value: "Other", label: "Other" },
];

// Validation schemas per step
const validationSchemas = [
  Yup.object({
    name: Yup.string().min(3, "Min 3 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "10 digits only")
      .required("Required"),
    dob: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Must be at least 18"
      )
      .required("Required"),
    profilePhoto: Yup.mixed().required("Profile photo is required"),
  }),
  Yup.object({
    employeeId: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Alphanumeric only")
      .required("Required"),
    department: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    joiningDate: Yup.date()
      .min(new Date(new Date().setHours(0, 0, 0, 0)), "Cannot be in the past")

      .required("Required"),
    workLocation: Yup.string().required("Required"),
  }),
  Yup.object({
    bankAccount: Yup.string()
      .matches(/^\d{9,18}$/, "9-18 digits")
      .required("Required"),
    ifsc: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC")
      .required("Required"),
    pan: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN")
      .required("Required"),
    upi: Yup.string()
      .nullable()
      .notRequired()
      .test(
        "upi-check",
        "Invalid UPI ID",
        (val) => !val || /^.+@.+$/.test(val)
      ),
  }),
  Yup.object({
    emergencyContacts: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().min(3, "Min 3 characters").required("Required"),
          relation: Yup.string().required("Required"),
          phone: Yup.string()
            .matches(/^\d{10}$/, "10 digits only")
            .required("Required"),
        })
      )
      .min(1, "At least one emergency contact required"),
  }),
  Yup.object({
    documents: Yup.array()
      .of(
        Yup.mixed()
          .test("fileFormat", "Only PDFs allowed", (file) =>
            file ? file.type === "application/pdf" : false
          )
          .required()
      )
      .min(1, "At least one document required")
      .max(5, "Max 5 documents"),
  }),
  Yup.object(), // No extra validation for review step
];

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      // Step 1
      name: "",
      email: "",
      phone: "",
      dob: "",
      profilePhoto: null,
      // Step 2
      employeeId: "",
      department: "",
      role: "",
      joiningDate: "",
      workLocation: "",
      // Step 3
      bankAccount: "",
      ifsc: "",
      pan: "",
      upi: "",
      // Step 4
      emergencyContacts: [
        { name: "", relation: "", phone: "" },
      ],
      // Step 5
      documents: [],
    },
    validationSchema: validationSchemas[step - 1],
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      alert("Registration successful!\n" + JSON.stringify(values, null, 2));
      // Reset or do something after submit
    },
  });

  // Handle profile photo upload & preview
  const handlePhotoChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("profilePhoto", file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
    else setPhotoPreview(null);
  };

  // Handle document uploads
  const handleDocumentChange = (e) => {
    const files = Array.from(e.currentTarget.files);
    const currentFiles = formik.values.documents || [];
    const availableSlots = 5 - currentFiles.length;
    const filesToAdd = files.slice(0, availableSlots);
    formik.setFieldValue("documents", [...currentFiles, ...filesToAdd]);
  };

  const removeDocument = (index) => {
    const docs = [...formik.values.documents];
    docs.splice(index, 1);
    formik.setFieldValue("documents", docs);
  };

  const nextStep = async () => {
    try {
      await formik.validateForm();
      const errors = formik.errors;
      // Check if there are errors in current step fields
      if (Object.keys(errors).length === 0) {
        setStep((s) => Math.min(s + 1, 6));
      } else {
        formik.setTouched(
          Object.keys(errors).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          )
        );
      }
    } catch {
      // ignore
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Collapsible summary state
  const [collapsedSections, setCollapsedSections] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleCollapse = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Employee Onboarding</h1>
      <ProgressBar step={step} />

      <form onSubmit={formik.handleSubmit}>
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <>
            <h2>Personal Details</h2>

            <div>
              <label>Name:</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label>Phone:</label>
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div style={{ color: "red" }}>{formik.errors.phone}</div>
              )}
            </div>

            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dob && formik.errors.dob && (
                <div style={{ color: "red" }}>{formik.errors.dob}</div>
              )}
            </div>

            <div>
              <label>Profile Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                onBlur={() => formik.setFieldTouched("profilePhoto", true)}
              />
              {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                <div style={{ color: "red" }}>{formik.errors.profilePhoto}</div>
              )}
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  style={{ width: 100, height: 100, objectFit: "cover", marginTop: 10 }}
                />
              )}
            </div>
          </>
        )}

        {/* Step 2: Job Details */}
        {step === 2 && (
          <>
            <h2>Job Details</h2>

            <div>
              <label>Employee ID:</label>
              <input
                name="employeeId"
                value={formik.values.employeeId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.employeeId && formik.errors.employeeId && (
                <div style={{ color: "red" }}>{formik.errors.employeeId}</div>
              )}
            </div>

            <div>
              <label>Department:</label>
              <select
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {formik.touched.department && formik.errors.department && (
                <div style={{ color: "red" }}>{formik.errors.department}</div>
              )}
            </div>

            <div>
              <label>Role/Designation:</label>
              <input
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.role && formik.errors.role && (
                <div style={{ color: "red" }}>{formik.errors.role}</div>
              )}
            </div>

            <div>
              <label>Joining Date:</label>
              <input
                type="date"
                name="joiningDate"
                value={formik.values.joiningDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.joiningDate && formik.errors.joiningDate && (
                <div style={{ color: "red" }}>{formik.errors.joiningDate}</div>
              )}
            </div>

            <div>
              <label>Work Location:</label>
              <select
                name="workLocation"
                value={formik.values.workLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Location</option>
                {locationOptions.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
              {formik.touched.workLocation && formik.errors.workLocation && (
                <div style={{ color: "red" }}>{formik.errors.workLocation}</div>
              )}
            </div>
          </>
        )}

        {/* Step 3: Bank Details */}
        {step === 3 && (
          <>
            <h2>Bank Details</h2>

            <div>
              <label>Bank Account Number:</label>
              <input
                name="bankAccount"
                value={formik.values.bankAccount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bankAccount && formik.errors.bankAccount && (
                <div style={{ color: "red" }}>{formik.errors.bankAccount}</div>
              )}
            </div>

            <div>
              <label>IFSC Code:</label>
              <input
                name="ifsc"
                value={formik.values.ifsc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ifsc && formik.errors.ifsc && (
                <div style={{ color: "red" }}>{formik.errors.ifsc}</div>
              )}
            </div>

            <div>
              <label>PAN Number:</label>
              <input
                name="pan"
                value={formik.values.pan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pan && formik.errors.pan && (
                <div style={{ color: "red" }}>{formik.errors.pan}</div>
              )}
            </div>

            <div>
              <label>UPI ID (optional):</label>
              <input
                name="upi"
                value={formik.values.upi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.upi && formik.errors.upi && (
                <div style={{ color: "red" }}>{formik.errors.upi}</div>
              )}
            </div>
          </>
        )}

        {/* Step 4: Emergency Contacts */}
        {step === 4 && (
          <>
            <h2>Emergency Contacts</h2>
            <FieldArray
              name="emergencyContacts"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: 15,
                        padding: 10,
                        border: "1px solid #ddd",
                        borderRadius: 4,
                      }}
                    >
                      <div>
                        <label>Name:</label>
                        <input
                          name={`emergencyContacts[${index}].name`}
                          value={contact.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.emergencyContacts &&
                          formik.touched.emergencyContacts[index] &&
                          formik.touched.emergencyContacts[index].name &&
                          formik.errors.emergencyContacts &&
                          formik.errors.emergencyContacts[index] &&
                          formik.errors.emergencyContacts[index].name && (
                            <div style={{ color: "red" }}>
                              {formik.errors.emergencyContacts[index].name}
                            </div>
                          )}
                      </div>

                      <div>
                        <label>Relation:</label>
                        <select
                          name={`emergencyContacts[${index}].relation`}
                          value={contact.relation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select</option>
                          {relationOptions.map((r) => (
                            <option key={r.value} value={r.value}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                        {formik.touched.emergencyContacts &&
                          formik.touched.emergencyContacts[index] &&
                          formik.touched.emergencyContacts[index].relation &&
                          formik.errors.emergencyContacts &&
                          formik.errors.emergencyContacts[index] &&
                          formik.errors.emergencyContacts[index].relation && (
                            <div style={{ color: "red" }}>
                              {formik.errors.emergencyContacts[index].relation}
                            </div>
                          )}
                      </div>

                      <div>
                        <label>Phone:</label>
                        <input
                          name={`emergencyContacts[${index}].phone`}
                          value={contact.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.emergencyContacts &&
                          formik.touched.emergencyContacts[index] &&
                          formik.touched.emergencyContacts[index].phone &&
                          formik.errors.emergencyContacts &&
                          formik.errors.emergencyContacts[index] &&
                          formik.errors.emergencyContacts[index].phone && (
                            <div style={{ color: "red" }}>
                              {formik.errors.emergencyContacts[index].phone}
                            </div>
                          )}
                      </div>

                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        disabled={formik.values.emergencyContacts.length === 1}
                      >
                        Remove Contact
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({ name: "", relation: "", phone: "" })
                    }
                  >
                    Add Contact
                  </button>
                  {formik.errors.emergencyContacts && typeof formik.errors.emergencyContacts === "string" && (
                    <div style={{ color: "red" }}>{formik.errors.emergencyContacts}</div>
                  )}
                </div>
              )}
            />
          </>
        )}

        {/* Step 5: Document Upload */}
        {step === 5 && (
          <>
            <h2>Document Upload (PDF only, max 5)</h2>
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleDocumentChange}
            />
            <div style={{ marginTop: 10 }}>
              {formik.values.documents.map((doc, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 10px",
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 4,
                  }}
                >
                  <span>{doc.name}</span>
                  <button type="button" onClick={() => removeDocument(i)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {formik.touched.documents && formik.errors.documents && (
              <div style={{ color: "red" }}>{formik.errors.documents}</div>
            )}
          </>
        )}

        {/* Step 6: Review & Submit */}
        {step === 6 && (
          <>
            <h2>Review & Submit</h2>

            {[1, 2, 3, 4, 5].map((sectionNum) => {
              let title = "";
              let content = null;

              switch (sectionNum) {
                case 1:
                  title = "Personal Details";
                  content = (
                    <div>
                      <b>Name:</b> {formik.values.name} <br />
                      <b>Email:</b> {formik.values.email} <br />
                      <b>Phone:</b> {formik.values.phone} <br />
                      <b>DOB:</b> {formik.values.dob} <br />
                      <b>Profile Photo:</b>{" "}
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile"
                          style={{ width: 80, height: 80, objectFit: "cover" }}
                        />
                      ) : (
                        "No photo"
                      )}
                    </div>
                  );
                  break;
                case 2:
                  title = "Job Details";
                  content = (
                    <div>
                      <b>Employee ID:</b> {formik.values.employeeId} <br />
                      <b>Department:</b> {formik.values.department} <br />
                      <b>Role:</b> {formik.values.role} <br />
                      <b>Joining Date:</b> {formik.values.joiningDate} <br />
                      <b>Work Location:</b> {formik.values.workLocation} <br />
                    </div>
                  );
                  break;
                case 3:
                  title = "Bank Details";
                  content = (
                    <div>
                      <b>Account Number:</b> {formik.values.bankAccount} <br />
                      <b>IFSC:</b> {formik.values.ifsc} <br />
                      <b>PAN:</b> {formik.values.pan} <br />
                      <b>UPI:</b> {formik.values.upi || "(none)"} <br />
                    </div>
                  );
                  break;
                case 4:
                  title = "Emergency Contacts";
                  content = formik.values.emergencyContacts.map((c, i) => (
                    <div key={i} style={{ marginBottom: 5 }}>
                      <b>{c.name}</b> ({c.relation}) - {c.phone}
                    </div>
                  ));
                  break;
                case 5:
                  title = "Documents";
                  content = formik.values.documents.length
                    ? formik.values.documents.map((doc, i) => (
                        <div key={i}>{doc.name}</div>
                      ))
                    : "No documents uploaded";
                  break;
                default:
                  break;
              }

              return (
                <div
                  key={sectionNum}
                  style={{
                    border: "1px solid #ccc",
                    marginBottom: 10,
                    borderRadius: 5,
                    padding: 10,
                    cursor: "pointer",
                    backgroundColor: "#f9f9f9",
                  }}
                  onClick={() => setStep(sectionNum)}
                >
                  <h3>
                    {title} (click to edit)
                  </h3>
                  {collapsedSections[sectionNum] && <div>{content}</div>}
                </div>
              );
            })}
          </>
        )}

        <div style={{ marginTop: 20 }}>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}
          {step < 6 && (
            <button type="button" onClick={nextStep} style={{ marginLeft: 10 }}>
              Next
            </button>
          )}
          {step === 6 && (
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              style={{ marginLeft: 10 }}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ProgressBar({ step }) {
  return (
    <div
      style={{
        marginBottom: 20,
        background: "#eee",
        borderRadius: 5,
        overflow: "hidden",
        height: 10,
      }}
    >
      <div
        style={{
          width: `${(step / 6) * 100}%`,
          height: "100%",
          backgroundColor: "#4caf50",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}
