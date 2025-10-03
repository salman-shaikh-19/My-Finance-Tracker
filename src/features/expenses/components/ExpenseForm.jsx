import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import { expenseCategories, paymentMethods } from "../../../utils/Categories";
const ExpenseForm=({handleSubmit,initialValues,isEdit = false})=>{
    const defaultValues = {
    amount: "",
    expenseCategory: "",
    expenseDate: new Date().toISOString().slice(0, 10),
    expenseMethod: "",
    note: "",
  };
    return (
        <>
   <h1 className="text-center">{isEdit ? "Edit Expense" : "Add Expense"}</h1>
          <Formik
            initialValues={initialValues || defaultValues}
            validationSchema={Yup.object({
              amount: Yup.number()
                .required("Amount is required")
                .positive("Amount must be positive"),
              expenseCategory: Yup.string().required("Category is required"),
              expenseDate: Yup.date().required("Expense date is required").max(new Date(), "Expense date cannot be in the future"),
              expenseMethod: Yup.string().required("Method is required"),
              note: Yup.string()
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
                    name="amount"
                    placeholder="Expense amount"
                    className="input input-bordered w-full "
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm mt-1 "
                  />
                </div>

                <div>
                  <label className="label ">Category</label>
                  <Field
                    as="select"
                    name="expenseCategory"
                    className="select select-bordered w-full "
                  >
                    <option value="">Select Category</option>
                    {expenseCategories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="expenseCategory"
                    component="div"
                    className="text-red-500 text-sm mt-1 "
                  />
                </div>

                <div>
                  <label className="label ">Date</label>
                  <Field
                    type="date"
                    name="expenseDate"
                    className="input input-bordered w-full "
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <ErrorMessage
                    name="expenseDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="label">Method</label>
                  <Field
                    as="select"
                    name="expenseMethod"
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.name} value={method.name}>
                        {method.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="expenseMethod"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                 <div>
                  <label className="label">Note (optional)</label>
                  <Field
                    as="textarea"
                    name="note"
                    placeholder="Add a note for this expense..."
                    className="textarea textarea-bordered w-full "
                     maxLength={255}
                    rows={3}
                  />
                </div>

                <button
                title={isEdit ? 'Update expense':'Add expense'}
                  type="submit"
                  className="btn btn-primary w-full mt-4 "
                  disabled={isSubmitting}
                >
                    {isSubmitting ? (
                <>
                  <span className="loading loading-spinner "></span>{" "}
                  {isEdit ? "Updating Expense..." : "Adding Expense..."}
                </>
              ) : (
                isEdit ? "Update Expense" : "Add Expense"
              )}
                </button>
              </Form>
            )}
          </Formik>
        </>
    )
}

export default React.memo(ExpenseForm);