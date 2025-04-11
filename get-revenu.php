<?php

header('Content-type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$query = "SELECT t.id, t.amount, t.type, t.description, c.name AS category FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.type = 'income'";

$stmt = $pdo->query($query);

$revenus = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($revenus);