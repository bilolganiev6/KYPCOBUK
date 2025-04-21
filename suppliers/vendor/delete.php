<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Недопустимый метод запроса']);
    exit;
}

$id = $_POST['id'] ?? null;

if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'ID товара не указан']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM postavshiki WHERE id = :id");
    $result = $stmt->execute(['id' => $id]);

    if ($result && $stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Товар успешно удален']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Товар не найден или не удалось его удалить']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при удалении товара: ' . $e->getMessage()]);
}