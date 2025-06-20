"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getExpenseById } from "@/lib/localStorage";
import ExpenseForm from "@/components/ExpenseForm";
import { useEffect, useState } from "react";
import { Expense } from "@/lib/types";

export default function EditExpensePage() {
  const { id } = useParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (id) {
      const found = getExpenseById(id);
      if (found) {
        setExpense(found);
      }
    }
  }, [id]);

  if (!expense) {
    return (
      <Box p={6}>
        <Heading size="lg">Edit Expense</Heading>
        <Text mt={4} color="red.500">
          Expense not found.
        </Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <ExpenseForm initialData={expense} isEdit />
    </Box>
  );
}
