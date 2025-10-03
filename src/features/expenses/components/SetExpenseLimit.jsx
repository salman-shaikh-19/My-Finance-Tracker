import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";

import * as Yup from "yup";
const SetExpenseLimit=({handleSubmit})=>{
    const expenseLimit=useSelector(state=>state.common.expenseLimit)
    return (
        <>
          <h1 className="text-center "> Set Expense Limit</h1>
          <Formik
            initialValues={{
              expenseLimit: expenseLimit || "",
             
            }}
            validationSchema={Yup.object({
              expenseLimit: Yup.number()
                .required("Amount is required")
                .positive("Amount must be positive "),
             
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 mt-4">
                <div>
                  <label className="label ">Expense Limit</label>
                  <Field
                    type="number"
                    name="expenseLimit"
                    placeholder="Expense limit amount"
                    className="input input-bordered w-full  "
                  />
                  <ErrorMessage
                    name="expenseLimit"
                    component="div"
                    className="text-red-500 text-sm mt-1  "
                  />
                </div>


                <button
                  type="submit"
                  className="btn btn-primary w-full mt-4  "   
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span> Setting
                      Expense Limit...
                    </>
                  ) : (
                    "Set Expense Limit  "
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </>
    )
}

export default React.memo(SetExpenseLimit);