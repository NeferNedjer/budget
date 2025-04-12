window.addEventListener('DOMContentLoaded', () => {
    loadDashboard()
});

function loadDashboard() {
    Promise.all([
        fetch('total-revenu.php').then(res =>res.json()),
        fetch('total-depense.php').then(res => res.json())
    ]).then(([incomeData, expenseData]) => {
        console.log("Income Data:", incomeData);
        console.log("Expense Data:", expenseData);
        const revenus = parseFloat(incomeData) || 0;
        const depenses = parseFloat(expenseData) || 0;
        const solde = revenus - depenses;
        console.log(revenus);
        console.log(depenses);
        document.getElementById('totalRevenus').textContent = `${revenus.toFixed(2)} €`;
        document.getElementById('totalDepenses').textContent = `${depenses.toFixed(2)} €`;

        const soldeElement = document.getElementById('totalSolde');
        soldeElement.textContent = `${solde.toFixed(2)} €`;
        soldeElement.style.color = solde >= 0 ? '#35f41c' : '#f41d1d';
    }).catch(err => {
        console.error("Erreur lors du chargement du dashboard :", err);
    });
}