import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
import IncomeCard from "./IncomeCard";
import { deleteIncome, updateIncome, } from "../incomeSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CategoryTotalAmountCard from "../../common/components/CategoryTotalAmountCard";
import { getCategoryByName, incomeCategories } from "../../../utils/Categories";
import IncomeChart from "./IncomeChart";

const IncomeList = ({ incomes, incomeTotalAmountByCategory }) => {
  const { userCurrency, theme } = useSelector((state) => state.common);
  const editModelRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = (incomeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This income will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIncome(incomeId));
        Swal.fire("Deleted!", "Income record deleted.", "success");
      }
    });
  };

  const editIncomeHandler = (values, { resetForm, setSubmitting }) => {
    const { id, incomeCategory, incomeAmount, recievedOn, note } = values;

    dispatch(
      updateIncome({
        id,
        updatedData: {
          income_category: incomeCategory,
          income_amount: incomeAmount,
          received_on: recievedOn,
          income_note: note,
        },
      })
    )
      .then(() => {
        toast.success("Income updated successfully!");
        resetForm();
        editModelRef.current?.close();
      })
      .catch((err) => toast.error("Error updating income: " + err))
      .finally(() => setSubmitting(false));
  };

  return (
    <div
      id="incomes-list"
      className="overflow-auto min-h-[70vh] max-h-[85vh] sm:h-[890px] scrollbar-hide mx-5"
    >
           <IncomeChart
            />
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
              theme={theme}
              bg={category.bg}
            />
          );
        })}
      </div>

      <div className="divider">Incomes</div>
      {incomes.length ? (
        <CustomInfiniteScroll
          pageSize={20}
          data={incomes}
          scrollTargetId="incomes-list"
          endMsg="You have seen all income records"
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
                    userCurrency={userCurrency}
                    theme={theme}
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
        <div className="flex justify-center items-center h-40">
          <span className="alert alert-info alert-soft">
            No income data found
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(IncomeList);
