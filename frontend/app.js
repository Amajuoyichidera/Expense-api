const API_URL = 'http://localhost:5000/expenses';

const expensesList = document.getElementById('expenses-list');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');

// fetch and display Expenses
async function fetchExpense() {
    const res = await fetch(API_URL);
    const data = await res.json();

    console.log('data', data);
    expensesList.innerHTML = "";
    
    data.forEach(exp => {
        const li = document.createElement('li');
        li.textContent = `Title: ${exp?.title} - Amount: ${exp?.amount}`;

        // delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteExpense(exp?.id)
        
        // update btn
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.onclick = () => updateExpense(exp?.id);

        li.appendChild(deleteBtn);
        li.appendChild(updateBtn);

        expensesList.appendChild(li)
    });
}

// add expense
async function addExpense() {
    const title = titleInput.value;
    const amount = amountInput.value;

    if(!title || !amount) return alert('Title and amount required');

    const payload = {
        title: title.trim(),
        amount: amount.trim()
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: { "content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    titleInput.value = ''
    amountInput.value = ''

    fetchExpense();
}


// update expense

async function updateExpense(id) {
    const newTitle = prompt('Enter New Title');
    const newAmount = parseInt(prompt('Enter New Amount'));

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title: newTitle, amount: newAmount})
    });

    fetchExpense();
}

// delete expense
async function deleteExpense(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    fetchExpense();
}


fetchExpense();