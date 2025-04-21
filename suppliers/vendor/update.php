<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Недопустимый метод запроса']);
    exit;
}

$id = $_POST['id'] ?? null;
$name = $_POST['name'] ?? '';
$inn = $_POST['inn'] ?? 0;
$number = $_POST['number'] ?? 0;

if (!$id || !$name || !$inn || !$number || !$ed) {
    echo json_encode(['status' => 'error', 'message' => 'Не все обязательные поля заполнены']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE products SET name = :name, inn = :inn, number = :number WHERE id = :id");
    $result = $stmt->execute([
        'id' => $id,
        'name' => $name,
        'inn' => $inn,
        'number' => $number,
    ]);

    if ($result && $stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Товар успешно обновлен']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Товар не найден или не удалось его обновить']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при обновлении товара: ' . $e->getMessage()]);
}