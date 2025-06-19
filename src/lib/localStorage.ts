import { Expense } from "./types";

const STORAGE_KEY = "expenses";

export const getExpenses = (): Expense[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const addExpense = (expense: Expense) => {
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
};

export const updateExpense = (updated: Expense) => {
  const expenses = getExpenses().map((e) =>
    e.id === updated.id ? updated : e
  );
  saveExpenses(expenses);
};

export const deleteExpense = (id: string) => {
  const expenses = getExpenses().filter((e) => e.id !== id);
  saveExpenses(expenses);
};

export const getExpenseById = (id: string): Expense | undefined =>
  getExpenses().find((e) => e.id === id);
