import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
import IncomeCard from "./IncomeCard";
import { deleteIncome, updateIncome } from "../incomeSlice";
import CategoryTotalAmountCard from "../../common/components/CategoryTotalAmountCard";
import { getCategoryByName, incomeCategories } from "../../../utils/Categories";
import IncomeChart from "./IncomeChart";
import { handleFormSubmit } from "../../../utils/handleFormSubmit";
import { confirmDelete } from "../../../utils/confirmDelete";
import NoDataFound from "../../common/components/NoDataFound";

const IncomeList = ({ incomes, incomeTotalAmountByCategory }) => {
  const { userCurrency } = useSelector((state) => state.common);
  const editModelRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = (incomeId) => {
    confirmDelete({
      itemName: "income",
      onDelete: () => dispatch(deleteIncome(incomeId)),
    });
  };

  const editIncomeHandler = (values, { resetForm, setSubmitting }) => {
    const { id, incomeCategory, incomeAmount, recievedOn, incomeNote } = values;
    // console.log(incomeNote);

    handleFormSubmit({
      action: (payload) => dispatch(updateIncome(payload)),
      payload: {
        id,
        updatedData: {
          income_category: incomeCategory,
          income_amount: incomeAmount,
          received_on: recievedOn,
          income_note: incomeNote,
        },
      },
      resetForm,
      setSubmitting,
      editModelRef,
      successMessage: "Income updated successfully",
      errorMessage: "Error while updating income",
    });
  };
  return (
    <div
      id="incomes-list"
      className="overflow-auto min-h-[70vh] max-h-[85vh] sm:h-[890px] scrollbar-hide mx-5"
    >
      <IncomeChart />
      <div className="divider">Total Incomes by Category</div>

      <div className="flex flex-wrap justify-around sm:justify-normal md:justify-normal lg:justify-around xl:justify-evenly gap-2 mb-4">
        {incomeCategories.map((category, i) => {
          const Icon = category.icon;

          const totalAmount = incomeTotalAmountByCategory[category.name] || 0;
          return (
            <CategoryTotalAmountCard
              key={i}
              name={category.name}
              Icon={Icon}
              totalAmount={totalAmount}
              userCurrency={userCurrency}
             
              bg={category.bg}
            />
          );
        })}
      </div>

      <div className="divider" title={`Total ${incomes.length ? 'incomes '+incomes.length : 'income '+incomes.length}`}>Incomes ({incomes.length})</div>
      {incomes.length ? (
        <CustomInfiniteScroll
          pageSize={20}
          data={incomes}
          scrollTargetId="incomes-list"
          endMsg="You have seen all income data"
        >
          {(items) => (
            <div className="flex flex-wrap gap-1 lg:pl-4 justify-center sm:justify-start">
              {items.map((income) => {
                const category = getCategoryByName(
                  incomeCategories,
                  income.income_category
                );
                const Icon = category.icon;
             

                return (
                  <IncomeCard
                    key={income.id}
                    incomeId={income.id}
                    category={income.income_category}
                    amount={income.income_amount}
                    date={income.received_on}
                    createdAt={income.created_at}
                    note={income.income_note}
                    // userCurrency={userCurrency}
                    bgColor={category.bg}
                    deleteIncome={() => handleDelete(income.id)}
                    editModelRef={editModelRef}
                    editIncomeHandler={editIncomeHandler}
                    Icon={Icon}
                 
                  />
                );
              })}
            </div>
          )}
        </CustomInfiniteScroll>
      ) : (
       <NoDataFound NoDataFoundFor="income" />
      )}
    </div>
  );
};

export default React.memo(IncomeList);
