<?php

header('Content-type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$query = "SELECT SUM(amount) AS total_income FROM transactions WHERE type = 'income'";

$stmt = $pdo->query($query);

$totalRevenus = $stmt->fetchColumn();
echo json_encode($totalRevenus);