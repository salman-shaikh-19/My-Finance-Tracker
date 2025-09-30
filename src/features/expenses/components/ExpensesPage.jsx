import React, { lazy, Suspense, useEffect, useRef } from "react";
import Main from "../../common/layouts/Main";
// import ExpensesList from "./ExpensesList";
const ExpensesList = lazy(() => import("./ExpensesList"));
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";
import { addExpense, getAllExpenses } from "../expensesSlice";

import CommonModal from "../../common/components/CommonModal";

import { toast } from "react-toastify";

import { BiPlus } from "react-icons/bi";
import AddExpense from "./AddExpense";
import Loader from "../../common/components/Loader";
import dayjs from "dayjs";
import _ from "lodash";

const ExpensesPage = () => {
  const { loggedInUserId,expenseLimit } = useSelector((state) => state.common);
  const { expenses } = useSelector((state) => state.expenses);
  // const warningShownRef = useRef(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const LIMIT = expenseLimit || 10000;
  const WARNING_THRESHOLD = 0.9;
  const warningShownRef = useRef({ warningDate: null, errorDate: null });
  // console.log(expenseLimit);
  
  useEffect(() => {
    if (!LIMIT) return; 
    const todayKey = dayjs().format("YYYY-MM-DD");
    const todayExpenses = _.filter(
      expenses,
      (e) => e.expense_date === todayKey
    );
    const total = _.sumBy(todayExpenses, "amount");

    // Warning for 90%–99% of limit
    if (
      total >= LIMIT * WARNING_THRESHOLD &&
      total < LIMIT &&
      warningShownRef.current.warningDate !== todayKey
    ) {
      toast.warning(
        `Warning! You have spent ${total} today, which is over 90% of your daily limit (${LIMIT}).`,
        { autoClose: false }
      );
      warningShownRef.current.warningDate = todayKey; // mark warning as shown for today
    }

    // error for exceeding 100% of limit
    if (total >= LIMIT && warningShownRef.current.errorDate !== todayKey) {
      toast.error(
        `Alert! You have exceeded your daily expense limit of ${LIMIT}. Total spent: ${total}.`,
        { autoClose: false }
      );
      warningShownRef.current.errorDate = todayKey; // mark error as shown for today
    }
  }, [expenses,LIMIT]);

  useEffect(() => {
    if (!loggedInUserId) return;
    // dispatch(getAllExpenses(loggedInUserId));
    dispatch(getAllExpenses({ userId: loggedInUserId }));
  }, [dispatch, loggedInUserId]);

  //custom hook
  useRealtimeTable(
    "user_expenses", //pasing table name
    { column: "user_id", value: loggedInUserId },
    () => dispatch(getAllExpenses({ userId: loggedInUserId }))
    // () => dispatch(getAllExpenses(loggedInUserId))
  );

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(
      addExpense({
        userId: loggedInUserId,
        amount: values.amount,
        category: values.expenseCategory,
        date: values.expenseDate,
        method: values.expenseMethod,
        expense_note: values.note,
      })
    )
      // .unwrap() //  note: unwrap the thunk to catch rejected errors
      .then(() => {
        toast.success("Expense added successfully");
        resetForm();
        modalRef.current?.close();
      })
      .catch((err) => {
        toast.error("Error while adding expense: " + err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <Main mainClassName="relative">
        {/* <ExpensesList userId={loggedInUserId} expenses={expenses} /> */}
        <Suspense
          fallback={
            <Loader />

            // <></>
          }
        >
          <ExpensesList userId={loggedInUserId} expenses={expenses} />
        </Suspense>
        <CommonModal
          ref={modalRef}
          modalId="expense-add-modal"
          openModalBtnClassName="
          fab fab-flower
          absolute
          right-0
          top-4    
          md:top-auto 
          md:bottom-4 
          text-xl
        "
          openModalBtnText={
            <>
              <BiPlus size={30} className="inline mr-1" />
            </>
          }
        >
          <AddExpense handleSubmit={handleSubmit} />
        </CommonModal>
      </Main>
    </>
  );
};

export default React.memo(ExpensesPage);
