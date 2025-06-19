import { Box, Text, VStack, Progress } from "@chakra-ui/react";
import { Expense } from "@/lib/types";
import Chart from "./Chart";
import { getBudget } from "@/lib/localStorage";
import BudgetChart from "./BudgetChart";

interface Props {
  expenses: Expense[];
}

export default function Summary({ expenses }: Props) {
  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  const categoryData = expenses.reduce((acc: Record<string, number>, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const budget = getBudget();
  let budgetUsed = 0;
  let budgetTotal = budget?.amount || 0;

  if (budget) {
    const start = new Date(budget.startDate).getTime();
    const end = new Date(budget.endDate).getTime();
    budgetUsed = expenses
      .filter((e) => {
        const t = new Date(e.date).getTime();
        return t >= start && t <= end;
      })
      .reduce((acc, e) => acc + e.amount, 0);
  }

  return (
    <Box mb={8}>
      <VStack align="start" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Total Spent: ₨ {total.toLocaleString()}
        </Text>

        {budget && (
          <Box w="100%">
            <Text fontWeight="medium">
              Budget Period: {budget.startDate} to {budget.endDate}
            </Text>
            <Text>Budget: ₨ {budget.amount.toLocaleString()}</Text>
            <Text>Used: ₨ {budgetUsed.toLocaleString()}</Text>
            <Progress
              mt={2}
              colorScheme={budgetUsed > budgetTotal ? "red" : "green"}
              value={(budgetUsed / budgetTotal) * 100}
              borderRadius="md"
            />
          </Box>
        )}

        <Chart data={categoryData} />
        {budget && <BudgetChart budget={budget} expenses={expenses} />}
      </VStack>
    </Box>
  );
}
