import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
// import { commonDate } from "../../../utils/dateUtils";
import {
  liabilitesCategories,
  getCategoryByName,
} from "../../../utils/Categories";

import { confirmDelete } from "../../../utils/confirmDelete";
import { handleFormSubmit } from "../../../utils/handleFormSubmit";
import { deleteLiability, updatedLiability } from "../liabilitySlice";
import LiabilityCard from "./LiabilityCard";
import LiabilityChart from "./LiabilityChart";
import NoDataFound from "../../common/components/NoDataFound";
import isRecent from "../../../utils/isRecent";
import CardSkeleton from "../../common/components/CardSkeleton";
// import { useRealtimeTable } from "../../../services/useRealtimeTable";

const LiabilityList = ({ liabilites }) => {
  // const { userCurrency } = useSelector((state) => state.common);
  const { loading } = useSelector((state) => state.liabilities);
  const editModelRef = useRef(null);

  const dispatch = useDispatch();

  const handleDelete = (liabilityId) => {
    confirmDelete({
      itemName: "liabilites",
      onDelete: () => dispatch(deleteLiability(liabilityId)),
    });
  };
  // console.log(userCurrency);
  const editLiabilityHandler = (values, { resetForm, setSubmitting }) => {
    const { id } = values;
    console.log(id);

    handleFormSubmit({
      action: (payload) => dispatch(updatedLiability(payload)),
      payload: {
        id,
        updatedData: {
          creditor_name: values.creditorName,
          total_amount: values.totalAmount,
          remaining_amount: values.remainingAmount,
          interest_rate: values.interestRate,
          liability_type: values.liabilityType,
          payment_schedule: values.paymentSchedule,
          start_date: values.startDate,
          end_date: values.endDate,
          liability_note: values.liabilityNote,
        },
      },
      resetForm,
      setSubmitting,
      editModelRef,
      successMessage: "Liability updated successfully",
      errorMessage: "Error while updating liability",
    });
  };
  return (
    <>
      <div
        id="liabilites-list"
        className="    overflow-auto 
        h-[calc(100vh-4rem)]      /* full viewport minus header height */
        sm:h-[calc(100vh-5rem)]   /* adjust for small screen screens if nav height diffrernt */
        md:h-[calc(100vh-0)]      /* full height for desktop if no bottom nav */
        scrollbar-hide 
        mx-0 
        pb-20   "
      >
        <LiabilityChart />
        <div
          className="divider"
          title={`Total ${
            liabilites.length
              ? "liabilites " + liabilites.length
              : "liability " + liabilites.length
          }`}
        >
          Liabilites ({liabilites.length})
        </div>
        {liabilites.length ? (
          <CustomInfiniteScroll
            pageSize={20}
            data={liabilites}
            scrollTargetId="liabilites-list"
            endMsg={
              liabilites.length ? "You have seen all liabilites data " : ""
            }
          >
            {(items) => (
              // <div className="flex flex-wrap gap-1 lg:pl-4 justify-center sm:justify-start">
              <div className="container mx-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  {items.map((item) => {
                    const category = getCategoryByName(
                      liabilitesCategories,
                      item.liability_type
                    );
                    const Icon = category.icon;
                    // const paymentMethod = getCategoryByName(
                    //   paymentMethods,
                    //   item.payment_method
                    // );
                    // const PaymentIcon = paymentMethod.icon;

                    return (
                      <>
                       {loading ? <CardSkeleton key={item.id} additionalClass="w-half" /> : (
                       <LiabilityCard
                        key={item.id}
                        liabilityId={item.id}
                        deleteExpense={() => handleDelete(item.id)}
                        creditorName={item.creditor_name}
                        totalAmount={item.total_amount}
                        liabilityType={item.liability_type}
                        startDate={item.start_date}
                        endDate={item.end_date}
                        interestRate={item.interest_rate}
                        remainingAmount={item.remaining_amount}
                        paymentSchedule={item.payment_schedule}
                        bgColor={category.bg}
                        Icon={Icon}
                        // createdAt={item.created_at}
                        isNew={isRecent(item.created_at)}
                        liabilityNote={item.liability_note}
                        // userCurrency={userCurrency}
                        editModelRef={editModelRef}
                        editLiabilityHandler={editLiabilityHandler}
                        // PaymentIcon={PaymentIcon}
                      />
                      )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </CustomInfiniteScroll>
        ) : (
          <>
            <NoDataFound NoDataFoundFor="liability" />
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(LiabilityList);
