import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import { liabilitesCategories } from "../../../utils/Categories";
const LiabilityForm = ({ handleSubmit, initialValues, isEdit = false }) => {
  const defaultValues = {
    creditorName: "",
    totalAmount: "",
    remainingAmount: "",
    interestRate: "0",
    liabilityType: "",
    paymentSchedule: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    liabilityNote: "",
  };

  return (
    <>
      <h1 className="text-center">
        {isEdit ? "Edit liability" : "Add liability"}
      </h1>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={Yup.object({
          creditorName: Yup.string().required("Creditor name is required"),
          totalAmount: Yup.number()
            .required("Total amount is required")
            .nullable()
            .positive("Amount must be positive"),
          remainingAmount: Yup.number()
            .required("Remaining amount is required")
            .nullable()
            .test(
              "is-positive",
              "Remaining amount must be greater than 0",
              (value) => value === null || value === 0 || value > 0
            )
            .max(
              Yup.ref("totalAmount"),
              "Remaining amount cannot exceed total amount"
            ),

          interestRate: Yup.number()
            .nullable()
            .test(
              "is-positive-or-zero",
              "Interest rate cannot be negative",
              (value) => value === null || value >= 0
            )
            .max(100, "Interest rate cannot exceed 100%"),
          liabilityType: Yup.string().required("Liability type is required"),
          paymentSchedule: Yup.string().required(
            "Payment schedule is required"
          ),
          startDate: Yup.date()
            .required("Start date is required")
            .max(new Date(), "Start date cannot be in the future"),
          endDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("startDate"), "End date cannot be before start date"),

          liabilityNote: Yup.string()
            .max(255, "Note cannot exceed 255 characters")
            .nullable(),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 mt-4">
            <div>
              <label className="label ">Creditor Name</label>
              <Field
                type="text"
                name="creditorName"
                placeholder="Creditor Name"
                className="input input-bordered  w-full "
              />
              <ErrorMessage
                name="creditorName"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div>
              <label className="label ">Total Amount</label>
              <Field
                type="number"
                name="totalAmount"
                placeholder="Total Amount"
                className="input input-bordered w-full "
              />
              <ErrorMessage
                name="totalAmount"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div>
              <label className="label ">Remaining Amount</label>
              <Field
                type="number"
                name="remainingAmount"
                placeholder="Remaining Amount"
                className="input input-bordered w-full "
              />
              <ErrorMessage
                name="remainingAmount"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div>
              <label className="label ">Interest Rate (%)</label>
              <Field
                type="number"
                name="interestRate"
                placeholder="Interest Rate"
                className="input input-bordered w-full "
              />
              <ErrorMessage
                name="interestRate"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div>
              <label className="label ">Liability Type</label>
              <Field
                as="select"
                name="liabilityType"
                className="select select-bordered w-full "
              >
                <option value="">Select Liability Type</option>
                {liabilitesCategories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="liabilityType"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div>
              <label className="label ">Payment Schedule</label>
              <Field
                as="select"
                name="paymentSchedule"
                className="select select-bordered w-full "
              >
                <option value="">Select Payment Schedule</option>

                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>

                <option value="No Payment Schedule">No Payment Schedule</option>
              </Field>
              <ErrorMessage
                name="paymentSchedule"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div>
              <label className="label ">Start Date</label>
              <Field
                type="date"
                name="startDate"
                className="input input-bordered w-full "
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label className="label ">End Date</label>
              <Field
                type="date"
                name="endDate"
                className="input input-bordered w-full "
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label className="label">Note (optional)</label>
              <Field
                as="textarea"
                name="liabilityNote"
                placeholder="Add a note"
                className="textarea textarea-bordered w-full "
                rows={3}
              />
              <ErrorMessage
                name="liabilityNote"
                component="div"
                className="text-red-500 text-sm mt-1 "
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isEdit ? "Update Liability" : "Add Liability"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default React.memo(LiabilityForm);
