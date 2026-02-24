require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Expense = require('./models/Expense');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

// to get all expenses
app.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
})

// to add a new expense
app.post('/expenses', (req, res) => {
    const { title, amount } = req.body;

    if(!title || !amount) {
        return res.status(400).json({ message: "Title and amount are required"});
    }

    const newExpense = {
        id: expenses.length + 1,
        title,
        amount
    }

    expenses.push(newExpense);
    res.status(201).json(newExpense);
})

// to delete an expense
app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);

    expenses = expenses.filter((expense) => expense?.id !== id);
    res.status(200).json({ message: 'expense deleted'})
})

// to update an expense
app.put('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, amount } = req.body;

    const updatedExpense = expenses.find(exp => exp?.id === id);
    if (!updatedExpense) {
        res.status(404).json({ message: 'Expense not found'});
    }

    if(title) {
        updatedExpense.title = title
    }

    if(amount) {
        updatedExpense.amount = amount
    }

    res.json(expenses);
})