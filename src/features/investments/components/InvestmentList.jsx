import React, { lazy, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";

import {
  getCategoryByName,
  investmentCategories,
} from "../../../utils/Categories";

import { handleFormSubmit } from "../../../utils/handleFormSubmit";
import { confirmDelete } from "../../../utils/confirmDelete";
import NoDataFound from "../../common/components/NoDataFound";
import { deleteInvestment, updateInvestment } from "../investmentsSlice";
import InvestmentCard from "./InvestmentCard";
import Loader from "../../common/components/Loader";
import ExportButtons from '../../common/components/ExportButtons'
import isRecent from "../../../utils/isRecent";
// import InvestmentChart from "./InvestmentChart";
import CardSkeleton from "../../common/components/CardSkeleton";
const InvestmentChart = lazy(() => import("./InvestmentChart"));
const InvestmentList = ({ investments }) => {
  const { loading } = useSelector((state) => state.investments);
  const editModelRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = (investmentId) => {
    confirmDelete({
      itemName: "investment",
      onDelete: () => dispatch(deleteInvestment(investmentId)),
    });
  };

  const editInvestmentHandler = (values, { resetForm, setSubmitting }) => {
    const { id } = values;
    // console.log(incomeNote);

    handleFormSubmit({
      action: (payload) => dispatch(updateInvestment(payload)),
      payload: {
        id,
        updatedData: {
          investment_category: values.investmentCategory,
          invested_amount: values.investedAmount,
          start_date: values.startDate,
          maturity_date: values.maturityDate,
          investment_note: values.investmentNote,
        },
      },
      resetForm,
      setSubmitting,
      editModelRef,
      successMessage: "Investment updated successfully",
      errorMessage: "Error while updating investment",
    });
  };
  return (
    <div
      id="investment-list"
      className="    overflow-auto 
          h-[calc(100vh-4rem)]      /* full viewport minus header height */
          sm:h-[calc(100vh-5rem)]   /* adjust for small screen screens if nav height diffrernt */
          md:h-[calc(100vh-0)]      /* full height for desktop if no bottom nav */
          scrollbar-hide 
          mx-0 
          pb-20  "
    >
      <Suspense fallback={<Loader />}>
        <InvestmentChart />
      </Suspense>
      {/* <div className="divider">Total Investments by Category</div> */}
   

      <div
        className="divider"
        title={`Total ${
          investments.length
            ? "investments " + investments.length
            : "investment " + investments.length
        }`}
      >
        Investments ({investments.length})
      </div>
      {investments.length ? (
        <CustomInfiniteScroll
          pageSize={20}
          data={investments}
          scrollTargetId="investments-list"
          endMsg="You have seen all investments data"
        >
          {(items) => (
            <div className="container mx-auto p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                {items.map((investment) => {
                  const category = getCategoryByName(
                    investmentCategories,
                    investment.investment_category
                  );
                  const Icon = category.icon;

                  return (
                 <>
                    {loading ? <CardSkeleton key={investment.id} additionalClass="w-half" /> : (
                    <InvestmentCard
                      key={investment.id}
                      investmentId={investment.id}
                      category={investment.investment_category}
                      amount={investment.invested_amount}
                      date={investment.start_date}
                      maturityDate={investment.maturity_date}
                      // createdAt={investment.created_at}
                      isNew={isRecent(investment.created_at)}
                      note={investment.investment_note}
                      bgColor={category.bg}
                      deleteinvestment={() => handleDelete(investment.id)}
                      editModelRef={editModelRef}
                      editInvestmentHandler={editInvestmentHandler}
                      Icon={Icon}
                    />
                  )}
                 </>
                 
                  )
                })}
              </div>
            </div>
          )}
        </CustomInfiniteScroll>
      ) : (
        <NoDataFound NoDataFoundFor="investments" />
      )}
    </div>
  );
};

export default React.memo(InvestmentList);
