// Fonction pour récupérer et afficher les transactions

function loadTransactions() {
    fetch('get-transaction.php')
        .then(res => res.json())
        .then(data => {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = '';
            data.forEach(transaction => {
                const li = document.createelement('li');
                li.innerText = `${transaction.date} - ${transaction.amount} € (${transaction.category}) -${transaction.description}`;
                transaction.appendChild(li);
            })
        })
}

// Enregistrer une nouvelle transaction
document.getElementById('addTransactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const category_id = document.getElementById('category_id').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('type', type);
    formData.append('category_id', category_id);
    formData.append('data', date);
    formData.append('description', description);

    fetch('add-transaction.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                loadTransactions();
            }
        })
})

loadTransactions();