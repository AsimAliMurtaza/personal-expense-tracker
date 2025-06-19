import { Box, Heading } from "@chakra-ui/react";
import ExpenseForm from "@/components/ExpenseForm";

export default function AddExpensePage() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Add New Expense
      </Heading>
      <ExpenseForm />
    </Box>
  );
}
