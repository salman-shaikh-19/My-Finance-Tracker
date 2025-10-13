import React, {  useState } from "react";
import { BiEdit, BiX, BiMoney } from "react-icons/bi";
import { MdDeleteForever, MdFiberNew, MdPayment } from "react-icons/md";
import dayjs from "dayjs";
import { formatCurrency } from "../../../utils/currencyUtils";
import CommonModal from "../../common/components/CommonModal";

import { commonDate } from "../../../utils/dateUtils";

import { useSelector } from "react-redux";
import InvestmentForm from "./InvestmentForm";


const InvestmentCard = ({
  investmentId,

  category,
  amount,
  date,
  note = "",
  maturityDate,
  bgColor = "bg-green-500",
  isNew,

  // userCurrency = "INR",
  deleteinvestment,
  editModelRef,
  editInvestmentHandler,
  Icon = BiMoney,
}) => {
  const [showNote, setShowNote] = useState(false);
  const { userCurrency } = useSelector((state) => state.common);


  // console.log('rerender',category);


  // const isNew = createdAt
  //   ? dayjs().diff(dayjs(createdAt), "minute") <= 5
  //   : false;

  return (
    
    <div
      className={`card ${
        !showNote ? "cursor-pointer" : ""
      } w-half bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden`}
      onClick={() => setShowNote(!showNote)}
      title={!showNote ? "Click to show action bar" : ""}
    >
      <div className="flex items-center p-4 gap-4">
        <div
          className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}
        >
          <Icon
            className={`text-4xl duration-300 ease-in-out hover:scale-120 text-white`}
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg cursor-auto" title="investment in">{category}</span>
            <span className="font-bold text-lg cursor-auto" title="Total investment">
              {formatCurrency(amount, userCurrency || "INR")}
            </span>
          </div>
          <div className="flex flex-wrap gap-2  justify-between text-sm text-gray-500 items-center">
            <span
              className="badge badge-outline badge-sm cursor-auto"
              title="Invested on"
            >
              <MdPayment className="inline mb-0.5" /> Invested On:{" "}
              {commonDate({ date })}
            </span>

            <div
              className="badge badge-xs lg:badge-sm md:badge-sm"
              title="Payment schedule"
            >
              <div title="Investment maturity status" className="mt-1">
                {!maturityDate ? (
                  <span className="text-xs text-secondary font-semibold">
                    No maturity date set
                  </span>
                ) : dayjs(maturityDate).isSame(dayjs(), "day") ? (
                  <span className="text-xs text-info font-semibold">
                    Matures today
                  </span>
                ) : dayjs(maturityDate).isAfter(dayjs(), "day") ? (
                  <span className="text-xs text-primary font-semibold">
                    {dayjs(maturityDate).diff(dayjs(), "day")} days to mature
                  </span>
                ) : (
                  <span className="text-xs text-success font-semibold">
                    Matured
                  </span>
                )}
              </div>
            </div>

            {maturityDate && (
              <span
                className="badge badge-outline badge-sm cursor-auto"
                title="Investment maturity date"
              >
                <MdPayment className="inline mb-0.5" /> Maturity:{" "}
                {commonDate({ date: maturityDate })}
              </span>
            )}
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
            title="Delete investment"
            onClick={deleteinvestment}
            className="btn btn-error btn-xs"
          >
            <MdDeleteForever size={20} />
          </button>

          <CommonModal
            ref={editModelRef}
            modalId="investment-edit-modal"
            btnTitle="Edit investment"
            openModalBtnClassName="btn-xs mx-2"
            openModalBtnText={<BiEdit size={20} />}
          >
            <InvestmentForm
              initialValues={{
                id: investmentId,
                investmentCategory: category,
                investedAmount: amount,
                startDate: dayjs(date).format("YYYY-MM-DD"),
                maturityDate: dayjs(maturityDate).format("YYYY-MM-DD"),
                investmentNote: note,
              }}
              handleSubmit={editInvestmentHandler}
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

// export default React.memo(InvestmentCard);
export default React.memo(InvestmentCard, (prevProps, nextProps) => {
  // if (prevProps.theme !== nextProps.theme && nextProps.theme === "luxury") {
  //   //this will ignore theme, so changing theme never triggers a re-render.
  //   return false; // trigger rerender
  // }
  return (
    prevProps.category === nextProps.category &&
    prevProps.amount === nextProps.amount &&
    prevProps.date === nextProps.date &&
    prevProps.bgColor === nextProps.bgColor &&
    prevProps.maturityDate === nextProps.maturityDate &&
    prevProps.Icon === nextProps.Icon &&
    prevProps.note == nextProps.note
  );
});
