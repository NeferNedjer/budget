<?php

header('Content-type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$query = "SELECT t.id, t.amount, t.type, t.date, t.description, c.name AS category FROM transactions t JOIN categories c ON t.category_id = c.id";

$stmt = $pdo->query($query);

$transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($transactions);