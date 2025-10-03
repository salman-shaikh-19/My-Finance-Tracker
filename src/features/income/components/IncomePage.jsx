import React, { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import Main from "../../common/layouts/Main";
const IncomeList = lazy(() => import("./IncomeList"));
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";
import { addIncome, getAllIncomes } from "../incomeSlice";

import CommonModal from "../../common/components/CommonModal";
import { toast } from "react-toastify";
import { BiPlus } from "react-icons/bi";
import Loader from "../../common/components/Loader";

import _ from "lodash";
import { getTotalByGroup } from "../../../utils/aggregateUtils";
import IncomeForm from "./IncomeForm";

const IncomePage = () => {
  const { loggedInUserId } = useSelector((state) => state.common);
  const { incomes } = useSelector((state) => state.income);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  // total sum by category
  const totalAmountByCategory = useMemo(() => {
    return getTotalByGroup(incomes, "income_category", "income_amount");
  }, [incomes]);

  // initial fetch
  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllIncomes({ userId: loggedInUserId }));
  }, [dispatch, loggedInUserId]);

  // realtime subscription
  useRealtimeTable(
    "user_incomes",
    { column: "user_id", value: loggedInUserId },
    () => dispatch(getAllIncomes({ userId: loggedInUserId }))
  );

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(
      addIncome({
        user_id: loggedInUserId,
        income_category: values.incomeCategory,
        income_amount: values.incomeAmount,
        received_on: values.recievedOn,
        income_note: values.incomeNote,
      })
    )
      .then(() => {
        toast.success("Income added successfully");
        resetForm();
        modalRef.current?.close();
      })
      .catch((err) => {
        toast.error("Error while adding income: " + err);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Main mainClassName="relative">
      <Suspense fallback={<Loader />}>
        <IncomeList
          incomeTotalAmountByCategory={totalAmountByCategory}
          incomes={incomes}
        />
      </Suspense>

      <CommonModal
        ref={modalRef}
        modalId="income-add-modal"
        openModalBtnClassName="
          fab fab-flower
          absolute
          right-0
          top-4    
          md:top-auto 
          md:bottom-4 
          text-xl
        "
        openModalBtnText={
          <>
            <BiPlus size={30} className="inline mr-1 " />
          </>
        }
      >
        <IncomeForm handleSubmit={handleSubmit} />
      </CommonModal>
    </Main>
  );
};

export default React.memo(IncomePage);
