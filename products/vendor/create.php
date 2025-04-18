<?php
require '../config/connect.php';

// Установка заголовка JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Недопустимый метод запроса']);
    exit;
}

$title = $_POST['title'] ?? '';
$kol = $_POST['kol'] ?? 0;
$price = $_POST['price'] ?? 0;
$ed = $_POST['ed'] ?? '';

if (!$title || !$kol || !$price || !$ed) {
    echo json_encode(['status' => 'error', 'message' => 'Не все обязательные поля заполнены']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO products (title, kol, price, ed) VALUES (:title, :kol, :price, :ed)");
    $result = $stmt->execute([
        'title' => $title,
        'kol' => $kol,
        'price' => $price,
        'ed' => $ed
    ]);

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Товар успешно добавлен']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Не удалось добавить товар']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при добавлении товара: ' . $e->getMessage()]);
}