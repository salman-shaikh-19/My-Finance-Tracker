import React, { useState } from "react";
import { BiEdit, BiX } from "react-icons/bi";
import { MdDeleteForever, MdFiberNew, MdPayment } from "react-icons/md";
import dayjs from "dayjs";
import { formatCurrency } from "../../../utils/currencyUtils";
import CommonModal from "../../common/components/CommonModal";
import { commonDate } from "../../../utils/dateUtils";
import LiabilityForm from "./LiabilityForm";

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
  userCurrency,
  editModelRef,
  editLiabilityHandler,
  PaymentIcon,
}) => {
  const [showActions, setShowActions] = useState(false);

  const isNew = createdAt
    ? dayjs().diff(dayjs(createdAt), "minute") <= 5
    : false;
  const paymentsPerYear = {
    Monthly: 12,
    Quarterly: 4,

    Yearly: 1,
    Weekly: 52,
    "No Payment Schedule": 0,
    Custom: 0,
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
        numberOfPayments = end.diff(start, "month") + 1; // +1 to include start month
        break;
      case "Quarterly":
        numberOfPayments = Math.ceil((end.diff(start, "month") + 1) / 3);
        break;
     
      case "Yearly":
        numberOfPayments = end.diff(start, "year") + 1;
        break;
      case "Weekly":
        numberOfPayments = end.diff(start, "week") + 1;
        break;
      case "No Payment Schedule":
        numberOfPayments = 1;
        break;
        case "Custom":
        numberOfPayments = 1;
        break;
      default:
        numberOfPayments = paymentsPerYear[paymentSchedule];
    }
  }
  let totalInterest = interestRate ? (remainingAmount * interestRate) / 100 : 0;
  let perInstallment =
    remainingAmount / numberOfPayments + totalInterest / numberOfPayments;

  return (
    <div
      className={`card relative w-half bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden ${
        !showActions ? "cursor-pointer" : ""
      }`}
      onClick={() => setShowActions(!showActions)}
      title={!showActions ? "Click to show actions" : ""}
    >
      {/* Top Section */}
      <div className="flex items-center p-4 gap-4">
        <div
          className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}
        >
          <Icon className="text-4xl text-white duration-300 ease-in-out hover:scale-120" />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-5 items-center mb-1">
            <span className="font-semibold text-lg truncate">
              Creditor:{" "}
              <span className="font-normal">
                {creditorName || "No creditor name"}
              </span>{" "}
            </span>
            
         
            <div className="flex items-center gap-1 ms-auto text-sm text-gray-500">
              {paymentSchedule && (
                <span >
                  {formatCurrency(perInstallment, userCurrency || "INR")} {" "}
                  {paymentSchedule.toLowerCase()==="no payment schedule"?"":paymentSchedule.toLowerCase()==="custom" ? "":"/"+paymentSchedule.toLowerCase()}
             
                    </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2  text-sm text-gray-500 items-center">
            <span className="badge badge-outline badge-sm cursor-auto" title="Liability started from">
              <MdPayment className="inline mb-0.5" /> {commonDate({ date: startDate })}
            </span>
            {paymentSchedule && (
              <div className="badge badge-primary badge-xs lg:badge-sm md:badge:sm" title="Payment schedule">
                
                {paymentSchedule}
              </div>
            )}
            {endDate && (
              // <span title="End date">{commonDate({ date: endDate })}</span>
                <span className="badge badge-outline badge-sm cursor-auto" title="Liability deadline">
              <MdPayment className="inline mb-0.5" /> {commonDate({ date: endDate })}
            </span>
            )}
            
          </div>

          <div className="flex flex-wrap gap-2 flex-col lg:flex-row md:flex-row lg:items-center md:items-center cursor-auto text-sm text-gray-500 items-start mt-2">
            {interestRate > 0 && (
              <span
                title="Interest rate"
                className="badge badge-secondary badge-sm"
              >
                Interest: {interestRate}%
              </span>
              
            )}

            <span
              className="badge badge-neutral badge-sm cursor-auto"
              title="Total amount borrowed"
            >
             Total: {formatCurrency(totalAmount, userCurrency || "INR")}
            </span>
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
              title="Remaining amount"
              className="badge badge-accent badge-sm"
            >
              Remaining:{" "}
              {formatCurrency(remainingAmount, userCurrency || "INR")}
            </span>

            <span
              className={`badge badge-sm ${
                remainingAmount === 0 ? "badge-success" : "badge-warning"
              }`}
              title="Liability status"
            >
              {remainingAmount === 0 ? "Cleared" : "Ongoing"}
            </span>
               <span title="Liability type"
                className="badge badge-success badge-sm">{liabilityType}</span>
          </div>

          <div></div>
        </div>
      </div>

      {/* New Badge */}
      {isNew && (
        <div className="absolute  top-0 right-0 text-primary">
          <MdFiberNew size={25} />
        </div>
      )}

      {/* Actions Overlay */}
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
    prev.userCurrency === next.userCurrency &&
    prev.Icon === next.Icon &&
    prev.liabilityNote === next.liabilityNote
  );
});
