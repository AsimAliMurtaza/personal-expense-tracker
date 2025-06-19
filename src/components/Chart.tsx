"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Record<string, number>;
}

export default function Chart({ data }: Props) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <Box w={["100%", "50%"]}>
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
      />
    </Box>
  );
}
