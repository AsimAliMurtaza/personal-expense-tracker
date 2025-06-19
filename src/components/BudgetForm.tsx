// components/BudgetForm.tsx
"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Budget } from "@/lib/types";
import { getBudget, setBudget } from "@/lib/localStorage";
import { v4 as uuidv4 } from "uuid";

export default function BudgetForm() {
  const toast = useToast();
  const [amount, setAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const current = getBudget();
    if (current) {
      setAmount(current.amount);
      setStartDate(current.startDate);
      setEndDate(current.endDate);
    }
  }, []);

  const handleSave = () => {
    if (!amount || !startDate || !endDate) {
      toast({ title: "All fields are required", status: "error" });
      return;
    }

    const budget: Budget = {
      id: uuidv4(),
      amount,
      startDate,
      endDate,
      name: "",
    };

    setBudget(budget);
    toast({ title: "Budget set!", status: "success" });
  };

  return (
    <Box borderWidth="1px" rounded="md" p={4} mb={6}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Budget Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSave}>
          Save Budget
        </Button>
      </VStack>
    </Box>
  );
}
