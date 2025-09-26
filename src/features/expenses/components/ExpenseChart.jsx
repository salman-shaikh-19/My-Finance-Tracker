import React, { useMemo } from "react";
import { expenseCategories, getCategoryByName } from "../../../utils/Categories";
import { commonDate } from "../../../utils/dateUtils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ["#26a7b3", "#ff7f50", "#8bc34a", "#ffc107", "#9c27b0", "#ff5722"];

const ExpenseChart = ({ expenses = [] }) => {
  // Process data for the bar chart
  const { chartData, chartKeys } = useMemo(() => {
    if (!expenses || !Array.isArray(expenses) || expenses.length === 0) {
      return { chartData: [], chartKeys: [] };
    }

    const dataMap = {};
    const allCategories = new Set();
    const categoryColors = {};

    // First pass: collect all categories and assign colors
    expenses.forEach((exp) => {
      if (!exp) return;
      const category = getCategoryByName(expenseCategories, exp?.expense_category)?.name || exp?.expense_category;
      if (category) {
        allCategories.add(category);
        if (!categoryColors[category]) {
          categoryColors[category] = COLORS[Object.keys(categoryColors).length % COLORS.length];
        }
      }
    });

    // Second pass: aggregate expenses by date and category
    expenses.forEach((exp) => {
      if (!exp?.expense_date) return;
      const date = commonDate({ date: exp.expense_date });
      const category = getCategoryByName(expenseCategories, exp?.expense_category)?.name || exp?.expense_category;
      const amount = parseFloat(exp.amount) || 0;
      
      if (!category || !date || amount <= 0) return;

      if (!dataMap[date]) {
        dataMap[date] = { date };
        // Initialize all categories with 0 for each date
        allCategories.forEach(cat => {
          dataMap[date][cat] = 0;
        });
      }
      
      dataMap[date][category] = (parseFloat(dataMap[date][category]) || 0) + amount;
    });

    // Prepare chart keys with colors
    const chartKeys = Array.from(allCategories).map((category, index) => ({
      key: category,
      name: category,
      color: categoryColors[category] || COLORS[index % COLORS.length]
    }));

    const sortedData = Object.values(dataMap).sort((a, b) => {
      if (!a?.date || !b?.date) return 0;
      return new Date(a.date) - new Date(b.date);
    });

    return {
      chartData: sortedData,
      chartKeys: chartKeys.filter(key => 
        sortedData.some(data => data[key.name] > 0)
      )
    };
  }, [expenses]);

  if (!chartData.length || !chartKeys.length) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-white rounded-lg shadow p-4">
        <p className="text-gray-500">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="w-full  max-w-full h-[500px] p-4 bg-base-100 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 px-2">Expense Overview</h2>
      <div className="w-full h-[calc(100%-50px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            barGap={0}
            barCategoryGap="10%"
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              tickMargin={5}
              minTickGap={5}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 11 }}
              tickMargin={5}
              width={60}
            />
            <Tooltip 
              formatter={(value, name) => [`$${value}`, name]}
              labelFormatter={(date) => `Date: ${date}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                padding: '0.5rem'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value, entry, index) => (
                <span style={{ color: entry.color, fontSize: '12px' }}>
                  {value}
                </span>
              )}
            />
            {chartKeys.map((key, index) => (
              <Bar
                key={key.key}
                dataKey={key.name}
                name={key.name}
                fill={key.color}
                stackId="a"
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(ExpenseChart);