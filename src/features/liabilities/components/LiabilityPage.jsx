import React, { lazy, Suspense, useEffect, useRef } from "react";
import Main from "../../common/layouts/Main";
// import   LiabilityList from "./ LiabilityList";
const LiabilityList = lazy(() => import("./LiabilityList"));
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";

import CommonModal from "../../common/components/CommonModal";

import { BiPlus } from "react-icons/bi";
import Loader from "../../common/components/Loader";

import _ from "lodash";

import { handleFormSubmit } from "../../../utils/handleFormSubmit";
import LiabilityForm from "./LiabilityForm";
import { addLiability, getAllLiabilities } from "../liabilitySlice";

// import Swal from "sweetalert2";

const LiabilityPage = () => {
  const { loggedInUserId } = useSelector((state) => state.common);
  const { liabilities } = useSelector((state) => state.liabilities);
  // const warningShownRef = useRef(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  //group by category and get total amount by category
  // const counts = useMemo(() => {
  //   return getTotalByGroup(expenses, "category", "amount");
  // }, [expenses]);

  // console.log(counts);
  useEffect(() => {
    if (!loggedInUserId) return;
    // dispatch(getAllExpenses(loggedInUserId));
    dispatch(getAllLiabilities({ userId: loggedInUserId }));
  }, [dispatch, loggedInUserId]);

  //custom hook
  useRealtimeTable(
    "user_liabilities", //pasing table name
    { column: "user_id", value: loggedInUserId },
    () => dispatch(getAllLiabilities({ userId: loggedInUserId }))
    // () => dispatch(getAllExpenses(loggedInUserId))
  );

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    handleFormSubmit({
      action: (payload) => dispatch(addLiability(payload)),
      payload: {
        userId: loggedInUserId,
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
      resetForm,
      setSubmitting,
      modalRef,
      successMessage: "liability added successfully",
      errorMessage: "Error while adding liability",
    });
  };
  return (
    <>
      <Main mainClassName="relative ">
        {/* < LiabilityList userId={loggedInUserId} expenses={expenses} /> */}
        <Suspense
          fallback={
            <Loader />

            // <></>
          }
        >
          <LiabilityList liabilites={liabilities} />
        </Suspense>
        <CommonModal
          ref={modalRef}
          modalId="liability-add-modal"
          openModalBtnClassName="
          btn-circle btn-sm md:btn-md lg:btn-lg 
          fixed z-50 shadow-md bg-primary text-white 
          hover:bg-primary/80 transition-all duration-200
          top-0 right-0 
          md:top-auto md:right-6 
          lg:top-auto lg:bottom-8 lg:right-8
        "
          openModalBtnText={
            <>
              <BiPlus size={30} className="inline mr-1 " />
            </>
          }
        >
          <LiabilityForm handleSubmit={handleSubmit} />
        </CommonModal>
      </Main>
    </>
  );
};

export default React.memo(LiabilityPage);
