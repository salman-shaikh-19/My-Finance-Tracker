import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { useDispatch, useSelector } from "react-redux";

import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";

import PrevNextButton from "../../common/components/PrevNextButton";
import ChartMenu from "../../common/components/charts/ChartMenu";
const chartColor = "#10B981";
import { getAllIncomes } from "../incomeSlice";
import { refreshData } from "../../../utils/refreshData";
import { getWeeklyChartData } from "../../../utils/getWeeklyChartData";
dayjs.extend(isoWeek);

const IncomeChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.common);
  const { incomes } = useSelector((state) => state.income);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [currentChart, setCurrentChart] = useState("bar");

  const customWeakDate = dayjs().add(weekOffset, "week").toDate();

  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllIncomes({ userId: loggedInUserId, customWeakDate }));
  }, [dispatch, loggedInUserId, weekOffset]);

  // transform incomes to chart data

  const chartData = React.useMemo(() => {
    return getWeeklyChartData({
      items: incomes,
      dateKey: "received_on",
      valueKey: "income_amount",
      referenceDate: customWeakDate,
    });
  }, [incomes, customWeakDate]);

  const refreshIncomes = () => {
    refreshData({
      loggedInUserId,
      dispatch,
      action: getAllIncomes,
      customDate: customWeakDate,
      setOffset: setWeekOffset,
    });
  };
  return (
    <div className="w-full mb-4 max-w-full h-[400px] p-4 bg-base-100 rounded-lg   shadow">
      <PrevNextButton
        setPrevWeekOffset={() => setWeekOffset((prev) => prev - 1)}
        setNextWeekOffset={() => setWeekOffset((prev) => prev + 1)}
        refreshData={refreshIncomes}
        weekOffset={weekOffset}
        customWeakDate={customWeakDate}
      />

      {!chartData.length ? (
        <div className="flex justify-center items-center  h-full">
          <p>No income data available</p>
        </div>
      ) : (
        <>
          <ChartMenu
            currentChart={currentChart}
            setCurrentChart={setCurrentChart}
          />

          {currentChart === "bar" && (
            <CustomBarChart
              chartData={chartData}
              //  BarDataKey={"total"}
              XAxisDataKey="day"
              BarDataKey={[{ key: "total", name: "Total income" }]}
              isLegend={false}
              description="Total income of the week "
              height={270}
              barColor={chartColor}
            />
          )}

          {currentChart === "line" && (
            <CustomLineChart
              chartData={chartData}
              XAxisDataKey="day"
              LineDataKey={[{ key: "total", name: "Total income " }]}
              isLegend={false}
              description="Total income of the week "
              height={270}
              lineColor={chartColor}
              strokeColor={chartColor}
            />
          )}

          {currentChart === "pie" && (
            <CustomPieChart
              chartData={chartData}
              pieDataKey="total"
              pieNameKey="day"
              height={270}
              description="Total income of the week"
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(IncomeChart);
