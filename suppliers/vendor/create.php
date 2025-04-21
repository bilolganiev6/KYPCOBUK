<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Недопустимый метод запроса']);
    exit;
}

$name = $_POST['name'] ?? '';
$inn = $_POST['inn'] ?? 0;
$number = $_POST['number'] ?? 0;

if (!$name || !$inn || !$number) {
    echo json_encode(['status' => 'error', 'message' => 'Не все обязательные поля заполнены']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO postavshiki (name, inn, number) VALUES (:name, :inn, :number)");
    $result = $stmt->execute([
        'name' => $name,
        'inn' => $inn,
        'number' => $number,
    ]);

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Товар успешно добавлен']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Не удалось добавить товар']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при добавлении товара: ' . $e->getMessage()]);
}