
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { useDispatch, useSelector } from "react-redux";

import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";

import PrevNextButton from "../../common/components/PrevNextButton";
import ChartMenu from '../../common/components/charts/ChartMenu';

import { getAllIncomes } from "../incomeSlice";
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
    if (!incomes || !incomes.length) return [];

    const startOfWeek = dayjs(customWeakDate).startOf("isoWeek");
    const weekDays = {};

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day");
      weekDays[day.format("ddd")] = 0;
    }

    incomes.forEach((exp) => {
      if (!exp?.received_on) return;
      const date = dayjs(exp.received_on);
      const dayLabel = date.format("ddd");
      if (dayLabel in weekDays) {
        weekDays[dayLabel] += parseFloat(exp.income_amount) || 0;
      }
    });

    return Object.keys(weekDays).map((day) => ({
      day,
      total: weekDays[day],
    }));
  }, [incomes, customWeakDate]);

  const refreshData=()=>{
    // console.log('called');
      if (!loggedInUserId) return;
    dispatch(getAllIncomes({ userId: loggedInUserId, customWeakDate }));
    setWeekOffset(0);
  }
  return (
    <div className="w-full mb-4 max-w-full h-[500px] p-4 bg-base-100 rounded-lg   shadow">
      <PrevNextButton
        setPrevWeekOffset={() => setWeekOffset((prev) => prev - 1)}
        setNextWeekOffset={() => setWeekOffset((prev) => prev + 1)}
        refreshData={refreshData}
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
              barColor="green"
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
              lineColor="green"
                strokeColor="green"
              
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
