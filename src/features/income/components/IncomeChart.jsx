import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { useDispatch, useSelector } from "react-redux";

import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";

import PrevNextButton from "../../common/components/PrevNextButton";
import ChartMenu from "../../common/components/charts/ChartMenu";
import { getAllIncomes } from "../incomeSlice";
import { refreshData } from "../../../utils/refreshData";
import { getWeeklyChartData } from "../../../utils/getWeeklyChartData";
import NoDataFound from "../../common/components/NoDataFound";
import { downloadAsImage } from "../../../utils/downloadAsImage";
import { getWeekLabel } from "../../../utils/dateUtils";
import CustomDoughnutChart from "../../common/components/charts/CustomDoughnutChart";
import CustomRadarChart from "../../common/components/charts/CustomRadarChart";
import CustomAreaChart from "../../common/components/charts/CustomAreaChart";
dayjs.extend(isoWeek);

const chartColor = "#10B981";
const IncomeChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.common);
  const { incomes } = useSelector((state) => state.income);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [currentChart, setCurrentChart] = useState("line");

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
      params: { customWeakDate },
      resetOffset: setWeekOffset,
    });
  };
  const handleDownloadChart = () => {
    downloadAsImage({ currentChartFor: `income` });
  };
  return (
    <div className="w-full mb-4 max-w-full h-[450px] p-4 bg-base-100 rounded-lg   shadow">
      <PrevNextButton
        customLabelDate={customWeakDate}
        offset={weekOffset}
        setPrevOffset={() => setWeekOffset((prev) => prev - 1)}
        setNextOffset={() => setWeekOffset((prev) => prev + 1)}
        refreshData={refreshIncomes}
        getLabel={(date) => getWeekLabel(date)}
      />

      {!chartData.length ? (
        <NoDataFound NoDataFoundFor=" chart" />
      ) : (
        <>
        <div className="flex flex-row  lg:flex-col items-center">
          <ChartMenu
            currentChart={currentChart}
            setCurrentChart={setCurrentChart}
            downloadChart={handleDownloadChart}
            data={incomes}
            fileName={`Incomes-${dayjs(customWeakDate).format("YYYY-MMM-DD")}`}
            excludeKeys={["created_at", "id", "user_id"]}
          />

          {currentChart === "bar" && (
            <CustomBarChart
              chartData={chartData}
              //  BarDataKey={"total"}
              XAxisDataKey="day"
              BarDataKey={[{ key: "total", name: "Total income" }]}
              isLegend={false}
              description="Total income of the week "
              height={300}
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
              height={300}
              lineColor={chartColor}
              strokeColor={chartColor}
            />
          )}

          {currentChart === "pie" && (
            <CustomPieChart
              chartData={chartData}
              pieDataKey="total"
              pieNameKey="day"
              height={300}
              description="Total income of the week"
            />
          )}

          {currentChart === "area" && (
            <CustomAreaChart
              chartData={chartData}
              XAxisDataKey="day"
              AreaDataKey={[{ key: "total", name: "Total income" }]}
              description={`Total income of the week`}
              height={300}
              areaColor={chartColor}
            />
          )}

          {currentChart === "radar" && (
            <CustomRadarChart
              chartData={chartData}
              dataKey="total"
              nameKey="day"
              description={`Total income of the week`}
              height={300}
              color={chartColor}
            />
          )}

          {currentChart === "doughnut" && (
            <CustomDoughnutChart
              chartData={chartData}
              dataKey="total"
              nameKey="day"
              description={`Total income of the week`}
              height={300}
              colors={[chartColor, "#FBBF24", "#3B82F6", "#10B981", "#8B5CF6"]}
            />
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(IncomeChart);
