import { json } from "@sveltejs/kit";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

function getExpenseFileName(year, month) {
  return join(
    process.cwd(),
    `expenses_${year}_${month.toString().padStart(2, "0")}.json`
  );
}

function loadExpenses(year, month) {
  const fileName = getExpenseFileName(year, month);
  if (!existsSync(fileName)) {
    return [];
  }
  try {
    return JSON.parse(readFileSync(fileName, "utf-8"));
  } catch (error) {
    return [];
  }
}

function saveExpenses(year, month, expenses) {
  const fileName = getExpenseFileName(year, month);
  writeFileSync(fileName, JSON.stringify(expenses, null, 2));
}

export async function GET({ url }) {
  try {
    const year =
      parseInt(url.searchParams.get("year")) || new Date().getFullYear();
    const month =
      parseInt(url.searchParams.get("month")) || new Date().getMonth() + 1;

    const expenses = loadExpenses(year, month);
    return json(expenses);
  } catch (error) {
    return json([], { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const expense = await request.json();

    // Validate required fields
    if (!expense.amount || !expense.category || !expense.date) {
      return json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const expenseDate = new Date(expense.date);
    const year = expenseDate.getFullYear();
    const month = expenseDate.getMonth() + 1;

    const expenses = loadExpenses(year, month);

    // Add ID and timestamp
    const newExpense = {
      id: Date.now().toString(),
      ...expense,
      amount: parseFloat(expense.amount),
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);
    saveExpenses(year, month, expenses);

    return json({ success: true, expense: newExpense });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT({ request }) {
  try {
    const updatedExpense = await request.json();

    // Validate required fields
    if (
      !updatedExpense.id ||
      !updatedExpense.amount ||
      !updatedExpense.category ||
      !updatedExpense.date
    ) {
      return json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const expenseDate = new Date(updatedExpense.date);
    const year = expenseDate.getFullYear();
    const month = expenseDate.getMonth() + 1;

    const expenses = loadExpenses(year, month);
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === updatedExpense.id
    );

    if (expenseIndex === -1) {
      return json(
        { success: false, error: "Expense not found" },
        { status: 404 }
      );
    }

    // Update the expense while preserving original createdAt
    const originalExpense = expenses[expenseIndex];
    expenses[expenseIndex] = {
      ...updatedExpense,
      amount: parseFloat(updatedExpense.amount),
      createdAt: originalExpense.createdAt,
      updatedAt: new Date().toISOString(),
    };

    saveExpenses(year, month, expenses);

    return json({ success: true, expense: expenses[expenseIndex] });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE({ request }) {
  try {
    const { id, year, month } = await request.json();

    const expenses = loadExpenses(year, month);
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);

    saveExpenses(year, month, filteredExpenses);

    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
