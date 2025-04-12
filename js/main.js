// Fonction pour récupérer et afficher les transactions

function loadTransactions() {
    fetch('get-transaction.php')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('depensesBody');
            tbody.innerHTML = '';
            data.forEach(transaction => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="color:#f41d1d;">${parseFloat(transaction.amount).toFixed(2)} €</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.description}</td>
                `;
                tbody.appendChild(tr);
            })
        })
        .catch(err => console.error("Erreur de chargement des dépenses : ", err));
}

function loadRevenus() {
    fetch('get-revenu.php')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('revenusBody');
            tbody.innerHTML = '';
            data.forEach(revenu => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="color:#35f41c;">${parseFloat(revenu.amount).toFixed(2)} €</td>
                    <td>${revenu.category}</td>
                    <td>${revenu.description}</td>
                `;
                tbody.appendChild(tr)
            })
        })
        .catch(err => console.error("Erreur de chargement des revenus : ", err));
}

// function loadTotalDepenses() {
//     fetch('total-depense.php')
//         .then(res => res.json())
//         .then(data => {
//             const totalDepense = document.getElementById('totalDepense');
//             const p = document.createElement('p')
//             p.innerText = `${data} €`;
//             totalDepense.appendChild(p);
//         })
        
// }

// function loadTotalRevenus() {
//     fetch('total-revenu.php')
//         .then(res => res.json())
//         .then(data => {
//             const totalRevenu = document.getElementById('totalRevenu');
//             const p = document.createElement('p')
//             p.innerText = `${data} €`;
//             totalRevenu.appendChild(p);
//         })
        
// }

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



loadTransactions();
loadRevenus()