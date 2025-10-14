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
import isRecent from "../../../utils/isRecent";

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
      className="    overflow-auto 
      h-[calc(100vh-4rem)]      /* full viewport minus header height */
      sm:h-[calc(100vh-5rem)]   /* adjust for small screen screens if nav height diffrernt */
      md:h-[calc(100vh-0)]      /* full height for desktop if no bottom nav */
      scrollbar-hide 
      mx-0 
      pb-20  "
    >
      <IncomeChart />
      <div className="divider">Total Incomes by Category</div>

      {/* <div className="flex flex-wrap justify-around sm:justify-normal md:justify-normal lg:justify-around xl:justify-evenly gap-2 mb-4"> */}
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-1">
      
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
            // <div className="flex flex-wrap gap-1 lg:pl-4 justify-center sm:justify-start">
                        <div className="container mx-auto p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
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
                    isNew={isRecent(income.created_at)}
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
