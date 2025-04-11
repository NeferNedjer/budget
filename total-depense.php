<?php

header('Content-type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$query = "SELECT SUM(amount) AS total_expense FROM transactions WHERE type = 'expense'";

$stmt = $pdo->query($query);

$totalDepenses = $stmt->fetchColumn();
echo json_encode($totalDepenses);