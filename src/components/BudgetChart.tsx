"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Expense, Budget } from "@/lib/types";
import { Box, useColorModeValue } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props {
  expenses: Expense[];
  budget: Budget;
}

export default function BudgetChart({ expenses, budget }: Props) {
  const start = new Date(budget.startDate);
  const end = new Date(budget.endDate);

  const chartBgColor = useColorModeValue("white", "gray.800");
  const gridLineColor = useColorModeValue("gray.200", "gray.700");
  const tickLabelColor = useColorModeValue("gray.600", "gray.300");
  const legendLabelColor = useColorModeValue("gray.700", "gray.200");

  const budgetLineColor = useColorModeValue("#4299e1", "#63B3ED");
  const actualUsageLineColor = useColorModeValue("#48bb78", "#68D391");
  const actualUsageBgColor = useColorModeValue(
    "#9ae6b4",
    "rgba(104, 211, 145, 0.2)"
  );

  const dates: string[] = [];
  const dailyTotal: Record<string, number> = {};
  const oneDay = 24 * 60 * 60 * 1000;

  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + oneDay)) {
    const dateStr = d.toISOString().split("T")[0];
    dates.push(dateStr);
    dailyTotal[dateStr] = 0;
  }

  for (const e of expenses) {
    const d = new Date(e.date).toISOString().split("T")[0];
    if (dailyTotal[d] !== undefined) {
      dailyTotal[d] += e.amount;
    }
  }

  let usageSoFar = 0;
  const usageData = dates.map((d) => {
    usageSoFar += dailyTotal[d] || 0;
    return usageSoFar;
  });

  const budgetData = dates.map(() => budget.amount);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: legendLabelColor,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: useColorModeValue(
          "rgba(0,0,0,0.7)",
          "rgba(255,255,255,0.7)"
        ),
        titleColor: useColorModeValue("white", "gray.900"),
        bodyColor: useColorModeValue("white", "gray.900"),
        borderColor: useColorModeValue("gray.300", "gray.600"),
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
        },
        ticks: {
          color: tickLabelColor,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: gridLineColor,
        },
        ticks: {
          color: tickLabelColor,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <Box
      w="100%"
      h="280px"
      bg={chartBgColor}
      p={4}
      borderRadius="lg"
      shadow="sm"
    >
      {" "}
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: "Budget Limit",
              data: budgetData,
              borderColor: budgetLineColor,
              borderDash: [5, 5],
              fill: false,
              tension: 0.1,
            },
            {
              label: "Actual Usage",
              data: usageData,
              borderColor: actualUsageLineColor,
              backgroundColor: actualUsageBgColor,
              fill: false,
              tension: 0.1,
              pointBackgroundColor: actualUsageLineColor,
              pointBorderColor: actualUsageLineColor,
            },
          ],
        }}
        options={options}
      />
    </Box>
  );
}
