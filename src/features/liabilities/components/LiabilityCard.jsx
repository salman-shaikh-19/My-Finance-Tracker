import React, { useState } from "react";
import { BiEdit, BiX } from "react-icons/bi";
import { MdDeleteForever, MdFiberNew, MdPayment } from "react-icons/md";
import dayjs from "dayjs";
import { formatCurrency } from "../../../utils/currencyUtils";
import CommonModal from "../../common/components/CommonModal";
import { commonDate } from "../../../utils/dateUtils";
import LiabilityForm from "./LiabilityForm";
import { payLiability } from "../liabilitySlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const LiabilityCard = ({
  liabilityId,
  creditorName,
  deleteLiability,
  totalAmount,
  liabilityType,
  startDate,
  endDate,
  interestRate,
  remainingAmount,
  paymentSchedule,
  bgColor,
  Icon,
  createdAt,
  liabilityNote,
  // userCurrency,
  editModelRef,
  editLiabilityHandler,
  PaymentIcon,
}) => {
  const [showActions, setShowActions] = useState(false);
  const { userCurrency } = useSelector((state) => state.common);

  const isNew = createdAt
    ? dayjs().diff(dayjs(createdAt), "minute") <= 5
    : false;
  const paymentsPerYear = {
    Monthly: 12,
    Quarterly: 4,

    Yearly: 1,

    "No Payment Schedule": 0,
  };

  let numberOfPayments = 1;

  if (
    startDate &&
    endDate &&
    paymentSchedule &&
    paymentsPerYear[paymentSchedule]
  ) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    switch (paymentSchedule) {
      case "Monthly":
        numberOfPayments = Math.max(end.diff(start, "month"), 1);
        break;
      case "Quarterly":
        numberOfPayments = Math.max(Math.ceil(end.diff(start, "month") / 3), 1);
        break;
      case "Yearly":
        numberOfPayments = Math.max(end.diff(start, "year"), 1);
        break;

      default:
        numberOfPayments = 1;
    }
  }

  let totalInterest = interestRate ? (remainingAmount * interestRate) / 100 : 0;
  let perInstallment =
    remainingAmount / numberOfPayments + totalInterest / numberOfPayments;
  const dispatch = useDispatch();
  const handlePay = async () => {
    //confirm before paying sweet alert
    await Swal.fire({
      title: "Are you sure?",
      text: `You are about to pay ${formatCurrency(
        perInstallment,
        userCurrency || "INR"
      )}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(payLiability({ liabilityId, paymentAmount: perInstallment }));
        Swal.fire("Paid!", "Your payment has been recorded.", "success");
        Swal.fire({
          title:"paid",
          text:'i will close in 2 seconds'
        })
      }
    });
  };
  return (
    <div
      className={`card relative w-half bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden ${
        !showActions ? "cursor-pointer" : ""
      }`}
      onClick={() => setShowActions(!showActions)}
      title={!showActions ? "Click to show actions" : ""}
    >
      <div className="flex items-center p-4 gap-4">
        <div
          className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}
        >
          <Icon className="text-4xl text-white duration-300 ease-in-out hover:scale-120" />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-5 items-center mb-1">
            <span
              className="font-semibold lg:text-sm badge badge-primary badge-xs"
              title="creditor name"
            >
              {creditorName}
            </span>

            <div className="flex items-center gap-1 ms-auto text-sm text-gray-500">
              {paymentSchedule && paymentSchedule !== "No Payment Schedule" && (
                <span>
                  {formatCurrency(perInstallment, userCurrency || "INR")} /
                  {paymentSchedule.toLowerCase()}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2  text-sm text-gray-500 items-center">
            <span
              className="badge badge-outline badge-sm cursor-auto"
              title="Liability started from"
            >
              <MdPayment className="inline mb-0.5" />{" "}
              {commonDate({ date: startDate })}
            </span>
            {paymentSchedule && (
              <div
                className="badge badge-primary badge-xs lg:badge-sm md:badge:sm"
                title="Payment schedule"
              >
                {paymentSchedule}
              </div>
            )}
            {endDate && (
              // <span title="End date">{commonDate({ date: endDate })}</span>
              <span
                className="badge badge-outline badge-sm cursor-auto"
                title="Liability deadline"
              >
                <MdPayment className="inline mb-0.5" />{" "}
                {commonDate({ date: endDate })}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 flex-col lg:flex-row md:flex-row lg:items-center md:items-center cursor-auto text-sm text-gray-500 items-start mt-2">
            <span title="Liability type" className="badge badge-info badge-sm">
              {liabilityType}
            </span>
            <span
              className="badge badge-neutral badge-sm cursor-auto"
              title="Total amount borrowed"
            >
              Total: {formatCurrency(totalAmount, userCurrency || "INR")}
            </span>

            {interestRate > 0 && (
              <span
                title="Interest rate"
                className="badge badge-secondary badge-sm"
              >
                Interest: {interestRate}%
              </span>
            )}

            {/* {interestRate > 0 && remainingAmount > 0 && (
              <span
                title="Current interest"
                className="badge badge-info badge-sm"
              >
                Current Interest:{" "}
                {formatCurrency(
                  remainingAmount * (interestRate / 100),
                  userCurrency || "INR"
                )}
              </span>
            )} */}

            <span
              title={`Total remaining amount ${
                interestRate > 0 ? `including ${interestRate}% interest` : ""
              }`}
              className="badge badge-accent badge-sm"
            >
              Remaining:{" "}
              {formatCurrency(
                remainingAmount + (remainingAmount * interestRate) / 100,
                userCurrency || "INR"
              )}
            </span>

            <span
              className={`badge badge-sm ${
                remainingAmount === 0 ? "badge-success" : "badge-warning"
              }`}
              title="Liability status"
            >
              {remainingAmount === 0 ? "Cleared" : "Ongoing"}
            </span>
          </div>

          
        </div>
      </div>

      {isNew && (
        <div className="absolute  top-0 right-0 text-primary">
          <MdFiberNew size={25} />
        </div>
      )}

      {showActions && (
        <div
          className="absolute inset-0 bg-base-100 bg-opacity-95 rounded-xl p-3 overflow-auto z-10 scrollbar-hide flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between mb-3">
            <button
              className="btn btn-info btn-xs"
              onClick={() => setShowActions(false)}
              title="Close"
            >
              <BiX size={20} />
            </button>

            <div className="flex gap-2">
              <button
                title="Delete liability"
                onClick={deleteLiability}
                className="btn btn-error btn-xs"
              >
                <MdDeleteForever size={20} />
              </button>
              {remainingAmount > 0 && (
                <button
                  title="Add payment"
                  onClick={handlePay}
                  className="btn btn-success btn-xs"
                >
                  <MdPayment size={20} /> Pay{" "}
                  {formatCurrency(perInstallment, userCurrency || "INR")}
                </button>
              )}

              <CommonModal
                ref={editModelRef}
                modalId="liability-edit-modal"
                btnTitle="Edit liability"
                openModalBtnClassName="btn-xs"
                openModalBtnText={<BiEdit size={20} />}
              >
                <LiabilityForm
                  initialValues={{
                    id: liabilityId,
                    creditorName,
                    totalAmount,
                    remainingAmount,
                    interestRate,
                    liabilityType,
                    paymentSchedule,
                    startDate: dayjs(startDate).format("YYYY-MM-DD"),
                    endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
                    liabilityNote,
                  }}
                  handleSubmit={editLiabilityHandler}
                  isEdit={true}
                />
              </CommonModal>
            </div>
          </div>

          {liabilityNote && (
            <div className="mt-2 text-sm whitespace-pre-wrap text-gray-600">
              <strong>Note:</strong> {liabilityNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(LiabilityCard, (prev, next) => {
  return (
    prev.creditorName === next.creditorName &&
    prev.totalAmount === next.totalAmount &&
    prev.remainingAmount === next.remainingAmount &&
    prev.startDate === next.startDate &&
    prev.endDate === next.endDate &&
    prev.bgColor === next.bgColor &&
    // prev.userCurrency === next.userCurrency &&
    prev.Icon === next.Icon &&
    prev.liabilityNote === next.liabilityNote
  );
});
