"use client";

import { useState, type FormEvent } from "react";

export interface CampusConfig {
  key: string;
  label: string;
  feeInr: number;
  theme: string;
  grades: string[];
}

/**
 * Online registration form.
 *
 * Field set and single-column layout follow the legacy `admission-online.php`
 * so the paperwork the office receives is unchanged, but it renders inside this
 * site's own header and footer with the school's type and colours.
 *
 * The fee shown here is display-only. The amount actually charged is resolved
 * server-side from the school key — posting a different figure changes nothing.
 */

const FIELDS = {
  name: "", father_name: "", father_occupation: "", mother_name: "",
  mother_occupation: "", gender: "", category: "", caste: "", religion: "",
  aadhar_card: "", mobile: "", email: "", dob_day: "", dob_month: "",
  dob_year: "", place_birth: "", address: "", state: "", district: "",
  pin_code: "", residential: "", physically: "", name_previous_school: "",
  medium_previous_school: "", income_parents: "", name_sibling: "",
  class_sibling: "", classname: "",
};

type Fields = typeof FIELDS;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const input =
  "w-full rounded border border-sand bg-white px-3 py-2.5 text-sm text-text-base font-dm outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15";
const labelCls = "block text-sm font-medium text-text-base font-dm mb-1.5";

function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>
        {label} {required && <span className="text-crimson">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-crimson font-dm">{error}</p>}
    </div>
  );
}

export default function ApplyClient({ campus }: { campus: CampusConfig }) {
  const [data, setData] = useState<Fields>({ ...FIELDS });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const v = e.target.value;
      setData((p) => ({ ...p, [k]: v }));
      setErrors((p) => {
        if (!p[k]) return p;
        const n = { ...p }; delete n[k]; return n;
      });
    };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!agreed) {
      setFormError("Please confirm you have read the instructions.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admission-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school: campus.key,
          className: data.classname,
          name: data.name,
          fatherName: data.father_name,
          fatherOccupation: data.father_occupation,
          motherName: data.mother_name,
          motherOccupation: data.mother_occupation,
          gender: data.gender,
          category: data.category,
          caste: data.caste,
          religion: data.religion,
          aadharCard: data.aadhar_card,
          mobile: data.mobile,
          email: data.email,
          dobDay: data.dob_day,
          dobMonth: data.dob_month,
          dobYear: data.dob_year,
          placeBirth: data.place_birth,
          address: data.address,
          state: data.state,
          district: data.district,
          pinCode: data.pin_code,
          residential: data.residential,
          physically: data.physically,
          namePreviousSchool: data.name_previous_school,
          mediumPreviousSchool: data.medium_previous_school,
          incomeParents: data.income_parents,
          nameSibling: data.name_sibling,
          classSibling: data.class_sibling,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setErrors(mapErrors(payload.errors ?? {}));
        setFormError(payload.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      window.location.href = payload.redirectUrl;
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <section>
        <img
          src="/assets/img/registration-banner.jpg"
          alt=""
          className="w-full object-cover max-h-[320px]"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </section>

      <section className="py-14 lg:py-20 bg-off-white">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="bg-crimson text-white text-center rounded py-7 px-6 mb-8">
            <h1 className="font-serif text-3xl lg:text-4xl text-white">Registration / Admission</h1>
            <p className="mt-2 text-white/90 font-dm text-sm">Online form are available.</p>
          </div>

          <div className="text-center mb-10 font-dm text-text-light space-y-3 text-sm leading-relaxed">
            <p>To apply for admission in Seedling Schools, please fill the admission form below.</p>
            <p>
              Seedling Public School &amp; Seedling International Academy: 0141-3623000, 7413012351
              <br />
              Seedling Modern High School &amp; Seedling Modern International Academy: 7412044410, 7413012352, 0141-7194000
            </p>
            <h2 className="font-serif text-xl text-navy pt-2">
              Admission are open for all classes : Play Group to IX and XI
            </h2>
            <p className="max-w-4xl mx-auto">
              Seedling Schools CBSE, have a glorious reputation of imparting quality education to
              students. We also offer international curriculums in our international branches. We
              create and nurture students enabling them to form their own unique perspective and
              personality. At Seedling your child will learn the Art of Life in a stress-free
              environment backed with a student centric syllabus, with activities that boost
              self-esteem and confidence.
            </p>
          </div>

          <div className="mx-auto max-w-3xl bg-white border border-sand rounded-lg p-6 lg:p-10">
            {formError && (
              <p role="alert" className="mb-6 rounded border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm text-crimson font-dm">
                {formError}
              </p>
            )}

            <form onSubmit={onSubmit} noValidate className="space-y-5">
              {/* Fixed by the site the parent is on, so it's shown as a value
                  rather than a control they can't actually change. */}
              <div>
                <span className={labelCls}>School</span>
                <p className="rounded border border-sand bg-navy-light px-3 py-2.5 text-sm font-semibold text-text-base font-dm">
                  {campus.label}
                </p>
              </div>

              <Field id="fee" label="Fee" required>
                <input
                  id="fee"
                  className={`${input} bg-navy-light font-semibold`}
                  value={`₹${campus.feeInr.toLocaleString("en-IN")}`}
                  readOnly
                />
              </Field>

              <Field id="classname" label="Select Class" required error={errors.classname}>
                <select id="classname" className={input} value={data.classname} onChange={set("classname")}>
                  <option value="">Select</option>
                  {campus.grades.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </Field>

              <Field id="name" label="Name of Student" required error={errors.name}>
                <input id="name" className={input} value={data.name} onChange={set("name")} />
              </Field>
              <Field id="father_name" label="Father's Name" required error={errors.father_name}>
                <input id="father_name" className={input} value={data.father_name} onChange={set("father_name")} />
              </Field>
              <Field id="father_occupation" label="Father's Occupation" error={errors.father_occupation}>
                <input id="father_occupation" className={input} value={data.father_occupation} onChange={set("father_occupation")} />
              </Field>
              <Field id="mother_name" label="Mother's Name" required error={errors.mother_name}>
                <input id="mother_name" className={input} value={data.mother_name} onChange={set("mother_name")} />
              </Field>
              <Field id="mother_occupation" label="Mother's Occupation" error={errors.mother_occupation}>
                <input id="mother_occupation" className={input} value={data.mother_occupation} onChange={set("mother_occupation")} />
              </Field>

              <Field id="gender" label="Gender" required error={errors.gender}>
                <select id="gender" className={input} value={data.gender} onChange={set("gender")}>
                  <option value="">Select</option>
                  {["Male", "Female", "Other"].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </Field>
              <Field id="category" label="Category" required error={errors.category}>
                <select id="category" className={input} value={data.category} onChange={set("category")}>
                  <option value="">Select</option>
                  {["General", "OBC", "SC", "ST", "EWS"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field id="caste" label="Caste" error={errors.caste}>
                <input id="caste" className={input} value={data.caste} onChange={set("caste")} />
              </Field>
              <Field id="religion" label="Religion" error={errors.religion}>
                <input id="religion" className={input} value={data.religion} onChange={set("religion")} />
              </Field>
              <Field id="aadhar_card" label="Aadhaar Card Number" error={errors.aadhar_card}>
                <input id="aadhar_card" inputMode="numeric" className={input} value={data.aadhar_card} onChange={set("aadhar_card")} />
              </Field>

              <Field id="mobile" label="Mobile Number" required error={errors.mobile}>
                <input id="mobile" inputMode="tel" placeholder="10-digit number" className={input} value={data.mobile} onChange={set("mobile")} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" inputMode="email" className={input} value={data.email} onChange={set("email")} />
              </Field>

              <div>
                <label className={labelCls}>
                  Date of Birth <span className="text-crimson">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input aria-label="Day" placeholder="DD" inputMode="numeric" className={input} value={data.dob_day} onChange={set("dob_day")} />
                  <select aria-label="Month" className={input} value={data.dob_month} onChange={set("dob_month")}>
                    <option value="">Month</option>
                    {MONTHS.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
                  </select>
                  <input aria-label="Year" placeholder="YYYY" inputMode="numeric" className={input} value={data.dob_year} onChange={set("dob_year")} />
                </div>
                {(errors.dob_day || errors.dob_month || errors.dob_year) && (
                  <p className="mt-1 text-xs text-crimson font-dm">
                    {errors.dob_day ?? errors.dob_month ?? errors.dob_year}
                  </p>
                )}
              </div>

              <Field id="place_birth" label="Place of Birth" error={errors.place_birth}>
                <input id="place_birth" className={input} value={data.place_birth} onChange={set("place_birth")} />
              </Field>
              <Field id="address" label="Address" required error={errors.address}>
                <textarea id="address" rows={3} className={input} value={data.address} onChange={set("address")} />
              </Field>
              <Field id="state" label="State" required error={errors.state}>
                <input id="state" className={input} value={data.state} onChange={set("state")} />
              </Field>
              <Field id="district" label="District" required error={errors.district}>
                <input id="district" className={input} value={data.district} onChange={set("district")} />
              </Field>
              <Field id="pin_code" label="PIN Code" required error={errors.pin_code}>
                <input id="pin_code" inputMode="numeric" className={input} value={data.pin_code} onChange={set("pin_code")} />
              </Field>

              <Field id="residential" label="Day Scholar / Hosteller" error={errors.residential}>
                <select id="residential" className={input} value={data.residential} onChange={set("residential")}>
                  <option value="">Select</option>
                  {["Day Scholar", "Hosteller"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field id="physically" label="Physically Challenged" error={errors.physically}>
                <select id="physically" className={input} value={data.physically} onChange={set("physically")}>
                  <option value="">Select</option>
                  {["No", "Yes"].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </Field>

              <Field id="name_previous_school" label="Name of Previous School" error={errors.name_previous_school}>
                <input id="name_previous_school" className={input} value={data.name_previous_school} onChange={set("name_previous_school")} />
              </Field>
              <Field id="medium_previous_school" label="Medium of Previous School" error={errors.medium_previous_school}>
                <select id="medium_previous_school" className={input} value={data.medium_previous_school} onChange={set("medium_previous_school")}>
                  <option value="">Select</option>
                  {["English", "Hindi", "Other"].map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field id="income_parents" label="Annual Income of Parents" error={errors.income_parents}>
                <input id="income_parents" className={input} value={data.income_parents} onChange={set("income_parents")} />
              </Field>
              <Field id="name_sibling" label="Name of Sibling (if studying here)" error={errors.name_sibling}>
                <input id="name_sibling" className={input} value={data.name_sibling} onChange={set("name_sibling")} />
              </Field>
              <Field id="class_sibling" label="Class of Sibling" error={errors.class_sibling}>
                <input id="class_sibling" className={input} value={data.class_sibling} onChange={set("class_sibling")} />
              </Field>

              <div className="text-center pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-text-base font-dm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="size-4 accent-navy"
                  />
                  I have read the instructions to fill the form.
                </label>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-dark text-white font-dm font-semibold px-10 py-3 rounded hover:bg-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Please wait…" : "Submit"}
                </button>
                <p className="mt-3 text-xs text-text-light font-dm">
                  You&apos;ll be taken to a secure payment page for ₹
                  {campus.feeInr.toLocaleString("en-IN")}.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

/** The API reports camelCase field names; the form uses the legacy snake_case ids. */
function mapErrors(apiErrors: Record<string, string>): Record<string, string> {
  const map: Record<string, string> = {
    className: "classname", fatherName: "father_name",
    fatherOccupation: "father_occupation", motherName: "mother_name",
    motherOccupation: "mother_occupation", aadharCard: "aadhar_card",
    dobDay: "dob_day", dobMonth: "dob_month", dobYear: "dob_year",
    placeBirth: "place_birth", pinCode: "pin_code",
    namePreviousSchool: "name_previous_school",
    mediumPreviousSchool: "medium_previous_school",
    incomeParents: "income_parents", nameSibling: "name_sibling",
    classSibling: "class_sibling",
  };
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(apiErrors)) out[map[k] ?? k] = v;
  return out;
}
