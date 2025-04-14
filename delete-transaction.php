<?php

header('Content-type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=budget', 'root', '');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = (int) $_POST['id'];
    $stmt = $pdo->prepare("DELETE FROM transactions WHERE id = ?");
    $success = $stmt->execute([$id]);

    echo json_encode(['status' => $success ? 'success' : 'error']);
    exit;
}

echo json_encode(['status' => 'invalid']);