import React, { useEffect, useMemo, useState } from "react";
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
import { getAllLiabilities } from "../liabilitySlice";
import { refreshData } from "../../../utils/refreshData";

dayjs.extend(isoWeek);

const chartColor = "#EF4444";

const LiabilityChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.common);
  const { liabilities } = useSelector((state) => state.liabilities);

  const [yearOffset, setYearOffset] = useState(0); // current year offset
  const [currentChart, setCurrentChart] = useState("pie");

  const currentYear = dayjs().add(yearOffset, "year").year();

  // Fetch liabilities for current year
  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllLiabilities({ userId: loggedInUserId, year: currentYear }));
  }, [dispatch, loggedInUserId, currentYear]);

  // Aggregate remaining amount by liability type
  const chartData = useMemo(() => {
    return liabilities.reduce((acc, liab) => {
      const type = liab.liability_type || "Other";
      const existing = acc.find((c) => c.liability_type === type);
      if (existing) {
        existing.remaining_amount += liab.remaining_amount;
      } else {
        acc.push({
          liability_type: type,
          remaining_amount: liab.remaining_amount,
        });
      }
      return acc;
    }, []);
  }, [liabilities]);

  // Refresh chart data
  const handleRefresh = () => {
    if (!loggedInUserId) return;
    refreshData({
      loggedInUserId,
      dispatch,
      action: getAllLiabilities,
      params: { year: currentYear },
      resetOffset: setYearOffset,
    });
  };

  const handleDownloadChart = () => {
    downloadAsImage({ currentChartFor: `liabilities-${currentYear}` });
  };

  return (
    <div className="w-full mb-4 max-w-full h-[450px] bg-base-100 rounded-lg shadow p-4">
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
          <ChartMenu
            currentChart={currentChart}
            setCurrentChart={setCurrentChart}
            downloadChart={handleDownloadChart}
          />

          {currentChart === "bar" && (
            <CustomBarChart
              chartData={chartData}
              XAxisDataKey="liability_type"
              BarDataKey={[{ key: "remaining_amount", name: "Remaining Amount" }]}
              isLegend={false}
              description={`Remaining Amount per Liability in ${currentYear}`}
              height={300}
              barColor={chartColor}
            />
          )}

          {currentChart === "line" && (
            <CustomLineChart
              chartData={chartData}
              XAxisDataKey="liability_type"
              LineDataKey={[{ key: "remaining_amount", name: "Remaining Amount" }]}
              isLegend={false}
              description={`Remaining Amount per Liability in ${currentYear}`}
              height={300}
              lineColor={chartColor}
              strokeColor={chartColor}
            />
          )}

          {currentChart === "pie" && (
            <CustomPieChart
              chartData={chartData}
              pieDataKey="remaining_amount"
              pieNameKey="liability_type"
              height={300}
              description={`Remaining Amount per Liability in ${currentYear}`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(LiabilityChart);
