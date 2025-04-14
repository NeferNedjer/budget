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
                    <td>
                    <button data-id="${transaction.id}" class="delete-btn">❌</button>
                    </td>
                `;
                tbody.appendChild(tr);
            })
        })
        .catch(err => console.error("Erreur de chargement des dépenses : ", err));
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        if (confirm("Tu veux vraiment supprimer ça ?")) {
            fetch('delete-transaction.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') {
                    const row = e.target.closest('tr');
                    row.style.transition = 'opacity 0.5s';
                    row.style.opacity = '0';

                    setTimeout(() => {
                        row.remove();
                        loadDashboard();
                    }, 500);
                    // alert('Transaction supprimée 💥');
                    // loadTransactions();
                    // loadRevenus();
                    // loadDashboard();
                } else {
                    alert('Suppression échouée 😕');
                }
            });
        }
    }
});

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
                    <td>
                    <button data-id="${revenu.id}" class="delete-btn">❌</button>
                    </td>
                    
                `;
                tbody.appendChild(tr)
            })
        })
        .catch(err => console.error("Erreur de chargement des revenus : ", err));
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
                loadRevenus();
                loadDashboard();
            } else {
                validation.innerHTML = `
                <p>Erreur de validation</p>
                `
            }
        })
})




loadTransactions();
loadRevenus();
