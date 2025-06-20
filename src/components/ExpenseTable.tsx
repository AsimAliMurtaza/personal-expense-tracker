"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Card,
  CardBody,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Expense } from "@/lib/types";
import { FiEdit, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseTable({
  expenses,
  onDelete,
}: ExpenseTableProps) {
  const router = useRouter();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHeaderColor = useColorModeValue("gray.600", "gray.200");
  const tableRowBgOdd = useColorModeValue("white", "gray.800");
  const tableRowBgEven = useColorModeValue("gray.50", "gray.750");
  const tableRowHoverBg = useColorModeValue("teal.50", "teal.900");
  const tableTextColor = useColorModeValue("gray.700", "gray.100");
  const emptyStateColor = useColorModeValue("gray.500", "gray.400");

  const menuListBg = useColorModeValue("white", "gray.700");
  const menuListBorderColor = useColorModeValue("gray.200", "gray.600");
  const menuItemHoverBg = useColorModeValue("gray.100", "gray.600");
  const menuItemColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Card
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="50"
      shadow="md"
      overflowX="auto"
    >
      <CardBody p={{ base: 2, md: 4 }}>
        {" "}
        <Table variant="simple" size={{ base: "sm", md: "md" }}>
          {" "}
          <Thead bg={tableHeaderBg}>
            <Tr>
              <Th color={tableHeaderColor} textTransform="capitalize">
                Date
              </Th>{" "}
              <Th color={tableHeaderColor} textTransform="capitalize">
                Title
              </Th>
              <Th color={tableHeaderColor} textTransform="capitalize">
                Category
              </Th>
              <Th color={tableHeaderColor} textTransform="capitalize" isNumeric>
                Amount
              </Th>
              <Th color={tableHeaderColor} textTransform="capitalize">
                Notes
              </Th>
              <Th color={tableHeaderColor} textTransform="capitalize">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.length === 0 ? (
              <Tr>
                <Td colSpan={6} textAlign="center" py={8}>
                  <Text color={emptyStateColor} fontStyle="italic">
                    No expenses recorded yet.
                  </Text>
                </Td>
              </Tr>
            ) : (
              expenses.map((exp, index) => (
                <Tr
                  key={exp.id}
                  bg={index % 2 === 0 ? tableRowBgEven : tableRowBgOdd}
                  _hover={{ bg: tableRowHoverBg }}
                  transition="background-color 0.2s ease-in-out"
                >
                  <Td color={tableTextColor}>
                    {new Date(exp.date).toLocaleDateString()}
                  </Td>
                  <Td fontWeight="medium" color={tableTextColor}>
                    {exp.title}
                  </Td>
                  <Td>
                    <Badge
                      borderRadius="full"
                      px={2}
                      py={1}
                      colorScheme="teal"
                      textTransform="capitalize"
                    >
                      {exp.category}
                    </Badge>
                  </Td>
                  <Td isNumeric color={tableTextColor}>
                    ₨ {exp.amount.toLocaleString()}
                  </Td>
                  <Td maxW="200px" isTruncated color={tableTextColor}>
                    {exp.notes || (
                      <Text as="span" fontStyle="italic" color="gray.500">
                        N/A
                      </Text>
                    )}{" "}
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FiMoreVertical />}
                        variant="ghost"
                        size="sm"
                        borderRadius="full"
                        color={tableTextColor}
                        _hover={{
                          bg: useColorModeValue("gray.100", "gray.600"),
                        }}
                      />
                      <MenuList
                        bg={menuListBg}
                        borderColor={menuListBorderColor}
                        shadow="xl"
                      >
                        <MenuItem
                          icon={<FiEdit />}
                          onClick={() => router.push(`/edit/${exp.id}`)}
                          bg={menuListBg}
                          color={menuItemColor}
                          _hover={{ bg: menuItemHoverBg }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<FiTrash2 />}
                          color="red.500"
                          onClick={() => onDelete(exp.id)}
                          bg={menuListBg}
                          _hover={{ bg: menuItemHoverBg }}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
