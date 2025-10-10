import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useDispatch, useSelector } from "react-redux";

import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";

import PrevNextButton from "../../common/components/PrevNextButton";
import ChartMenu from "../../common/components/charts/ChartMenu";
import NoDataFound from "../../common/components/NoDataFound";
import { downloadAsImage } from "../../../utils/downloadAsImage";
import { getAllInvestments } from "../investmentsSlice";
import getYearlyCategoryData from "../../../utils/getYearlyChartData";
import { refreshData } from "../../../utils/refreshData";
import CustomDoughnutChart from "../../common/components/charts/CustomDoughnutChart";
import CustomRadarChart from "../../common/components/charts/CustomRadarChart";
import CustomAreaChart from "../../common/components/charts/CustomAreaChart";
import ExportButtons from "../../common/components/ExportButtons";
dayjs.extend(isoWeek);

const chartColor = "teal";

const InvestmentChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.common);
  const { investments } = useSelector((state) => state.investments);

  const [yearOffset, setYearOffset] = useState(0); // 0 = current year
  const [currentChart, setCurrentChart] = useState("area");

  const currentYear = dayjs().add(yearOffset, "year").year();

  // Fetch investments for that year
  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllInvestments({ userId: loggedInUserId, year: currentYear }));
  }, [dispatch, loggedInUserId, currentYear]);

  const chartData = React.useMemo(() => {
    return getYearlyCategoryData({
      items: investments,
      dateKey: "start_date",
      valueKey: "invested_amount",
      referenceDate: dayjs().add(yearOffset, "year").toDate(),
    });
  }, [investments, yearOffset]);

  const handleDownloadChart = () => {
    downloadAsImage({ currentChartFor: `investments-${currentYear}` });
  };

  const handleRefresh = () => {
    if (!loggedInUserId) return;
    refreshData({
      loggedInUserId,
      dispatch,
      action: getAllInvestments,
      params: { year: currentYear },
      resetOffset: setYearOffset,
    });
  };

  return (
    <div className="w-full mb-4 max-w-full h-[450px]  bg-base-100 rounded-lg shadow p-4">
      <PrevNextButton
        customLabelDate={new Date(new Date().getFullYear() + yearOffset, 0, 1)}
        offset={yearOffset}
        setPrevOffset={() => setYearOffset((prev) => prev - 1)}
        setNextOffset={() => setYearOffset((prev) => prev + 1)}
        refreshData={handleRefresh}
        getLabel={(date) => date.getFullYear()}
        disableNext={false}
      />

      {!chartData.length ? (
        <NoDataFound NoDataFoundFor="chart" />
      ) : (
        <>
        <div className="flex items-center justify-between flex-col lg:flex-row lg:justify-normal ">

          <ChartMenu
            currentChart={currentChart}
            setCurrentChart={setCurrentChart}
            downloadChart={handleDownloadChart}
          />   <ExportButtons
        data={investments}
        fileName={`Investments-${currentYear}`}
        excludeKeys={["created_at", "id", "user_id", "Icon"]}
      />
        </div>
          

          {currentChart === "bar" && (
              <CustomBarChart
              chartData={chartData}
              XAxisDataKey="investment_category"
              BarDataKey={[{ key: "invested_amount", name: "Invested Amount" }]}
              isLegend={false}
              description={`Investments in ${currentYear}`}
              height={300}
              barColor={chartColor}
            />
        )}

          {currentChart === "line" && (
            <CustomLineChart
              chartData={chartData}
              XAxisDataKey="investment_category"
              LineDataKey={[
                { key: "invested_amount", name: "Invested Amount" },
              ]}
              isLegend={false}
              description={`Investments in ${currentYear}`}
              height={300}
              lineColor={chartColor}
              strokeColor={chartColor}
            />
          )}

          {currentChart === "pie" && (
              <CustomPieChart
              chartData={chartData}
              pieDataKey="invested_amount"
              pieNameKey="investment_category"
              height={300}
              description={`Investments in ${currentYear}`}
            />
          )}
          {currentChart === "area" && (
            <CustomAreaChart
              chartData={chartData}
              XAxisDataKey="investment_category"
              AreaDataKey={[{ key: "invested_amount", name: "Invested Amount" }]}
              description={`Investments in ${currentYear}`}
              height={300}
              areaColor={chartColor}
            />
          )}

          {currentChart === "radar" && (
            <CustomRadarChart
              chartData={chartData}
              dataKey="invested_amount"
              nameKey="investment_category"
              description={`Investments in ${currentYear}`}
              height={300}
              color={chartColor}
            />
          )}

          {currentChart === "doughnut" && (
            <CustomDoughnutChart
              chartData={chartData}
              dataKey="invested_amount"
              nameKey="investment_category"
              description={`Investments in ${currentYear}`}
              height={300}
              colors={[chartColor, "#FBBF24", "#3B82F6", "#10B981", "#8B5CF6"]}
            />
          )}

        </>
      )}
      
    </div>
  );
};

export default React.memo(InvestmentChart);
