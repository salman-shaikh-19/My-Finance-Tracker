import React, { lazy, Suspense, useEffect, useRef } from "react";
import Main from "../../common/layouts/Main";
const InvestmentList = lazy(() => import("./InvestmentList"));
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";


import CommonModal from "../../common/components/CommonModal";

import { BiPlus } from "react-icons/bi";
import Loader from "../../common/components/Loader";

import _ from "lodash";


import { handleFormSubmit } from "../../../utils/handleFormSubmit";
import { addInvestment, getAllInvestments } from "../investmentsSlice";
import InvestmentForm from "./InvestmentForm";

const InvestmentPage = () => {
  const { loggedInUserId } = useSelector((state) => state.common);
  const { investments } = useSelector((state) => state.investments);
  const modalRef = useRef(null);
  const dispatch = useDispatch();



  // initial fetch
  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllInvestments({ userId: loggedInUserId }));
  }, [dispatch, loggedInUserId]);

  // realtime subscription
  useRealtimeTable(
    "user_investments",
    { column: "user_id", value: loggedInUserId },
    () => dispatch(getAllInvestments({ userId: loggedInUserId }))
  );


  const handleSubmit = (values, { resetForm, setSubmitting }) => {
  handleFormSubmit({
    action: (payload) => dispatch(addInvestment(payload)),
    payload: {
      user_id: loggedInUserId,
        investment_category: values.investmentCategory,
        invested_amount: values.investedAmount,
        start_date: values.startDate,
        maturity_date: values.maturityDate,
        investment_note: values.investmentNote,
    },
    resetForm,
    setSubmitting,
    modalRef,
    successMessage: "Investment added successfully",
    errorMessage: "Error while add investment",
  });
};

  return (
    <Main mainClassName="relative">
      <Suspense fallback={<Loader />}>
        <InvestmentList
  
          investments={investments}
        />
      </Suspense>

      <CommonModal
        ref={modalRef}
        modalId="investment-add-modal"
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
        <InvestmentForm handleSubmit={handleSubmit} />
      </CommonModal>
    </Main>
  );
};

export default React.memo(InvestmentPage);
