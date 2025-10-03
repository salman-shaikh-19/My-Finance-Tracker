import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import { incomeCategories } from "../../../utils/Categories";
const IncomeForm=({handleSubmit,initialValues,isEdit = false})=>{
    const defaultValues = {
    incomeAmount: "",
    incomeCategory: "",
    recievedOn: new Date().toISOString().slice(0, 10),

    incomeNote: "",
  };
    return (
        <>
   <h1 className="text-center">{isEdit ? "Edit Income" : "Add Income"}</h1>
          <Formik
            initialValues={initialValues || defaultValues}
            validationSchema={Yup.object({
              incomeAmount: Yup.number()
                .required("Amount is required")
                .positive("Amount must be positive"),
              incomeCategory: Yup.string().required("Category is required"),
              recievedOn: Yup.date().required("Income date is required").max(new Date(), "Income date cannot be in the future"),
             
              incomeNote: Yup.string()
              .max(255, "Note cannot exceed 255 characters")
              .nullable(),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 mt-4">
                <div>
                  <label className="label ">Amount</label>
                  <Field
                    type="number"
                    name="incomeAmount"
                    placeholder="Income amount"
                    className="input input-bordered w-full "
                  />
                  <ErrorMessage
                    name="incomeAmount"
                    component="div"
                    className="text-red-500 text-sm mt-1 "
                  />
                </div>

                <div>
                  <label className="label ">Category</label>
                  <Field
                    as="select"
                    name="incomeCategory"
                    className="select select-bordered w-full "
                  >
                    <option value="">Select Category</option>
                    {incomeCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="incomeCategory"
                    component="div"
                    className="text-red-500 text-sm mt-1 "
                  />
                </div>

                <div>
                  <label className="label ">Received Date</label>
                  <Field
                    type="date"
                    name="recievedOn"
                    className="input input-bordered w-full "
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <ErrorMessage
                    name="recievedOn"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

            
                 <div>
                  <label className="label">Note (optional)</label>
                  <Field
                    as="textarea"
                    name="incomeNote"
                    placeholder="Add a note for this income..."
                    className="textarea textarea-bordered w-full "
                    maxLength={255}
                    rows={3}
                  />
                </div>

                <button
                title={isEdit ? 'Update income':'Add income'}
                  type="submit"
                  className="btn btn-primary w-full mt-4 "
                  disabled={isSubmitting}
                >
                    {isSubmitting ? (
                <>
                  <span className="loading loading-spinner "></span>{" "}
                  {isEdit ? "Updating income..." : "Adding income..."}
                </>
              ) : (
                isEdit ? "Update income" : "Add income"
              )}
                </button>
              </Form>
            )}
          </Formik>
        </>
    )
}

export default React.memo(IncomeForm);