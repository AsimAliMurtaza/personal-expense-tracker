"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Expense } from "@/lib/types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addExpense, updateExpense } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface Props {
  initialData?: Expense;
  isEdit?: boolean;
}

export default function ExpenseForm({ initialData, isEdit }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [category, setCategory] = useState(initialData?.category || "Food");
  const [date, setDate] = useState(
    initialData?.date || new Date().toISOString().slice(0, 10)
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = () => {
    if (!title || !amount || amount < 0 || !date || !category) {
      toast({
        title: "Invalid input",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const newExpense: Expense = {
      id: initialData?.id || uuidv4(),
      title,
      amount,
      category,
      date,
      notes,
    };

    if (isEdit) {
      updateExpense(newExpense);
      toast({ title: "Expense updated", status: "success" });
    } else {
      addExpense(newExpense);
      toast({ title: "Expense added", status: "success" });
    }

    router.push("/");
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      maxW="lg"
      mx="auto"
      mt={6}
      p={4}
      borderWidth="1px"
      rounded="md"
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Transport">Transport</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleSubmit}>
          {isEdit ? "Update Expense" : "Add Expense"}
        </Button>
      </VStack>
    </MotionBox>
  );
}
