"use client";
import { Box, Heading } from "@chakra-ui/react";
import ExpenseForm from "@/components/ExpenseForm";

export default function AddExpensePage() {
  return (
    <Box p={6}>
      <ExpenseForm />
    </Box>
  );
}
