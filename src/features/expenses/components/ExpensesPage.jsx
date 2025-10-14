import React, { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import Main from "../../common/layouts/Main";
// import ExpensesList from "./ExpensesList";
const ExpensesList = lazy(() => import("./ExpensesList"));
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";
import { addExpense, getAllExpenses } from "../expensesSlice";

import CommonModal from "../../common/components/CommonModal";

import { toast } from "react-toastify";

import { BiPlus } from "react-icons/bi";
import ExpenseForm from "./ExpenseForm";
import Loader from "../../common/components/Loader";
import dayjs from "dayjs";
import _ from "lodash";
import { getTotalByGroup } from "../../../utils/aggregateUtils";
import { handleFormSubmit } from "../../../utils/handleFormSubmit";

// import Swal from "sweetalert2";

const ExpensesPage = () => {
  const { loggedInUserId, expenseLimit } = useSelector((state) => state.common);
  const { expenses } = useSelector((state) => state.expenses);
  // const warningShownRef = useRef(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const LIMIT = expenseLimit || 10000;
  const WARNING_THRESHOLD = 0.9;
  const warningShownRef = useRef({ warningShown: false, errorShown: false });
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
      !warningShownRef.current.warningShown
    ) {
      toast.warning(
        `You have spent ${total} today, which is over 90% of your daily expense limit (${LIMIT}).`,
        { autoClose: false }
      );
      warningShownRef.current.warningShown = true;
    }

    // error for exceeding 100% of limit
    if (total >= LIMIT && !warningShownRef.current.errorShown) {
      toast.error(
        `You have exceeded your daily expense limit of ${LIMIT}. Total spent: ${total} `,
        { autoClose: false }
      );
      warningShownRef.current.errorShown = true;
    }
    // reset flags if total goes below 90%
    if (total < LIMIT * WARNING_THRESHOLD) {
      warningShownRef.current.warningShown = false;
      warningShownRef.current.errorShown = false;
    }
  }, [expenses, LIMIT]);

  //total sum of amount by category
const totalAmountByCategory =useMemo(() => {
   return getTotalByGroup(expenses, "expense_category", "amount");
}, [expenses]);

// console.log(counts);
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
  handleFormSubmit({
    action: (payload) => dispatch(addExpense(payload)),
    payload: {
      userId: loggedInUserId,
      amount: values.amount,
      category: values.expenseCategory,
      date: values.expenseDate,
      method: values.expenseMethod,
      expense_note: values.note,
    },
    resetForm,
    setSubmitting,
    modalRef,
    successMessage: "Expense added successfully",
    errorMessage: "Error while adding expense",
  });
};
  return (
    <>
      <Main mainClassName="relative ">
        {/* <ExpensesList userId={loggedInUserId} expenses={expenses} /> */}
        <Suspense
          fallback={
            <Loader />

            // <></>
          }
        >
          <ExpensesList expenseTotalAmountByCategory={totalAmountByCategory} expenses={expenses} />
        </Suspense>
        <CommonModal
          ref={modalRef}
          modalId="expense-add-modal"
          openModalBtnClassName="
          btn-circle btn-sm md:btn-md lg:btn-lg 
          fixed z-50 shadow-md bg-primary text-white 
          hover:bg-primary/80 transition-all duration-200
          top-0 right-3 
          md:top-0 md:right-6 
          lg:top-auto lg:bottom-8 lg:right-8 
        "
          openModalBtnText={
            <>
              <BiPlus size={30} className="inline mr-1 " />
            </>
          }
        >
          <ExpenseForm handleSubmit={handleSubmit} />
        </CommonModal>
      </Main>
    </>
  );
};

export default React.memo(ExpensesPage);
