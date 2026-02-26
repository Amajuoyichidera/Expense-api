const Expense = require("../models/Expense");

// GET all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const newExpense = await Expense.create({ title, amount });
    res.status(201).json(newExpense);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE expense
exports.updateExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
