window.addEventListener('DOMContentLoaded', () => {
    loadDashboard()
});

function loadDashboard() {
    Promise.all([
        fetch('total-revenu.php').then(res =>res.json()),
        fetch('total-depense.php').then(res => res.json())
    ]).then(([incomeData, expenseData]) => {
        
        const revenus = parseFloat(incomeData) || 0;
        const depenses = parseFloat(expenseData) || 0;
        const solde = revenus - depenses;
        
        document.getElementById('totalRevenus').textContent = `${revenus.toFixed(2)} €`;
        document.getElementById('totalDepenses').textContent = `${depenses.toFixed(2)} €`;

        const soldeElement = document.getElementById('totalSolde');
        soldeElement.textContent = `${solde.toFixed(2)} €`;
        soldeElement.style.color = solde >= 0 ? '#35f41c' : '#f41d1d';

        renderChart(revenus, depenses);

    }).catch(err => {
        console.error("Erreur lors du chargement du dashboard :", err);
    });

    
}

function renderChart(income, expense) {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut', //il existe aussi: 'pie', 'line', 'doughnut'
        data: {
            labels: ['Revenus', 'Dépenses'],
            datasets: [{

                label: 'Montant (€)',
                data:[income, expense],
                backgroundColor: ['#31ab21', '#e71b1b'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}