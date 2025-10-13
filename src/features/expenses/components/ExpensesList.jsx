import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
// import { commonDate } from "../../../utils/dateUtils";
import {
  expenseCategories,
  getCategoryByName,
  paymentMethods,
} from "../../../utils/Categories";
import ExpenseCard from "./ExpenseCard";
import ExpenseChart from "./ExpenseChart";
import { deleteExpense, updateExpense } from "../expensesSlice";

import CategoryTotalAmountCard from "../../common/components/CategoryTotalAmountCard";

import { confirmDelete } from "../../../utils/confirmDelete";
import { handleFormSubmit } from "../../../utils/handleFormSubmit";
import NoDataFound from "../../common/components/NoDataFound";
import isRecent from "../../../utils/isRecent";
const ExpensesList = ({ expenses, expenseTotalAmountByCategory }) => {
  const { userCurrency } = useSelector((state) => state.common);
  const editModelRef = useRef(null);

  const dispatch = useDispatch();

  const handleDelete = (expenseId) => {
    confirmDelete({
      itemName: "expense",
      onDelete: () => dispatch(deleteExpense(expenseId)),
    });
  };

  const editExpenseHandler = (values, { resetForm, setSubmitting }) => {
    const { id, amount, expenseCategory, expenseDate, expenseMethod, note } =
      values;
    // console.log(incomeNote);

    handleFormSubmit({
      action: (payload) => dispatch(updateExpense(payload)),
      payload: {
        id,
        updatedData: {
          amount,
          expense_category: expenseCategory,
          expense_date: expenseDate,
          payment_method: expenseMethod,
          expense_note: note,
        },
      },
      resetForm,
      setSubmitting,
      editModelRef,
      successMessage: "Expense updated successfully",
      errorMessage: "Error while updating expense",
    });
  };
  return (
    <>
      <div
        id="expenses-list"
        className="overflow-auto min-h-[70vh] max-h-[85vh] sm:h-[890px] scrollbar-hide mx-5  "
      >
        <ExpenseChart />
        <div className="divider text-lg font-semibold">
          Total Expenses by Category
        </div>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-1">

          {expenseCategories.map((category, i) => {
            const Icon = category.icon;
            const totalAmount =
              expenseTotalAmountByCategory[category.name] || 0;

            return (
              <CategoryTotalAmountCard
                key={i}
                name={category.name}
                totalAmount={totalAmount}
                Icon={Icon}
                userCurrency={userCurrency}
                bg={category.bg}
              />
            );
          })}
        </div>

        <div
          className="divider"
          title={`Total ${
            expenses.length
              ? "expenses " + expenses.length
              : "expense " + expenses.length
          }`}
        >
          Expenses ({expenses.length})
        </div>
        {expenses.length ? (
          <CustomInfiniteScroll
            pageSize={20}
            data={expenses}
            scrollTargetId="expenses-list"
            endMsg={expenses.length ? "You have seen all expense data " : ""}
          >
            {(items) => (
              // <div className="flex flex-wrap gap-1 lg:pl-4 justify-center sm:justify-start">
              <div className="container mx-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {items.map((item) => {
                    const category = getCategoryByName(
                      expenseCategories,
                      item.expense_category
                    );
                    const Icon = category.icon;
                    const paymentMethod = getCategoryByName(
                      paymentMethods,
                      item.payment_method
                    );
                    const PaymentIcon = paymentMethod.icon;

                    return (
                      <ExpenseCard
                        key={item.id}
                        expenseId={item.id}
                        deleteExpense={() => handleDelete(item.id)}
                        category={category.name}
                        amount={item.amount}
                        type={item.payment_method}
                        date={item.expense_date}
                        bgColor={category.bg}
                        Icon={Icon}
                        isNew={isRecent(item.created_at)}
                        note={item.expense_note}
                        // userCurrency={userCurrency}
                        editModelRef={editModelRef}
                        editExpenseHandler={editExpenseHandler}
                        PaymentIcon={PaymentIcon}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </CustomInfiniteScroll>
        ) : (
          <>
            <NoDataFound NoDataFoundFor="expense" />
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(ExpensesList);
