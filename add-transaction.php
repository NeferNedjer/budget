<?php

header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$amount = $_POST['amount'];
$type = $_POST['type'];
$category_id = $_POST['category_id'];
$description = $_POST['description'];

$query = "INSERT INTO transactions (amount, type,category_id, description) VALUES (?,?,?,?)";
$stmt = $pdo->prepare($query);
$stmt->execute([$amount, $type, $category_id, $description]);

echo json_encode(['status' => 'success']);

