"use client";

import {
  Box,
  Heading,
  Button,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Expense } from "@/lib/types";
import { deleteExpense, getExpenses } from "@/lib/localStorage";
import Summary from "@/components/Summary";
import BudgetForm from "@/components/BudgetForm";
import ExpenseTable from "@/components/ExpenseTable";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("gray.800", "whiteAlpha.900");

  useEffect(() => {
    const stored = getExpenses().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setExpenses(stored);
  }, []);

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setExpenses(getExpenses());
  };

  return (
    <Box p={{ base: 4, md: 6 }} maxW="7xl" mx="auto" bg={bgColor} minH="100vh">
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="xl" fontWeight="semibold" color={headingColor}>
          Expense Tracker
        </Heading>

        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          size="md"
          fontSize="lg"
          borderRadius="full"
          color={textColor}
          _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        />
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6} mb={8}>
        <GridItem p={6} borderRadius="50">
          <Summary expenses={expenses} />
        </GridItem>

        <GridItem p={6}>
          <BudgetForm />
        </GridItem>
      </Grid>

      <ExpenseTable expenses={expenses} onDelete={handleDelete} />

      <Flex justify="flex-end" mt={6}>
        <Link href="/add" passHref>
          <Button
            colorScheme="teal"
            size="lg"
            variant="solid"
            borderRadius="full"
            _hover={{
              bg: useColorModeValue("teal.600", "teal.400"),
              shadow: "lg",
              transform: "translateY(-2px)",
            }}
            px={8}
            py={6}
            shadow="md"
            color={useColorModeValue("white", "gray.900")}
          >
            Add New Expense
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
