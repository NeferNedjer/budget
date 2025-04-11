// Fonction pour récupérer et afficher les transactions

function loadTransactions() {
    fetch('get-transaction.php')
        .then(res => res.json())
        .then(data => {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = '';
            data.forEach(transaction => {
                const li = document.createElement('li');
                li.innerText = `${transaction.description} : ${transaction.amount} `;
                transactionList.appendChild(li);
            })
        })
}

function loadRevenus() {
    fetch('get-revenu.php')
        .then(res => res.json())
        .then(data => {
            const revenuList = document.getElementById('revenuList');
            revenuList.innerHTML = '';
            data.forEach(revenu => {
                const li = document.createElement('li');
                li.innerText = `${revenu.description} : ${revenu.amount} `;
                revenuList.appendChild(li)
            })
        })
}

function loadTotalDepenses() {
    fetch('total-depense.php')
        .then(res => res.json())
        .then(data => {
            const totalDepense = document.getElementById('totalDepense');
            const p = document.createElement('p')
            p.innerText = `${data} €`;
            totalDepense.appendChild(p);
        })
        
}

function loadTotalRevenus() {
    fetch('total-revenu.php')
        .then(res => res.json())
        .then(data => {
            const totalRevenu = document.getElementById('totalRevenu');
            const p = document.createElement('p')
            p.innerText = `${data} €`;
            totalRevenu.appendChild(p);
        })
        
}

// Enregistrer une nouvelle transaction

document.getElementById('addTransactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const category_id = document.getElementById('category_id').value;
    const description = document.getElementById('description').value;
    const validation = document.getElementById('validation');

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('type', type);
    formData.append('category_id', category_id);
    formData.append('description', description);

    fetch('add-transaction.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                validation.innerHTML = `
                <p>Entrée validée !</p>
                `
                validation.style.display = "block";
                loadTransactions();
                loadRevenus()
            } else {
                validation.innerHTML = `
                <p>Erreur de validation</p>
                `
            }
        })
})

loadTotalRevenus()
loadTotalDepenses()
loadTransactions();
loadRevenus()