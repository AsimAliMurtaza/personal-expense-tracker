// components/Summary.tsx
"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { Expense } from "@/lib/types";
import Chart from "@/components/Chart";

interface Props {
  expenses: Expense[];
}

export default function Summary({ expenses }: Props) {
  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  const categoryData = expenses.reduce((acc: Record<string, number>, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <Box mb={8}>
      <VStack align="start" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Total Spent: ₨ {total.toLocaleString()}
        </Text>
        <Chart data={categoryData} />
      </VStack>
    </Box>
  );
}
