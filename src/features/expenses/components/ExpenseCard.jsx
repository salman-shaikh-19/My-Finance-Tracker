import React, { useState } from "react";
import { BiEdit, BiHome, BiMoney, BiX } from "react-icons/bi";
import { formatCurrency } from "../../../utils/currencyUtils";
import dayjs from "dayjs";
import { MdDeleteForever, MdFiberNew, MdPayment } from "react-icons/md";
import CommonModal from "../../common/components/CommonModal";
import ExpenseForm from "./ExpenseForm";
import { commonDate } from "../../../utils/dateUtils";
import { useSelector } from "react-redux";

const ExpenseCard = ({
  expenseId,

  // userCurrency = "INR",
  deleteExpense,
  category,
  amount,
  type,
  date,
  bgColor = "bg-red-500",
  createdAt,
  note = "",
  editModelRef,
  editExpenseHandler,
  Icon = BiHome,
  PaymentIcon = BiMoney,
}) => {
  const [showNote, setShowNote] = useState(false);
  const { userCurrency } = useSelector((state) => state.common);

  // console.log('render',theme);
  const isNew = createdAt
    ? dayjs().diff(dayjs(createdAt), "minute") <= 5
    : false;
  return (
    <div
      className={`card ${
        !showNote ? " cursor-pointer " : ""
      }   w-102 bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden`}
      onClick={() => setShowNote(!showNote)}
      title={
        !showNote
          ? "Click to " + (showNote ? "close" : "show") + " action bar"
          : ""
      }
    >
      <div className="flex items-center p-4 gap-4 ">
        <div
          className={`avatar rounded-full p-4 flex justify-center items-center  ${bgColor}`}
        >
          <Icon
            className={`  text-4xl 
            duration-300 
            ease-in-out    hover:scale-120  
            text-white `}
          />
        </div>
        <div className="flex flex-col justify-between flex-1 h-full ">
          <div className="flex justify-between items-center mb-2  ">
            <span className="font-semibold text-lg ">{category}</span>
            <span className="font-bold text-lg cursor-auto ">
              {" "}
              {formatCurrency(amount, userCurrency || "INR")}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="tooltip tooltip-top tooltip-info" data-tip="Payment type">

            <span
              title="Payment method"
              className="flex items-center cursor-auto gap-2 bg-base-300    px-2 py-1 rounded-full text-sm font-medium shadow-sm"
            >
              <PaymentIcon size={16} className="text-green-600" />

              <span className="font-semibold ">{type}</span>
            </span>
            </div>
            <div className="tooltip tooltip-top tooltip-info" data-tip="Expense date">

            <span
              className="badge badge-outline badge-sm cursor-auto"
              title="expense date"
              >
              <MdPayment className="inline mb-0.5" /> {commonDate({ date })}
            </span>
              </div>
          </div>
        </div>
      </div>
      {isNew && (
        <div className="absolute z-10 -top-1  right-0 text-primary  text-xs font-bold px-2 py-1 rounded-full">
          <MdFiberNew size={30} />
        </div>
      )}
      {showNote && (
        <div
          className="absolute inset-0 bg-base-100 bg-opacity-90  rounded-xl p-3 overflow-auto z-10 scrollbar-hide "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-info btn-xs mr-2 "
            onClick={() => setShowNote(false)}
            title="Close"
          >
            <BiX size={20} />
          </button>

          <button
            title="Delete expense"
            onClick={deleteExpense}
            className="btn btn-error  btn-xs"
          >
            <MdDeleteForever size={20} />
          </button>

          <CommonModal
            ref={editModelRef}
            modalId="expense-edit-modal"
            btnTitle="Edit expense"
            openModalBtnClassName="
                   
                    btn-xs
                    mx-2
                  "
            openModalBtnText={
              <>
                <BiEdit size={20} className="" />
              </>
            }
          >
            {/* <AddExpense handleSubmit={handleSubmit} /> */}
            <ExpenseForm
              initialValues={{
                id: expenseId,
                amount: amount,
                expenseCategory: category,
                expenseDate: dayjs(date).format("YYYY-MM-DD"),
                expenseMethod: type,
                note: note,
              }}
              handleSubmit={editExpenseHandler}
              isEdit={true}
            />
          </CommonModal>

          <div className="max-h-full overflow-auto scrollbar-hide  ">
            <p className="text-sm leading-relaxed whitespace-pre-wrap   ">
              {note ? (
                <>
                  <strong>Note:</strong> {note}
                </>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ExpenseCard, (prevProps, nextProps) => {
  // if (prevProps.theme !== nextProps.theme && nextProps.theme === "luxury") {
  //   //this will ignore theme, so changing theme never triggers a re-render.
  //   return false; // trigger rerender
  // }
  return (
    prevProps.category === nextProps.category &&
    prevProps.amount === nextProps.amount &&
    prevProps.type === nextProps.type &&
    prevProps.date === nextProps.date &&
    prevProps.bgColor === nextProps.bgColor &&
    // prevProps.userCurrency === nextProps.userCurrency &&
    prevProps.Icon === nextProps.Icon &&
    prevProps.note == nextProps.note
  );
});
