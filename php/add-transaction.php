<?php

header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

$amount = $_POST['amount'];
$type = $_POST['type'];
$category_id = $_POST['category_id'];
$date = $_POST_['date'];
$description = $_POST_['description'];

$query = "INSERT INTO transactions (amount, type,category_id, date, description) VALUES (?,?,?,?,?)";
$stmt = $pdo->prepare($query);
$stmt->execute([$amount, $type, $category_id, $date, $description]);

echo json_encode(['status' => 'success']);