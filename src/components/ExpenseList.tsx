"use client";

import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Expense } from "@/lib/types";
import { deleteExpense, getExpenses } from "@/lib/localStorage";
import { useRouter } from "next/navigation";

interface Props {
  expenses: Expense[];
  onUpdate: (expenses: Expense[]) => void;
}

export default function ExpenseList({ expenses, onUpdate }: Props) {
  const router = useRouter();

  const handleDelete = (id: string) => {
    deleteExpense(id);
    onUpdate(getExpenses());
  };

  return (
    <Box mt={8}>
      <Text fontSize="xl" mb={4} fontWeight="semibold">
        All Expenses
      </Text>
      {expenses.length === 0 ? (
        <Text color="gray.500">No expenses yet.</Text>
      ) : (
        <SimpleGrid spacing={4} columns={[1, 2, 3]}>
          {expenses.map((exp) => (
            <Box key={exp.id} p={4} borderWidth="1px" rounded="md" shadow="md">
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{exp.title}</Text>
                <Text>₨ {exp.amount.toLocaleString()}</Text>
                <Text fontSize="sm" color="gray.600">
                  {exp.category} — {new Date(exp.date).toDateString()}
                </Text>
                {exp.notes && (
                  <Text fontSize="sm" color="gray.500">
                    {exp.notes}
                  </Text>
                )}
                <Divider />
                <HStack pt={2}>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/edit/${exp.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
