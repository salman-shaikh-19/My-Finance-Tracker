import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import { investmentCategories } from "../../../utils/Categories";
const InvestmentForm=({handleSubmit,initialValues,isEdit = false})=>{
    const defaultValues = {
    investmentCategory: "",
    investedAmount: "",
    startDate: new Date().toISOString().slice(0, 10),
    maturityDate: new Date().toISOString().slice(0, 10),
    
    investmentNote: "",
  };
    return (
        <>
   <h1 className="text-center">{isEdit ? "Edit Investment" : "Add Investment"}</h1>
          <Formik
            initialValues={initialValues || defaultValues}
            validationSchema={Yup.object({
              investedAmount: Yup.number()
                .required("Amount is required")
                .positive("Amount must be positive"),
              investmentCategory: Yup.string().required("Category is required"),
              startDate: Yup.date().required("Investment date is required").max(new Date(), "Investment date cannot be in the future"),
             maturityDate: Yup.date().min(
                Yup.ref('startDate'),
                "Maturity date cannot be before investment date"
              ).nullable(),
              investmentNote: Yup.string()
              .max(200, "Note cannot exceed 200 characters")
              .nullable(),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 mt-4">
                <div>
                  <label className="label ">Investment Amount</label>
                  <Field
                    type="number"
                    name="investedAmount"
                    placeholder="Investment amount"
                    className="input input-bordered w-full "
                  />
                  <ErrorMessage
                    name="investedAmount"
                    component="div"
                    className="text-red-500 text-sm mt-1 "
                  />
                </div>

                <div>
                  <label className="label ">Category</label>
                  <Field
                    as="select"
                    name="investmentCategory"
                    className="select select-bordered w-full "
                  >
                    <option value="">Select Category</option>
                    {investmentCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="investmentCategory"
                    component="div"
                    className="text-red-500 text-sm mt-1 "
                  />
                </div>

                <div>
                  <label className="label ">Investment Date</label>
                  <Field
                    type="date"
                    name="startDate"
                    className="input input-bordered w-full "
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="label ">Maturity Date</label>
                  <Field
                    type="date"
                    name="maturityDate"
                    className="input input-bordered w-full "
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  <ErrorMessage
                    name="maturityDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
            
                 <div>
                  <label className="label">Note (optional)</label>
                  <Field
                    as="textarea"
                    name="investmentNote"
                    placeholder="Add a note for this investment..."
                    className="textarea textarea-bordered w-full "
                    maxLength={255}
                    rows={3}
                  />
                </div>

                <button
                title={isEdit ? 'Update investment':'Add investment'}
                  type="submit"
                  className="btn btn-primary w-full mt-4 "
                  disabled={isSubmitting}
                >
                    {isSubmitting ? (
                <>
                  <span className="loading loading-spinner "></span>{" "}
                  {isEdit ? "Updating investment..." : "Adding investment..."}
                </>
                  ) : (
                    isEdit ? "Update investment" : "Add investment"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </>
    )
}

export default React.memo(InvestmentForm);