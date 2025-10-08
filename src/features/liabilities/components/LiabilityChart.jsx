import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
// import { BiBarChartAlt, BiLineChart, BiPieChartAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";
import ChartMenu from "../../common/components/charts/ChartMenu";
import { getAllLiabilities } from "../liabilitySlice";
import NoDataFound from "../../common/components/NoDataFound";
dayjs.extend(isoWeek);

const chartColor = "#EF4444";
const LiabilityChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.common);
  const { liabilities } = useSelector((state) => state.liabilities);
  const [currentChart, setCurrentChart] = useState("pie");

  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllLiabilities({ userId: loggedInUserId }));
  }, [dispatch, loggedInUserId]);

  // liabilities per type
  const chartData = liabilities.reduce((acc, liab) => {
    const type = liab.liability_type || "Other";
    const existing = acc.find((c) => c.liability_type === type); // check if type already exists in acc
    if (existing) {
      existing.remaining_amount += liab.remaining_amount; // accumulate remaining amount
    } else {
      acc.push({
        liability_type: type,
        remaining_amount: liab.remaining_amount,
      });
    }
    return acc;
  }, []);

  return (
    <div className="w-full  max-w-full h-[370px] p-4 bg-base-100 rounded-lg   shadow">
      {!chartData.length ? (
        <NoDataFound NoDataFoundFor="chart" />
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
              XAxisDataKey="liability_type"
              BarDataKey={[
                { key: "remaining_amount", name: "Remaining Amount" },
              ]}
              isLegend={false}
              description="Remaining Amount per Liability category "
              height={260}
              barColor={chartColor}
            />
          )}

          {currentChart === "line" && (
            <CustomLineChart
              chartData={chartData}
              XAxisDataKey="liability_type"
              LineDataKey={[
                { key: "remaining_amount", name: "Remaining Amount" },
              ]}
              isLegend={false}
              description="Remaining Amount per Liability category"
              height={260}
              lineColor={chartColor}
              strokeColor={chartColor}
            />
          )}

          {currentChart === "pie" && (
            <CustomPieChart
              chartData={chartData}
              pieDataKey="remaining_amount"
              pieNameKey="liability_type"
              height={260}
              description="Remaining Amount per Liability category"
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(LiabilityChart);
