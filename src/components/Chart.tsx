"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, useColorModeValue } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Record<string, number>;
}

export default function Chart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      w="90%"
      mx="auto"
      bg={bg}
      overflow="hidden"
    >
      <Box position="relative" h="260px">
        <Pie
          data={{
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "#63b3ed",
                  "#f6ad55",
                  "#68d391",
                  "#fc8181",
                  "#d6bcfa",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom" as const,
                labels: {
                  color: useColorModeValue("#1A202C", "#E2E8F0"), 
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
