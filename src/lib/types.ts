export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
}
