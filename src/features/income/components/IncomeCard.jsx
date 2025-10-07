import React, { useState } from "react";
import { BiEdit, BiX, BiMoney } from "react-icons/bi";
import { MdDeleteForever, MdFiberNew } from "react-icons/md";
import dayjs from "dayjs";
import { formatCurrency } from "../../../utils/currencyUtils";
import CommonModal from "../../common/components/CommonModal";
// import IncomeForm from "./IncomeForm";
import { commonDate } from "../../../utils/dateUtils";
import IncomeForm from "./IncomeForm";
import { useSelector } from "react-redux";

const IncomeCard = ({
  incomeId,
  
  category,
  amount,
  date,
  note = "",
  bgColor = "bg-green-500",
  createdAt,

  // userCurrency = "INR",
  deleteIncome,
  editModelRef,
  editIncomeHandler,
  Icon = BiMoney,
 
}) => {
  const [showNote, setShowNote] = useState(false);
const { userCurrency } = useSelector(state => state.common);
    // console.log('rerender',category);
    
  const isNew = createdAt
    ? dayjs().diff(dayjs(createdAt), "minute") <= 5
    : false;

  return (
    <div
      className={`card ${!showNote ? "cursor-pointer" : ""} w-102 bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden`}
      onClick={() => setShowNote(!showNote)}
      title={!showNote ? "Click to show action bar" : ""}
    >
      <div className="flex items-center p-4 gap-4">
        <div className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}>
          <Icon
            className={`text-4xl duration-300 ease-in-out hover:scale-120 text-white`}
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">{category}</span>
            <span className="font-bold text-lg cursor-auto">
              {formatCurrency(amount, userCurrency || "INR")}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
        
            <span className="cursor-auto" title="income date">{commonDate({ date })}</span>
          </div>
        </div>
      </div>

      {isNew && (
        <div className="absolute z-10 -top-1 right-0 text-primary text-xs font-bold px-2 py-1 rounded-full">
          <MdFiberNew size={30} />
        </div>
      )}

      {showNote && (
        <div
          className="absolute inset-0 bg-base-100 bg-opacity-90 rounded-xl p-3 overflow-auto z-10 scrollbar-hide  "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-info btn-xs mr-2"
            onClick={() => setShowNote(false)}
            title="Close"
          >
            <BiX size={20} />
          </button>

          <button
            title="Delete income"
            onClick={deleteIncome}
            className="btn btn-error btn-xs"
          >
            <MdDeleteForever size={20} />
          </button>

          <CommonModal
            ref={editModelRef}
            modalId="income-edit-modal"
            btnTitle="Edit income"
            openModalBtnClassName="btn-xs mx-2"
            openModalBtnText={<BiEdit size={20} />}
          >
            <IncomeForm
              initialValues={{
                id: incomeId,
                incomeCategory: category,
                incomeAmount: amount,
                recievedOn: dayjs(date).format("YYYY-MM-DD"),
                incomeNote: note,
              }}
              handleSubmit={editIncomeHandler}
              isEdit={true}
            />
          </CommonModal>

          {note && (
            <div className="mt-2">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                <strong>Note:</strong> {note}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// export default React.memo(IncomeCard);
export default React.memo(IncomeCard, (prevProps, nextProps) => {
  // if (prevProps.theme !== nextProps.theme && nextProps.theme === "luxury") {
  //   //this will ignore theme, so changing theme never triggers a re-render.
  //   return false; // trigger rerender
  // }
  return (
  
    prevProps.category === nextProps.category &&
    prevProps.amount === nextProps.amount &&

    prevProps.date === nextProps.date &&
    prevProps.bgColor === nextProps.bgColor &&
    // prevProps.userCurrency === nextProps.userCurrency &&
    prevProps.Icon === nextProps.Icon &&
    prevProps.note == nextProps.note
  );
});
