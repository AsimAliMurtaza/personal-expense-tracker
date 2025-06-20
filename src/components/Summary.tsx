"use client";
import {
  Box,
  Text,
  Progress,
  Grid,
  GridItem,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
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

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.100", "gray.700");
  const cardShadow = useColorModeValue("sm", "dark-lg");

  const totalSpentBg = useColorModeValue("blue.50", "blue.900");
  const totalSpentTextColor = useColorModeValue("gray.700", "gray.100");
  const totalSpentAmountColor = useColorModeValue("blue.600", "blue.300");

  const budgetProgressBg = useColorModeValue("teal.50", "teal.900");
  const budgetProgressTextColor = useColorModeValue("gray.700", "gray.100");
  const budgetProgressDateColor = useColorModeValue("gray.600", "gray.300");
  const budgetProgressValueColor = useColorModeValue("gray.600", "gray.300");
  const budgetProgressPercentageColor = useColorModeValue(
    "gray.700",
    "gray.200"
  );

  return (
    <Flex direction="column" gap="6">
      {" "}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        bg={cardBg}
        borderWidth="1px"
        borderRadius="50"
        borderColor={cardBorderColor}
        p={6}
      >
        <GridItem>
          <Box
            bg={totalSpentBg}
            p={5}
            borderRadius="30"
            h="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text
              fontSize="xl"
              fontWeight="semibold"
              color={totalSpentTextColor}
            >
              Total Spent
            </Text>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={totalSpentAmountColor}
              mt={1}
            >
              {" "}
              ₨ {total.toLocaleString()}
            </Text>
          </Box>
        </GridItem>

        {budget && (
          <GridItem>
            <Box
              bg={budgetProgressBg}
              p={5}
              borderRadius="30"
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color={budgetProgressTextColor}
              >
                Budget Progress
              </Text>
              <Text fontSize="sm" color={budgetProgressDateColor} mb={2}>
                {budget.startDate} to {budget.endDate}
              </Text>
              <Progress
                value={(budgetUsed / budgetTotal) * 100}
                colorScheme={budgetUsed > budgetTotal ? "red" : "teal"}
                size="lg"
                borderRadius="full"
              />
              <Flex justify="space-between" mt={3}>
                {" "}
                <Text fontSize="sm" color={budgetProgressValueColor}>
                  ₨ {budgetUsed.toLocaleString()} of ₨{" "}
                  {budgetTotal.toLocaleString()}
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color={budgetProgressPercentageColor}
                >
                  {" "}
                  {budgetTotal > 0
                    ? Math.round((budgetUsed / budgetTotal) * 100)
                    : 0}
                  %
                </Text>
              </Flex>
            </Box>
          </GridItem>
        )}
      </Grid>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        bg={cardBg}
        p={6}
        borderRadius="50"
        boxShadow={cardShadow}
        borderWidth="1px"
        borderColor={cardBorderColor}
      >
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Chart data={categoryData} />
        </GridItem>
        {budget && (
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <BudgetChart budget={budget} expenses={expenses} />
          </GridItem>
        )}
      </Grid>
    </Flex>
  );
}
