import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
// import { commonDate } from "../../../utils/dateUtils";
import {
  expenseCategories,
  getCategoryByName,
} from "../../../utils/Categories";
import ExpenseCard from "./ExpenseCard";
import ExpenseChart from "./ExpenseChart";
import { deleteExpense, updateExpense } from "../expensesSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
// import { useRealtimeTable } from "../../../services/useRealtimeTable";

const ExpensesList = ({ expenses }) => {
  const { userCurrency, theme } = useSelector((state) => state.common);
  const editModelRef = useRef(null);
  const dispatch = useDispatch();
  const handleDelete = (expenseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete function here
        dispatch(deleteExpense(expenseId));

        Swal.fire("Deleted!", "Your expense has been deleted.", "success");
      }
    });
  };

  const editExpenseHandler = (values, { resetForm, setSubmitting }) => {
    const { id, amount, expenseCategory, expenseDate, expenseMethod, note } =
      values;

    dispatch(
      updateExpense({
        id,
        updatedData: {
          amount,
          expense_category: expenseCategory,
          expense_date: expenseDate,
          payment_method: expenseMethod,
          expense_note: note,
        },
      })
    )
      .then(() => {
        toast.success("Expense updated successfully");
        resetForm();
        editModelRef.current?.close();
      })
      .catch((err) => {
        toast.error("Error while updating expense: " + err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div
        id="expenses-list"
        className="overflow-auto min-h-[70vh] max-h-[85vh] sm:h-[890px] scrollbar-hide mx-5"
      >
        <ExpenseChart expenses={expenses} />

        <CustomInfiniteScroll
          pageSize={20}
          data={expenses}
          scrollTargetId="expenses-list"
          endMsg={expenses.length ? "You have seen all expense data" : ""}
        >
          {(items) => (
            <div className="flex flex-wrap gap-1 lg:pl-4">
              {items.map((item) => {
                const category = getCategoryByName(
                  expenseCategories,
                  item.expense_category
                );
                const Icon = category.icon;

                return (
                  <ExpenseCard
                    key={item.id}
                    expenseId={item.id}
                    deleteExpense={() => handleDelete(item.id)}
                    category={category.name}
                    amount={item.amount}
                    theme={theme}
                    type={item.payment_method}
                    date={item.expense_date}
                    bgColor={category.bg}
                    Icon={Icon}
                    createdAt={item.created_at}
                    note={item.expense_note}
                    userCurrency={userCurrency}
                    editModelRef={editModelRef}
                    editExpenseHandler={editExpenseHandler}
                  />
                );
              })}
            </div>
          )}
        </CustomInfiniteScroll>
      </div>
    </>
  );
};

export default React.memo(ExpensesList);
