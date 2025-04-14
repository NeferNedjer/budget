# 💸 Budget — Application de gestion budgétaire

Bienvenue dans **Budget**, une petite application web simple (mais efficace) pour suivre tes revenus, dépenses et avoir un aperçu clair de ton solde.  
Développée en **HTML**, **CSS**, **JavaScript**, **PHP** et **MySQL**.

## 🚀 Fonctionnalités

- Ajouter des **transactions** (revenus ou dépenses)
- Catégoriser chaque transaction
- Calcul **automatique** du solde
- Affichage dynamique :
  - Liste des transactions par type
  - Total des revenus et dépenses
  - Graphique avec [Chart.js](https://www.chartjs.org/)
- Modifier ou supprimer une transaction

## 🛠️ Technologies utilisées

- **Front-end** : HTML, CSS, JavaScript
- **Back-end** : PHP (vanilla)
- **Base de données** : MySQL
- **Librairies externes** : [Chart.js](https://cdn.jsdelivr.net/npm/chart.js)

## 🧱 Structure du projet

budget/ │ ├── index.html # Page principale ├── css/ │ └── style.css # Styles ├── js/ │ ├── main.js # Ajout, affichage, suppression, modification │ └── dashboard.js # Calcul des totaux & affichage du graphique ├── total-revenu.php # Retourne le total des revenus ├── total-depense.php # Retourne le total des dépenses ├── add-transaction.php # Ajoute une transaction ├── delete-transaction.php # Supprime une transaction ├── update-transaction.php # Modifie une transaction ├── get-transaction.php # Récupère une transaction par ID └── budget.sql # (à ajouter) Script SQL pour la BDD

## 🧑‍💻 Installation

1. Clone le repo :
   ```bash
   git clone https://github.com/NeferNedjer/budget.git

2. Place le dossier dans ton serveur local (htdocs ou www selon ton setup WAMP/XAMPP)

3. Importe la base de données :

    Crée une base appelée budget

    Exécute le fichier budget.sql (si dispo)

4. Lance l’app dans ton navigateur :
    http://localhost/budget

✨ À faire

    Filtrer les transactions par date

    Export en CSV

    Authentification utilisateur

👨‍🎓 Projet dans le cadre de ma préparation au Titre Pro Développeur Web & Web Mobile

    Développé avec ❤️ et des litres de café.

📬 Contact

    Tu peux me suivre ou me contacter ici :

    🔗 GitHub @NeferNedjer

-- Création de la base de données

    CREATE DATABASE IF NOT EXISTS budget CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    USE budget;

-- Table des catégories

    CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

-- Insertion de quelques catégories de base

    INSERT INTO categories (name) VALUES 
    ('Nourriture'),
    ('Loisirs'),
    ('Logement'),
    ('Facture'),
    ('Revenu');

-- Table des transactions

    CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amount DECIMAL(10, 2) NOT NULL,
        type ENUM('income', 'expense') NOT NULL,
        category_id INT NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        description TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );