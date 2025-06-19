"use client";

import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Expense } from "@/lib/types";
import { getExpenses } from "@/lib/localStorage";
import ExpenseList from "@/components/ExpenseList";
import Summary from "@/components/Summary";

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const stored = getExpenses().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setExpenses(stored);
  }, []);

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Expense Tracker</Heading>
        <Link href="/add">
          <Button colorScheme="teal">Add New Expense</Button>
        </Link>
      </Flex>
      <Summary expenses={expenses} />
      <ExpenseList expenses={expenses} onUpdate={setExpenses} />
    </Box>
  );
}
