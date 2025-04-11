<?php

header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$amount = $_POST['amount'];
$type = $_POST['type'];
$category_id = $_POST['category_id'];
$date = $_POST['date'];
$description = $_POST['description'];

$query = "INSERT INTO transactions (amount, type,category_id, date, description) VALUES (?,?,?,?,?)";
$stmt = $pdo->prepare($query);
$stmt->execute([$amount, $type, $category_id, $date, $description]);

echo json_encode(['status' => 'success']);

// header('Content-Type: application/json');

// try {
//     // Connexion à la base de données avec gestion des erreurs
//     $pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//     // Récupérer les données de la requête POST
//     $amount = $_POST['amount'];
//     $type = $_POST['type'];
//     $category_id = $_POST['category_id'];
//     $date = $_POST['date'];
//     $description = htmlspecialchars($_POST['description'], ENT_QUOTES, 'UTF-8');  // Sécurisation de la description

//     // Validation des données
//     if (!is_numeric($amount) || $amount <= 0) {
//         echo json_encode(['status' => 'error', 'message' => 'Montant invalide']);
//         exit;
//     }

//     if (empty($type) || !in_array($type, ['income', 'expense'])) {
//         echo json_encode(['status' => 'error', 'message' => 'Type invalide']);
//         exit;
//     }

//     // Insertion dans la base de données
//     $query = "INSERT INTO transactions (amount, type, category_id, date, description) VALUES (?,?,?,?,?)";
//     $stmt = $pdo->prepare($query);
//     $stmt->execute([$amount, $type, $category_id, $date, $description]);

//     // Réponse JSON de succès
//     echo json_encode(['status' => 'success']);

// } catch (PDOException $e) {
//     // Gestion des erreurs PDO
//     echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
// }