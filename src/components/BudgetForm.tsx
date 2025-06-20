"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Card,
  CardBody,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Budget } from "@/lib/types";
import { getBudget, setBudget } from "@/lib/localStorage";
import { v4 as uuidv4 } from "uuid";

export default function BudgetForm() {
  const toast = useToast();
  const [form, setForm] = useState({
    amount: 0,
    startDate: "",
    endDate: "",
  });
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    const current = getBudget();
    if (current) {
      setForm({
        amount: current.amount,
        startDate: current.startDate,
        endDate: current.endDate,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (!form.amount || !form.startDate || !form.endDate) {
      toast({
        title: "All fields are required",
        status: "error",
        position: "top",
      });
      return;
    }

    if (new Date(form.startDate) > new Date(form.endDate)) {
      toast({
        title: "End date must be after start date",
        status: "error",
        position: "top",
      });
      return;
    }

    const budget: Budget = {
      id: uuidv4(),
      amount: form.amount,
      startDate: form.startDate,
      endDate: form.endDate,
      name: "Monthly Budget",
    };

    setBudget(budget);
    toast({
      title: "Budget set successfully!",
      status: "success",
      position: "top",
    });
  };

  return (
    <Card
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="50"
      mb={6}
    >
      <CardBody p={6}>
        <Heading size="lg" mb={6}  color={useColorModeValue("gray.800", "white")}>
          Set Budget
        </Heading>

        <VStack spacing={5} align="stretch">
          <FormControl isRequired>
            <FormLabel>Budget Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              borderRadius="50"
              size="lg"
            />
          </FormControl>

          <Flex gap={4} direction={{ base: "column", md: "row" }}>
            <FormControl isRequired flex={1}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                borderRadius="50"
                size="lg"
              />
            </FormControl>
            <FormControl isRequired flex={1}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                name="endDate"
                value={form.endDate}
                borderRadius="50"
                onChange={handleChange}
                size="lg"
              />
            </FormControl>
          </Flex>

          <Button
            colorScheme="teal"
            variant="outline"
            size="md"
            maxW="150"
            borderRadius="50"
            onClick={handleSave}
            mt={4}
          >
            Save Budget
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}
