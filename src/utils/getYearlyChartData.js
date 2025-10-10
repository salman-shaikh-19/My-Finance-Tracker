import dayjs from "dayjs";

const getYearlyCategoryData = ({
  items = [],
  dateKey = "start_date",
  valueKey = "invested_amount",
  referenceDate = new Date(),
}) => {
  if (!items?.length) return [];

  const targetYear = dayjs(referenceDate).year();

  const categoryMap = {};

  items.forEach((item) => {
    const date = dayjs(item[dateKey]);
    if (date.year() === targetYear) {
      const category = item.investment_category || "Other";
      categoryMap[category] = (categoryMap[category] || 0) + Number(item[valueKey] || 0);
    }
  });

  // Convert to array for charts
  return Object.entries(categoryMap).map(([category, invested_amount]) => ({
    investment_category: category,
    invested_amount,
  }));
};

export default getYearlyCategoryData;
