// components/BudgetChart.tsx
"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Expense, Budget } from "@/lib/types";
import { Box } from "@chakra-ui/react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
  expenses: Expense[];
  budget: Budget;
}

export default function BudgetChart({ expenses, budget }: Props) {
  const start = new Date(budget.startDate);
  const end = new Date(budget.endDate);

  // Build date keys between start and end
  const dates: string[] = [];
  const dailyTotal: Record<string, number> = {};
  const oneDay = 24 * 60 * 60 * 1000;

  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + oneDay)) {
    const dateStr = d.toISOString().split("T")[0];
    dates.push(dateStr);
    dailyTotal[dateStr] = 0;
  }

  // Sum expenses per day
  for (const e of expenses) {
    const d = e.date.split("T")[0];
    if (dailyTotal[d] !== undefined) {
      dailyTotal[d] += e.amount;
    }
  }

  // Accumulate usage day-by-day
  let usageSoFar = 0;
  const usageData = dates.map((d) => {
    usageSoFar += dailyTotal[d] || 0;
    return usageSoFar;
  });

  const budgetData = dates.map(() => budget.amount);

  return (
    <Box w="100%" mt={6}>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: "Budget Limit",
              data: budgetData,
              borderColor: "#4299e1",
              borderDash: [5, 5],
              fill: false,
            },
            {
              label: "Actual Usage",
              data: usageData,
              borderColor: "#48bb78",
              backgroundColor: "#9ae6b4",
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </Box>
  );
}
