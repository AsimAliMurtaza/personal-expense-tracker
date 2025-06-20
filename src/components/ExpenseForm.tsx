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
  Heading,
  Card,
  CardBody,
  Flex,
  useColorModeValue,
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
  const [form, setForm] = useState({
    title: initialData?.title || "",
    amount: initialData?.amount || 0,
    category: initialData?.category || "Food",
    date: initialData?.date || new Date().toISOString().slice(0, 10),
    notes: initialData?.notes || "",
  });

  const toast = useToast();
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.amount ||
      form.amount < 0 ||
      !form.date ||
      !form.category
    ) {
      toast({
        title: "Please fill all required fields",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const newExpense: Expense = {
      id: initialData?.id || uuidv4(),
      ...form,
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
      maxW="xl"
      mx="auto"
      mt={8}
    >
      <Card
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="50"
      >
        <CardBody p={6}>
          <Heading
            size="lg"
            mb={6}
            color={useColorModeValue("gray.800", "white")}
          >
            {isEdit ? "Edit Expense" : "Add New Expense"}
          </Heading>

          <VStack spacing={5} align="stretch">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                borderRadius="50"
                placeholder="Expense title"
                size="lg"
              />
            </FormControl>

            <Flex gap={4} direction={{ base: "column", md: "row" }}>
              <FormControl isRequired flex={1}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  name="amount"
                  borderRadius="50"
                  value={form.amount}
                  onChange={handleChange}
                  size="lg"
                />
              </FormControl>
              <FormControl isRequired flex={1}>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  borderRadius="50"
                  size="lg"
                >
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Transport">Transport</option>
                  <option value="Health">Health</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
            </Flex>

            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                borderRadius="50"
                size="lg"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Additional notes (optional)"
                size="lg"
                borderRadius="20"
                rows={4}
              />
            </FormControl>

            <Button
              colorScheme="teal"
              size="lg"
              borderRadius="50"
              onClick={handleSubmit}
              mt={4}
            >
              {isEdit ? "Update Expense" : "Add Expense"}
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  );
}
