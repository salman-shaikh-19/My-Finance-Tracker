import React, { useEffect } from "react";
import Main from "../../common/layouts/Main";
import ExpensesList from "./ExpensesList";
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";
import { addExpense, getAllExpenses } from "../expensesSlice";
import ExpenseChart from "./ExpenseChart";
import CommonModal from "../../common/components/CommonModal";
import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";
import { expenseCategories, paymentMethods } from "../../../utils/Categories";
import { BiPlus } from "react-icons/bi";
const ExpensesPage = () => {
  const { loggedInUserId } = useSelector((state) => state.common);
  const { expenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllExpenses(loggedInUserId));
  }, [dispatch, loggedInUserId]);

  //custom hook
  useRealtimeTable(
    "user_expenses", //pasing table name
    { column: "user_id", value: loggedInUserId },
    () => dispatch(getAllExpenses(loggedInUserId))
  );

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(
      addExpense({
        userId: loggedInUserId,
        amount: values.amount,
        category: values.expenseCategory,
        date: values.expenseDate,
        method: values.expenseMethod,
      })
    )
      // .unwrap() // <- IMPORTANT: unwrap the thunk to catch rejected errors
      .then((res) => {
        toast.success("Expense added successfully!");
        resetForm();
      })
      .catch((err) => {
        toast.error("Error adding expense: " + err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <Main mainClassName="relative">
        <ExpensesList userId={loggedInUserId} expenses={expenses} />
        <CommonModal
          modalId="expense-add-edit-modal"
        openModalBtnClassName="
          fab fab-flower
          absolute
          right-4
          top-24    
          md:top-auto 
          md:bottom-4 
          text-lg
          btn-primary
        "


          openModalBtnText={
            <>
              <BiPlus className="inline mr-1" />
            </>
          }
        >
          <h1 className="text-center"> Add expense</h1>
          <Formik
            initialValues={{
              amount: "",
              expenseCategory: "",
              expenseDate: new Date().toISOString().slice(0, 10),
              expenseMethod: "",
            }}
            validationSchema={Yup.object({
              amount: Yup.number()
                .required("Amount is required")
                .positive("Amount must be positive"),
              expenseCategory: Yup.string().required("Category is required"),
              expenseDate: Yup.date().required("Date is required"),
              expenseMethod: Yup.string().required("Method is required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="label">Amount</label>
                  <Field
                    type="number"
                    name="amount"
                    placeholder="Expense amount"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="label">Category</label>
                  <Field
                    as="select"
                    name="expenseCategory"
                    className="select select-bordered w-full"
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
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="label">Date</label>
                  <Field
                    type="date"
                    name="expenseDate"
                    className="input input-bordered w-full"
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

                <button
                  type="submit"
                  className="btn btn-primary w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span> Adding
                      Expense...
                    </>
                  ) : (
                    "Add Expense"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </CommonModal>
      </Main>
    </>
  );
};

export default React.memo(ExpensesPage);
